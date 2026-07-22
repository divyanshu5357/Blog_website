import { Router } from "express";
import { register,login, me, logout } from "./auth.controller.js";
import { protect, authorize } from "./auth.middleware.js";
import ApiResponse from "../../utils/ApiResponse.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", logout);
router.get(
  "/admin-only",
  protect,
  authorize("SUPER_ADMIN"),
  (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        "Welcome Super Admin!",
        req.user
      )
    );
  }
);


export default router;