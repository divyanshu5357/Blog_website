import { Router } from "express";
import { getSettings, updateSettings } from "./settings.controller.js";
import { protect, authorize } from "../auth/auth.middleware.js";

const router = Router();

router.get("/", getSettings);
router.put("/", protect, authorize("SUPER_ADMIN", "ADMIN"), updateSettings);

export default router;
