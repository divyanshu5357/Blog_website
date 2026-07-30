import { Router } from "express";

import {
  createLiveSession,
  getLiveSessions,
  getPublicSessions,
  registerSession,
  getSessionRegistrations,
  updateLiveSession,
  deleteLiveSession,
  exportRegistrations,
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
router.put(
  "/:id",
  protect,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR"
  ),
  updateLiveSession
);
router.delete(
  "/:id",
  protect,
  authorize(
    "SUPER_ADMIN",
    "ADMIN",
    "EDITOR"
  ),
  deleteLiveSession
);

router.get(
  "/:id/export",
  protect,
  authorize("SUPER_ADMIN", "ADMIN", "EDITOR"),
  exportRegistrations
);
export default router;