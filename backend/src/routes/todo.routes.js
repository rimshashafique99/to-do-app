import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", createTodo);       // Create
router.get("/", getTodos);          // Read
router.put("/:id", updateTodo);     // Update
router.delete("/:id", deleteTodo);  // Delete

export default router;
