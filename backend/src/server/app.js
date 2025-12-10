import express from "express";
import cors from "cors";
import todoRoutes from "../routes/todo.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todos", todoRoutes);

export default app;
