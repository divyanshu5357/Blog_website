import { Router } from "express";

import { search } from "./search.controller.js";

import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

router.get(
  "/",
  protect,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR"
  ),
  search
);

export default router;