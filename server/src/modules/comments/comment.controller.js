import asyncHandler from "../../utils/asyncHandler.js";

import {
  createCommentService,
  getPostCommentsService,
  getCommentsService,
  deleteCommentService,
  updateCommentService,
} from "./comment.service.js";

export const createComment = asyncHandler(async (req, res) => {
  const response = await createCommentService(
    req.publicUser.id,
    req.body
  );

  res.status(response.statusCode).json(response);
});

export const getPostComments = asyncHandler(async (req, res) => {
  const response = await getPostCommentsService(
    req.params.slug
  );

  res.status(response.statusCode).json(response);
});

export const getComments = asyncHandler(async (req, res) => {
  const response = await getCommentsService();

  res.status(response.statusCode).json(response);
});


export const deleteComment = asyncHandler(async (req, res) => {
 const response = await deleteCommentService(
  req.publicUser.id,
  req.params.id
);

  res.status(response.statusCode).json(response);
});
export const updateComment = asyncHandler(
  async (req, res) => {

    const response =
      await updateCommentService(
        req.publicUser.id,
        req.params.id,
        req.body.content
      );

    res.status(response.statusCode).json(response);
  }
);