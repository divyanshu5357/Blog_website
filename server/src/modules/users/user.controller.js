import asyncHandler from "../../utils/asyncHandler.js";

import {
  getUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
  createUserService,
} from "./user.service.js";
export const createUser = asyncHandler(async (req, res) => {
  const response = await createUserService(req.body);

  res.status(response.statusCode).json(response);
});
export const getUsers = asyncHandler(async (req, res) => {
  const response = await getUsersService();

  res.status(response.statusCode).json(response);
});

export const getUserById = asyncHandler(async (req, res) => {
  const response = await getUserByIdService(req.params.id);

  res.status(response.statusCode).json(response);
});

export const updateUser = asyncHandler(async (req, res) => {
  const response = await updateUserService(
    req.params.id,
    req.body
  );

  res.status(response.statusCode).json(response);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const response = await deleteUserService(req.params.id);

  res.status(response.statusCode).json(response);
});