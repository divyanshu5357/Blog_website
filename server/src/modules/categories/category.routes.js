import { Router } from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryPosts,
  getPublicCategories,
} from "./category.controller.js";

import { protect, authorize } from "../auth/auth.middleware.js";

const router = Router();
router.get("/public", getPublicCategories);
router.get("/", protect, getAllCategories);
router.get(
  "/:slug/posts",
  getCategoryPosts
);

router.get("/:id", protect, getCategoryById);

router.post(
  "/",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  updateCategory
);

router.delete(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  deleteCategory
);

export default router;