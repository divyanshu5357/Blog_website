import { Router } from "express";
import { protect } from "../auth/auth.middleware.js";
import { upload } from "./upload.middleware.js";
import { uploadImage } from "./upload.controller.js";

const router = Router();

router.post(
  "/image",
  protect,
  upload.single("image"),
  uploadImage
);

export default router;