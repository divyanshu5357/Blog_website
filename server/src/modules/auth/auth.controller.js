import asyncHandler from "../../utils/asyncHandler.js";
import { registerUser, loginUser } from "./auth.service.js";
import ApiResponse from "../../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const response = await registerUser(req.body);

  return res.status(response.statusCode).json(response);
});
export const login = asyncHandler(async (req, res) => {
  const response = await loginUser(req.body);

  return res.status(response.statusCode).json(response);
});
export const me = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Current user fetched successfully.",
      req.user
    )
  );
});
export const logout = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      "Logged out successfully.",
      null
    )
  );
});