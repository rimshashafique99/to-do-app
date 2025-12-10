import Todo from "../models/todo.model.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
