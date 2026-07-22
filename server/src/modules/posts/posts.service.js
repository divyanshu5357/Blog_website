import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";



export const createPostService = async (data, user) => {
  const slugExists = await prisma.post.findUnique({
    where: {
      slug: data.slug,
    },
  });

  if (slugExists) {
    throw new ApiError(400, "Slug already exists.");
  }

  const post = await prisma.post.create({
    data: {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      featured: data.featured,
      allowComments: data.allowComments,
      status: data.status,
      visibility: data.visibility,
      publishedAt:
        data.status === "PUBLISHED" ? new Date() : null,
      readingTime: data.readingTime,
      seoTitle: data.seoTitle,
      seoDescription: data.seoDescription,

      author: {
        connect: {
          id: user.id,
        },
      },

      category: data.categoryId
        ? {
            connect: {
              id: data.categoryId,
            },
          }
        : undefined,
    },

    include: {
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      avatar: true,
    },
  },
  category: true,
},
  });

  return new ApiResponse(
    201,
    "Post created successfully.",
    post
  );
};

/* ==========================
   Get All Posts
========================== */

export const getPostsService = async (query) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const where = {};

  if (query.search) {
    where.OR = [
      {
        title: {
          contains: query.search,
          mode: "insensitive",
        },
      },
      {
        excerpt: {
          contains: query.search,
          mode: "insensitive",
        },
      },
    ];
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.categoryId) {
    where.categoryId = query.categoryId;
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,

      skip,

      take: limit,

      orderBy: {
        createdAt: "desc",
      },

      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
        category: true,
      },
    }),

    prisma.post.count({
      where,
    }),
  ]);

  return new ApiResponse(
    200,
    "Posts fetched successfully.",
    {
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    }
  );
};


export const getPostService = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },

   include: {
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      avatar: true,
    },
  },
  category: true,
},
  });

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  return new ApiResponse(
    200,
    "Post fetched successfully.",
    post
  );
};


export const updatePostService = async (
  id,
  data
) => {
  const exists = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new ApiError(404, "Post not found.");
  }

  if (data.slug) {
    const slugExists = await prisma.post.findFirst({
      where: {
        slug: data.slug,
        NOT: {
          id,
        },
      },
    });

    if (slugExists) {
      throw new ApiError(400, "Slug already exists.");
    }
  }

  const updated = await prisma.post.update({
    where: {
      id,
    },

    data,

   include: {
  author: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      avatar: true,
    },
  },
  category: true,
},
  });

  return new ApiResponse(
    200,
    "Post updated successfully.",
    updated
  );
};


export const deletePostService = async (id) => {
  const exists = await prisma.post.findUnique({
    where: {
      id,
    },
  });

  if (!exists) {
    throw new ApiError(404, "Post not found.");
  }

  await prisma.post.delete({
    where: {
      id,
    },
  });

  return new ApiResponse(
    200,
    "Post deleted successfully."
  );
};



export const publishPostService = async (id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "PUBLISHED",
      publishedAt: new Date(),
    },
  });

  return new ApiResponse(
    200,
    "Post published successfully.",
    post
  );
};



export const draftPostService = async (id) => {
  const post = await prisma.post.update({
    where: {
      id,
    },

    data: {
      status: "DRAFT",
      publishedAt: null,
    },
  });

  return new ApiResponse(
    200,
    "Post moved to draft.",
    post
  );
};
export const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  return new ApiResponse(
    200,
    "Post fetched successfully.",
    post
  );
};
export const getPostBySlugService = async (
  slug,
  language = "en"
) => {
  const post = await prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED",
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

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }
if (language !== "en") {
  const translation =
    await prisma.postTranslation.findUnique({
      where: {
        postId_language: {
          postId: post.id,
          language,
        },
      },
    });

  if (translation) {
    post.title = translation.title;
    post.excerpt = translation.excerpt;
    post.content = translation.content;
    post.seoTitle = translation.seoTitle;
    post.seoDescription =
      translation.seoDescription;
  }
}
  return new ApiResponse(
    200,
    "Post fetched successfully.",
    post
  );
};
export const getPublishedPostsService = async () => {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
    },
    orderBy: {
      publishedAt: "desc",
    },
    include: {
      category: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  return new ApiResponse(
    200,
    "Published posts fetched successfully.",
    posts
  );
};
export const getFeaturedPostsService = async () => {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      featured: true,
    },
    include: {
      category: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 6,
  });

  return new ApiResponse(
    200,
    "Featured posts fetched successfully.",
    posts
  );
};