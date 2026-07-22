import jwt from "jsonwebtoken";
import prisma from "../../config/db.js";
import asyncHandler from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import { env } from "../../config/env.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Authorization: Bearer <token>
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized. Please login.");
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  const user = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      role: true,
      status: true,
    },
  });

  if (!user) {
    throw new ApiError(401, "User not found.");
  }

  req.user = user;

  next();
});
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You do not have permission to access this resource."
      );
    }

    next();
  };
};