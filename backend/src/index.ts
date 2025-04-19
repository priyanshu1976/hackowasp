import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes";

// Load environment variables
dotenv.config();

const app = express();

// Initialize GoogleGenAI


// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);



// Start server
app.listen(5000, () => {
  console.log("🚀 Server is running on port 5000");
});
