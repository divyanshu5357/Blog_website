import { Router } from "express";

import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUser,
} from "./user.controller.js";

import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

router.use(
  protect,
  authorize("SUPER_ADMIN")
);
router.post("/", createUser);

router.get("/", getUsers);

router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;