import { Router } from "express";

import {
  createComment,
  getPostComments,
  getComments,
  deleteComment,
} from "./comment.controller.js";

import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.post("/", createComment);

router.get("/post/:slug", getPostComments);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  getComments
);



router.delete(
  "/:id",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  deleteComment
);

export default router;