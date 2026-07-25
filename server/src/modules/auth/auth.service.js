import prisma from "../../config/db.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import {hashPassword,comparePassword,} from "../../utils/hash.js";
import { generateAccessToken } from "../../utils/token.js";

export const registerUser = async (data) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
  } = data;

  if (!firstName || !username || !email || !password) {
    throw new ApiError(400, "Please fill all required fields.");
  }

  const totalUsers = await prisma.user.count();

if (totalUsers > 0) {
  throw new ApiError(
    403,
    "Public registration is disabled. Please contact the administrator."
  );
}
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email },
        { username },
      ],
    },
  });

  if (existingUser) {
    throw new ApiError(409, "Email or username already exists.");
  }

  const hashedPassword = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  const token = generateAccessToken({
    id: user.id,
    role: user.role,
  });

  return new ApiResponse(
    201,
    "Admin registered successfully.",
    {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }
  );
};
export const loginUser = async (data) => {
  const { email, password } = data;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required.");
  }

const user = await prisma.user.findUnique({
  where: {
    email,
  },
});

console.log("Email entered:", email);
console.log("User found:", !!user);

if (user) {
  console.log("DB email:", user.email);
  console.log("DB hash:", user.password);
}

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

const isPasswordCorrect = await comparePassword(
  password,
  user.password
);

console.log("Password entered:", password);
console.log("Password match:", isPasswordCorrect);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = generateAccessToken({
    id: user.id,
    role: user.role,
  });

  return new ApiResponse(
    200,
    "Login successful.",
    {
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    }
  );
};