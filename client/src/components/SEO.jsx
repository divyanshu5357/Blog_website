import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "AARAMBH CMS | Modern Blogging & Live Sessions Platform";
const DEFAULT_DESCRIPTION = "AARAMBH CMS is a modern platform for publishing blogs, managing live learning sessions, and building community.";
const DEFAULT_SITE_NAME = "AARAMBH CMS";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";

export default function SEO({
  title,
  description,
  image,
  type = "website",
  noindex = false,
  article = null,
}) {
  const location = useLocation();
  const canonicalUrl = `${window.location.origin}${location.pathname}`;

  useEffect(() => {
    // 1. Title
    const finalTitle = title ? `${title} | ${DEFAULT_SITE_NAME}` : DEFAULT_TITLE;
    document.title = finalTitle;

    // Helper to set meta attribute
    const setMetaTag = (selector, attribute, value) => {
      if (!value) return;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        const attrName = selector.includes("property=") ? "property" : "name";
        const attrValue = selector.split("=")[1].replace(/['"]/g, "").replace("]", "");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, value);
    };

    // 2. Meta description
    const finalDesc = description || DEFAULT_DESCRIPTION;
    setMetaTag("meta[name='description']", "content", finalDesc);

    // 3. Robots
    setMetaTag("meta[name='robots']", "content", noindex ? "noindex, nofollow" : "index, follow");

    // 4. Open Graph Metadata
    setMetaTag("meta[property='og:title']", "content", title || DEFAULT_TITLE);
    setMetaTag("meta[property='og:description']", "content", finalDesc);
    setMetaTag("meta[property='og:image']", "content", image || DEFAULT_IMAGE);
    setMetaTag("meta[property='og:url']", "content", canonicalUrl);
    setMetaTag("meta[property='og:type']", "content", type);
    setMetaTag("meta[property='og:site_name']", "content", DEFAULT_SITE_NAME);

    // 5. Twitter Card Metadata
    setMetaTag("meta[name='twitter:card']", "content", "summary_large_image");
    setMetaTag("meta[name='twitter:title']", "content", title || DEFAULT_TITLE);
    setMetaTag("meta[name='twitter:description']", "content", finalDesc);
    setMetaTag("meta[name='twitter:image']", "content", image || DEFAULT_IMAGE);

    // 6. Canonical Link
    let canonicalLink = document.querySelector("link[rel='canonical']");
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 7. Structured Data (JSON-LD)
    const scriptId = "json-ld-structured-data";
    let jsonLdScript = document.getElementById(scriptId);

    if (article) {
      const authorName = article.author
        ? `${article.author.firstName || ''} ${article.author.lastName || ''}`.trim() || "AARAMBH Team"
        : "AARAMBH Team";

      const schemaData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": article.seoTitle || article.title,
        "description": article.seoDescription || article.excerpt || finalDesc,
        "image": article.coverImage ? [article.coverImage] : [DEFAULT_IMAGE],
        "author": {
          "@type": "Person",
          "name": authorName
        },
        "datePublished": article.publishedAt || article.createdAt,
        "dateModified": article.updatedAt || article.publishedAt || article.createdAt,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl
        },
        "publisher": {
          "@type": "Organization",
          "name": DEFAULT_SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": DEFAULT_IMAGE
          }
        }
      };

      if (!jsonLdScript) {
        jsonLdScript = document.createElement("script");
        jsonLdScript.id = scriptId;
        jsonLdScript.type = "application/ld+json";
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(schemaData);
    } else {
      if (jsonLdScript) {
        jsonLdScript.remove();
      }
    }
  }, [title, description, image, type, noindex, article, canonicalUrl]);

  return null;
}
