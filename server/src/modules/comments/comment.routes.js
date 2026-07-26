import { Router } from "express";
import { verifyPublicUser } from "../public-auth/public-auth.middleware.js";

import {
  createComment,
  getPostComments,
  getComments,
  deleteComment,
  updateComment,
} from "./comment.controller.js";

import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();



router.post("/",  verifyPublicUser,createComment);

router.get("/post/:slug", getPostComments);



router.get(
  "/",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  getComments
);
router.patch(
  "/:id",
  verifyPublicUser,
  updateComment
);


router.delete(
  "/:id",
  verifyPublicUser,
  deleteComment
);
export default router;