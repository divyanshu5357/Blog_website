import prisma from "../../config/db.js";
import ApiResponse  from "../../utils/ApiResponse.js";

export const getDashboardService = async () => {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalUsers,
  ] = await Promise.all([
    prisma.post.count(),

    prisma.post.count({
      where: {
        status: "PUBLISHED",
      },
    }),

    prisma.post.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.category.count(),

    prisma.user.count(),
  ]);

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      views: true,
      createdAt: true,
    },
  });

  return new ApiResponse(200, "Dashboard fetched successfully.", {
    stats: {
      totalPosts,
      publishedPosts,
      draftPosts,
      totalCategories,
      totalUsers,
    },
    recentPosts,
  });
};