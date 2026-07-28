import { Router } from "express";

import {
  createLiveSession,
  getLiveSessions,
  getPublicSessions,
  registerSession,
  getSessionRegistrations,
} from "./liveSession.controller.js";
import {
  protect,
  authorize,
} from "../auth/auth.middleware.js";

const router = Router();

router.get(
  "/",
  getLiveSessions
);

router.post(
  "/",
  protect,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR"
  ),
  createLiveSession
);
router.get("/public", getPublicSessions);

router.post(
  "/:id/register",
  registerSession
);
router.get(
  "/:id/registrations",
  protect,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR"
  ),
  getSessionRegistrations
);

export default router;