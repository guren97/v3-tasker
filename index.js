import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/error.handler.js";

// IMPORT/DEFINE ROUTES
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

// CONFIGURATIONS
const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// CALL ROUTES
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

// ERROR HANDLER
app.use(errorHandler);

// RUN THE SERVER -- CONNECT TO DATABASE
const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
    await connectDB();
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

// CALL START SERVER FUNCTION
startServer();
