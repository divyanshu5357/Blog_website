import { Router } from "express";

import {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  publishPost,
  draftPost,
  getPostBySlug,
  getPublishedPosts,
  getFeaturedPosts,
  likePost,
  getRelatedPosts,
} from "./posts.controller.js";
import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();
router.get("/public/all", getPublishedPosts);

router.get("/", protect, getPosts);
router.get("/related/:slug",getRelatedPosts);

router.get("/slug/:slug", getPostBySlug);
router.post("/slug/:slug/like", likePost);
router.get("/public/featured",getFeaturedPosts);

router.get("/:id", protect, getPost);

router.post(
  "/",
  protect,
  authorize("SUPER_ADMIN", "ADMIN", "EDITOR"),
  createPost
);




router.put(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "ADMIN", "EDITOR"),
  updatePost
);

router.delete(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  deletePost
);

router.patch(
  "/:id/publish",
  protect,
  authorize("SUPER_ADMIN", "ADMIN", "EDITOR"),
  publishPost
);

router.patch(
  "/:id/draft",
  protect,
  authorize("SUPER_ADMIN", "ADMIN", "EDITOR"),
  draftPost
);


export default router;