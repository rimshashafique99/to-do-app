import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editText, setEditText] = useState("");
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token or user state if you have one
    alert("Logged out successfully!");
    navigate("/login");
  };
  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
    };

    setTasks([newTask, ...tasks]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editText.trim() } : task
      )
    );
    setEditingTaskId(null);
    setEditText("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
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
                key={task.id}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3 hover:shadow-md transition"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-4 h-4 accent-blue-600"
                  />

                  {editingTaskId === task.id ? (
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
                      {task.text}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  {editingTaskId === task.id ? (
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="text-green-600 text-sm hover:underline"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(task.id, task.text)}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => deleteTask(task.id)}
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
