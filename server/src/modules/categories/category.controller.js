import asyncHandler from "../../utils/asyncHandler.js";

import {
  createCategoryService,
  getAllCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
  deleteCategoryService,
  getCategoryPostsService,
} from "./category.service.js";

export const createCategory = asyncHandler(async (req, res) => {
  const response = await createCategoryService(req.body);
  res.status(response.statusCode).json(response);
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const response = await getAllCategoriesService();
  res.status(response.statusCode).json(response);
});

export const getCategoryById = asyncHandler(async (req, res) => {
  const response = await getCategoryByIdService(req.params.id);
  res.status(response.statusCode).json(response);
});

export const updateCategory = asyncHandler(async (req, res) => {
  const response = await updateCategoryService(
    req.params.id,
    req.body
  );

  res.status(response.statusCode).json(response);
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const response = await deleteCategoryService(req.params.id);
  res.status(response.statusCode).json(response);
});

export const getCategoryPosts = asyncHandler(async (req, res) => {
  const response = await getCategoryPostsService(req.params.slug);

  res.status(response.statusCode).json(response);
});
export const getPublicCategories = asyncHandler(async (req, res) => {
  const response = await getAllCategoriesService();

  res.status(response.statusCode).json(response);
});