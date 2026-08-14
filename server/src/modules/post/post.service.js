export const getRelatedPostsService = async (slug) => {
  const currentPost = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!currentPost) {
    throw new ApiError(404, "Post not found.");
  }

  let posts = await prisma.post.findMany({
    where: {
      categoryId: currentPost.categoryId,
      status: "PUBLISHED",

      NOT: {
        id: currentPost.id,
      },
    },

    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },

    take: 3,

    orderBy: {
      publishedAt: "desc",
    },
  });

  if (posts.length < 3) {
    const latest = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",

        NOT: {
          id: currentPost.id,
        },
      },

      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },

      take: 3,
    });

    posts = latest;
  }

  return new ApiResponse(
    200,
    "Related posts fetched successfully.",
    posts
  );
};