import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todoRoutes from "./routes/todo.routes.js"; // adjust path if needed

// -----------------------------
// Create Express App
// -----------------------------
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todos", todoRoutes);

// -----------------------------
// Connect to MongoDB
// -----------------------------
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Call DB connection and start server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
