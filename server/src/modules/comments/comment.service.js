import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const createCommentService = async (data) => {
  const {
    postId,
    name,
    email,
    content,
    
  } = data;

  if (!postId || !name || !content) {
    throw new ApiError(
      400,
      "Post, name and comment are required."
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
      name,
      email,
      content,
      approved : true,
    },
  });

  return new ApiResponse(
    201,
    "Comment submitted successfully. Waiting for approval.",
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


export const deleteCommentService = async (id) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment) {
    throw new ApiError(404, "Comment not found.");
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