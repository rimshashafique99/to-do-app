import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../api/todoapi";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate("/login");
    else fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await getTodos(token);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch tasks. Please login again.");
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully!");
    navigate("/login");
  };

  const handleAddTask = async () => {
    if (!input.trim()) return;
    try {
      await createTodo({ title: input.trim() }, token);
      setInput("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to add task.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTodo(id, token);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to delete task.");
    }
  };

  const handleStartEditing = (id, text) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const handleSaveEdit = async (id) => {
    if (!editText.trim()) return;
    try {
      await updateTodo(id, { title: editText.trim() }, token);
      setEditingTaskId(null);
      setEditText("");
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task.");
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      await updateTodo(task._id, { completed: !task.completed }, token);
      fetchTasks();
    } catch (err) {
      console.error(err);
      alert("Failed to update task status.");
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center bg-gray-100 px-4 relative">
      {/* Logout Button */}
      <div className="absolute top-4 right-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          Logout
        </button>
      </div>

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          📝 My To-Do List
        </h2>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add one! </p>
        ) : (
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task)}
                    className="w-4 h-4 accent-blue-600"
                  />

                  {editingTaskId === task._id ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="border border-gray-300 rounded-lg p-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span
                      className={`${
                        task.completed
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingTaskId === task._id ? (
                    <button
                      onClick={() => saveEdit(task._id)}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(task._id, task.title)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task._id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
