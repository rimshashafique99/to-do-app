import Todo from "../models/todo.model.js";

// Create a new todo
export const createTodo = async (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      res.status(400);
      throw new Error("Title is required");
    }

    const todo = await Todo.create({ title, user: req.user._id });
    res.status(201).json(todo);
  } catch (err) {
    next(err); 
  }
};


// Get all todos
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};


// Update a todo
export const updateTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // ensure user owns todo
      req.body,
      { new: true, runValidators: true }
    );

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found or not authorized");
    }

    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};


// Delete a todo
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      res.status(404);
      throw new Error("Todo not found or not authorized");
    }

    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    next(err);
  }
};

