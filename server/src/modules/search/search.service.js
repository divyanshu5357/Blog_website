import prisma from "../../config/db.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const searchService = async (query) => {
  if (!query || query.trim() === "") {
    return new ApiResponse(200, "Search completed.", {
      posts: [],
      categories: [],
      users: [],
    });
  }

  const q = query.trim();

  const [posts, categories, users] = await Promise.all([
    prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            excerpt: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
      },
    }),

    prisma.category.findMany({
      where: {
        name: {
          contains: q,
          mode: "insensitive",
        },
      },
      take: 10,
    }),

    prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            lastName: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: q,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 10,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    }),
  ]);

  return new ApiResponse(
    200,
    "Search completed successfully.",
    {
      posts,
      categories,
      users,
    }
  );
};