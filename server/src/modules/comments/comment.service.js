import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createCommentService = async (
  publicUserId,
  data
) => {
  const { postId, content,parentId, } = data;

  if (!postId || !content) {
    throw new ApiError(
      400,
      "Post and comment are required."
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

  const comment = await prisma.comment.create({
  data: {
    postId,
    publicUserId,
    content,
    parentId: parentId || null,
  },
    include: {
      publicUser: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatar: true,
          email: true,
        },
      },
    },
  });

  return new ApiResponse(
    201,
    "Comment posted successfully.",
    comment
  );
};

export const getPostCommentsService = async (slug) => {
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  });

  if (!post) {
    throw new ApiError(404, "Post not found.");
  }

 const comments = await prisma.comment.findMany({
  where: {
    postId: post.id,
    parentId: null,
  },

  include: {
    publicUser: {
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
      },
    },

    replies: {
      include: {
        publicUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    },
  },

  orderBy: {
    createdAt: "desc",
  },
});
  return new ApiResponse(
    200,
    "Comments fetched successfully.",
    comments
  );
};

export const getCommentsService = async () => {
  const comments = await prisma.comment.findMany({
    include: {
      post: {
        select: {
          title: true,
        },
      },
      publicUser: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return new ApiResponse(
    200,
    "Comments fetched successfully.",
    comments
  );
};

export const deleteCommentService = async (
  publicUserId,
  id
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if(!comment) {
    throw new ApiError(404, "Comment not found.");
  }
  if(comment.publicUserId !== publicUserId) {
  throw new ApiError(
    403,
    "You can only delete your own comments."
  );
}

  await prisma.comment.delete({
    where: {
      id,
    },
  });

  return new ApiResponse(
    200,
    "Comment deleted successfully.",
    null
  );
};
export const updateCommentService = async (
  publicUserId,
  id,
  content
) => {
  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found.");
  }

  if (comment.publicUserId !== publicUserId) {
    throw new ApiError(
      403,
      "You can only edit your own comments."
    );
  }

  const updated = await prisma.comment.update({
    where: { id },
    data: {
      content,
    },
    include: {
      publicUser: {
        select: {
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  return new ApiResponse(
    200,
    "Comment updated successfully.",
    updated
  );
};