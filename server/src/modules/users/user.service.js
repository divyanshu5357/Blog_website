import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import bcrypt from "bcrypt";

export const getUsersService = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  phone: true,
  avatar: true,
  role: true,
  status: true,
  emailVerified: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
}
  });

  return new ApiResponse(
    200,
    "Users fetched successfully.",
    users
  );
};
export const createUserService = async (data) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    phone,
    role,
    status,
  } = data;

  const exists = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  if (exists) {
    throw new ApiError(
      409,
      "Email or username already exists."
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );
const user = await prisma.user.create({
  data: {
    firstName,
    lastName,
    username,
    email,
    phone,
    password: hashedPassword,
    role,
    status,
  },
  select: {
    id: true,
    firstName: true,
    lastName: true,
    username: true,
    email: true,
    phone: true,
    avatar: true,
    role: true,
    status: true,
    createdAt: true,
  },
});

return new ApiResponse(
  201,
  "User created successfully.",
  user
);


};

export const getUserByIdService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
   select: {
  id: true,
  firstName: true,
  lastName: true,
  username: true,
  email: true,
  phone: true,
  avatar: true,
  role: true,
  status: true,
  emailVerified: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
}
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  return new ApiResponse(
    200,
    "User fetched successfully.",
    user
  );
};

export const updateUserService = async (id, data) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      username: data.username,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: data.status,
    },
  });

  return new ApiResponse(
    200,
    "User updated successfully.",
    updatedUser
  );
};

export const deleteUserService = async (id) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    throw new ApiError(404, "User not found.");
  }

  await prisma.user.delete({
    where: { id },
  });

  return new ApiResponse(
    200,
    "User deleted successfully.",
    null
  );
};