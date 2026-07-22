import { Router } from "express";

import { getDashboard } from "./dashboard.controller.js";

import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";
const router = Router();

router.get(
  "/",
  protect,
  authorize("SUPER_ADMIN", "ADMIN"),
  getDashboard
);

export default router;