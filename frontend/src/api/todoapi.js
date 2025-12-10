import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

export const getTodos = (token) =>
  axios.get(API_URL, { headers: { Authorization: `Bearer ${token}` } });

export const createTodo = (data, token) =>
  axios.post(API_URL, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateTodo = (id, data, token) =>
  axios.put(`${API_URL}/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTodo = (id, token) =>
  axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
