import axios from "axios"
import { API_URL, API_VERSION } from "../constants"

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

const VERSIONED_API_URL = `/api/${API_VERSION}`

// API request functions
export const fetchTodos = (params) => apiClient.get(`${VERSIONED_API_URL}/todos`, { params })
export const createTodo = (data) => apiClient.post(`${VERSIONED_API_URL}/todos`, data)
export const updateTodo = (id, data) => apiClient.patch(`${VERSIONED_API_URL}/todos/${id}`, data)
export const deleteTodo = (id) => apiClient.delete(`${VERSIONED_API_URL}/todos/${id}`)

export default apiClient
