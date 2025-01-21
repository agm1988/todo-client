import { PENDING_TODO } from "./dictionaries/todoDict";

export const API_URL = "http://localhost:3000"; // Rails API URL
export const API_VERSION = "v1"; // Rails API Version

export const initialTodo = {
  title: '',
  description: '',
  status: PENDING_TODO
}

export const COLORS = {
  primary: "#1976d2",
  secondary: "#ff4081",
  background: "#f4f4f4",
  text: "#333",
}

export const FONT = {
  family: "Roboto, sans-serif",
}
