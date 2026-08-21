import { Router } from "express";
import {
  subscribe,
  getSubscribers,
  deleteSubscriber,
} from "./subscriber.controller.js";
import { protect, authorize } from "../auth/auth.middleware.js";

const router = Router();

router.post("/", subscribe);
router.get("/", protect, authorize("SUPER_ADMIN", "ADMIN"), getSubscribers);
router.delete("/:id", protect, authorize("SUPER_ADMIN", "ADMIN"), deleteSubscriber);

export default router;