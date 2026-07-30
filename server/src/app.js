import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import errorHandler from "./middleware/error.middleware.js";
import authRoutes from "./modules/auth/auth.routes.js";
import categoryRoutes from "./modules/categories/category.routes.js";
import dashboardRoutes from "./modules/dashboard/dashboard.routes.js";
import postsRoutes from "./modules/posts/posts.routes.js";
import uploadRoutes from "./modules/uploads/upload.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import commentRoutes from "./modules/comments/comment.routes.js";
import searchRoutes from "./modules/search/search.routes.js";
import liveSessionRoutes from "./modules/live-session/liveSession.routes.js";
import { startReminderCron } from "./cron/reminderCron.js";

import passport from "./modules/public-auth/passport.js";
import publicAuthRoutes from "./modules/public-auth/public-auth.routes.js";

const app = express();


app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/posts", postsRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AARAMBH CMS API is running 🚀",
  });
});
app.use("/api/public-auth", publicAuthRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/search", searchRoutes);
app.use(  "/api/live-sessions",  liveSessionRoutes);
app.use(errorHandler);
startReminderCron();

export default app;