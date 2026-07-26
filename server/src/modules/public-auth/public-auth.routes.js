import { Router } from "express";
import passport from "./passport.js";
import { googleCallback } from "./public-auth.controller.js";
import { me } from "./public-auth.controller.js";
import { verifyPublicUser } from "./public-auth.middleware.js";
const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL,
  }),
  googleCallback
);
router.get(
  "/me",
  verifyPublicUser,
  me
);

export default router;