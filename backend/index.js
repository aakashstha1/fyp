import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { ConnectDB } from "./db/conn.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import drawRoutes from "./routes/draw.route.js";
import docRoutes from "./routes/doc.route.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doc", docRoutes);
app.use("/api/draw", drawRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  ConnectDB();
  console.log(`Server running on Port no:${PORT}`);
});
