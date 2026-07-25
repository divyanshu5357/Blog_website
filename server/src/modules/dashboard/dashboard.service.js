import prisma from "../../config/db.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const getDashboardService = async () => {
  const [
    totalPosts,
    publishedPosts,
    draftPosts,
    totalCategories,
    totalUsers,
    totalComments,
    viewStats,
    likeStats,
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

    prisma.comment.count(),

    prisma.post.aggregate({
      _sum: {
        views: true,
      },
    }),

    prisma.post.aggregate({
      _sum: {
        likes: true,
      },
    }),
  ]);

  const recentPosts = await prisma.post.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      category: true,
    },
  });

  const recentComments = await prisma.comment.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      post: {
        select: {
          title: true,
        },
      },
    },
  });

  const popularPosts = await prisma.post.findMany({
    take: 5,
    orderBy: {
      views: "desc",
    },
    select: {
      id: true,
      title: true,
      views: true,
      likes: true,
    },
  });

  return new ApiResponse(
    200,
    "Dashboard fetched successfully.",
    {
      stats: {
        totalPosts,
        publishedPosts,
        draftPosts,
        totalCategories,
        totalUsers,
        totalComments,
        totalViews: viewStats._sum.views || 0,
        totalLikes: likeStats._sum.likes || 0,
      },

      recentPosts,

      recentComments,

      popularPosts,
    }
  );
};