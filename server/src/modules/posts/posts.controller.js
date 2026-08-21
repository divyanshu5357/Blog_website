import asyncHandler from "../../utils/asyncHandler.js";

import {
  createPostService,
  getPostsService,
  getPostService,
  updatePostService,
  deletePostService,
  publishPostService,
  draftPostService,
  getPostBySlugService,
  getPublishedPostsService,
  getFeaturedPostsService,
  likePostService,
  getRelatedPostsService,
  getTrendingPostsService,
} from "./posts.service.js";


export const createPost = asyncHandler(async (req, res) => {
  const response = await createPostService(req.body, req.user);

  res.status(response.statusCode).json(response);
});



export const getPosts = asyncHandler(async (req, res) => {
  const response = await getPostsService(req.query);

  res.status(response.statusCode).json(response);
});



export const getPost = asyncHandler(async (req, res) => {
  const response = await getPostService(req.params.id);

  res.status(response.statusCode).json(response);
});

/* ==========================
   Update Post
========================== */

export const updatePost = asyncHandler(async (req, res) => {
  const response = await updatePostService(
    req.params.id,
    req.body
  );

  res.status(response.statusCode).json(response);
});

/* ==========================
   Delete Post
========================== */

export const deletePost = asyncHandler(async (req, res) => {
  const response = await deletePostService(req.params.id);

  res.status(response.statusCode).json(response);
});


export const publishPost = asyncHandler(async (req, res) => {
  const response = await publishPostService(req.params.id);

  res.status(response.statusCode).json(response);
});



export const draftPost = asyncHandler(async (req, res) => {
  const response = await draftPostService(req.params.id);

  res.status(response.statusCode).json(response);
});

export const getPostBySlug = asyncHandler(async (req, res) => {
  const language = req.query.lang || "en";

const response =
await getPostBySlugService(
    req.params.slug,
    req.query.lang || "en"
);
  res.status(response.statusCode).json(response);
});
export const getPublishedPosts = asyncHandler(async (req, res) => {
  const response = await getPublishedPostsService();

  res.status(response.statusCode).json(response);
});
export const getFeaturedPosts = asyncHandler(async (req, res) => {
  const response = await getFeaturedPostsService();

  res.status(response.statusCode).json(response);
});
export const likePost = asyncHandler(async (req, res) => {
  const response = await likePostService(
    req.params.slug
  );

  res.status(response.statusCode).json(response);
});
export const getRelatedPosts = async (
  req,
  res,
  next
) => {
  try {

    const response =
      await getRelatedPostsService(
        req.params.slug
      );

    res
      .status(response.statusCode)
      .json(response);

  } catch (err) {
    next(err);
  }
};

export const getTrendingPosts = async (req, res, next) => {
  try {
    const response = await getTrendingPostsService(req.query.limit);
    res.status(response.statusCode).json(response);
  } catch (err) {
    next(err);
  }
};