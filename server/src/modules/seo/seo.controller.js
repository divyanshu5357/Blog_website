import prisma from "../../config/db.js";

export const getSitemap = async (req, res, next) => {
  try {
    const baseUrl = process.env.CLIENT_URL || "https://blog-website-five-lime.vercel.app";

    const posts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        visibility: "PUBLIC",
      },
      select: {
        slug: true,
        updatedAt: true,
        publishedAt: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    const categories = await prisma.category.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });

    const staticPages = [
      "",
      "/blogs",
      "/about",
      "/contact",
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages
    staticPages.forEach((page) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page}</loc>\n`;
      xml += `    <changefreq>daily</changefreq>\n`;
      xml += `    <priority>${page === "" ? "1.0" : "0.8"}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Categories
    categories.forEach((cat) => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/category/${cat.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(cat.updatedAt).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    // Blog details (only published & public)
    posts.forEach((post) => {
      const lastMod = post.updatedAt || post.publishedAt || new Date();
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blogs/${post.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(lastMod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>0.9</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    return res.status(200).send(xml);
  } catch (err) {
    next(err);
  }
};

export const getRobotsTxt = (req, res) => {
  const baseUrl = process.env.CLIENT_URL || "https://blog-website-five-lime.vercel.app";
  const content = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.header("Content-Type", "text/plain");
  return res.status(200).send(content);
};
