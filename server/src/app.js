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

const app = express();


app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
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
app.use(errorHandler);
app.use("/api/uploads", uploadRoutes);

export default app;