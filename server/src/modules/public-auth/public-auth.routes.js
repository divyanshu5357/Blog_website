import { Router } from "express";
import passport from "./passport.js";
import { googleCallback, me } from "./public-auth.controller.js";
import { verifyPublicUser } from "./public-auth.middleware.js";

const router = Router();

router.get("/google", (req, res, next) => {
  const redirect = req.query.redirect || "/";
  const state = JSON.stringify({ redirect });
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state,
  })(req, res, next);
});

router.get("/google/callback", (req, res, next) => {
  passport.authenticate("google", { session: false }, (err, user, info) => {
    if (err || !user) {
      console.error("Google Auth Passport Error:", err || info);
      const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
      return res.redirect(`${clientUrl}/?auth_error=passport_failed`);
    }
    req.user = user;
    next();
  })(req, res, next);
}, googleCallback);

router.get("/me", verifyPublicUser, me);

export default router;