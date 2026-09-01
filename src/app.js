import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import {
 notFound,
 errorHandler,
} from "./middleware/errorMiddleware.js";

import swaggerSpec from "./config/swagger.js";

const app = express();

// ===============================
// Security
// ===============================

app.use(helmet());

app.use(
 cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
 }),
);

// ===============================
// Body Parser
// ===============================

app.use(express.json());

// ===============================
// Rate Limiting
// ===============================

const limiter = rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 100,
 message: {
  success: false,
  message: "Too many requests. Please try again later.",
 },
});

app.use("/api", limiter);

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
 res.status(200).json({
  success: true,
  message: "Personal Finance Tracker API is running.",
 });
});

// ===============================
// API Routes
// ===============================

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/admin", adminRoutes);

app.use(
 "/docs",
 swaggerUi.serve,
 swaggerUi.setup(swaggerSpec),
);

app.use(notFound);

app.use(errorHandler);

export default app;