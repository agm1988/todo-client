import { useState, useCallback } from "react"
import { fetchTodos, deleteTodo, updateTodo, createTodo } from "../api/apiClient"
import { prepareSearchParams } from "../lib/utils/common"

export const useTodos = (query, status, page) => {
  const [todos, setTodos] = useState([])
  const [totalAmount, setTotalAmount] = useState(0);

  const handleFetchTodos = useCallback(() => {
    const params = prepareSearchParams(query, status, page)

    return fetchTodos(params)
      .then((response) => {
        setTodos(response.data.data)
        setTotalAmount(response.data.total_amount)
        return response
      })
      .catch((error) => console.error("Error fetching todos:", error))
  }, [query, status, page]);

  const handleDelete = useCallback((id) => {
    deleteTodo(id)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setTotalAmount((prevTotal) => prevTotal - 1);
      })
      .catch((error) => console.error("Error deleting todo:", error))
  }, []);

  const handleUpdate = useCallback((updatedTodo) => {
    updateTodo(updatedTodo.id, updatedTodo)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === response.data.id ? response.data : todo
          )
        );
      })
      .catch((error) => console.error("Error updating todo:", error))
  }, [])

  const handleCreate = useCallback((newTodo) => {
    createTodo(newTodo)
      .then((response) => {
        setTodos((prevTodos) => [response.data, ...prevTodos])
        setTotalAmount((prevTotal) => prevTotal + 1)
      })
      .catch((error) => console.error("Error creating todo:", error))
  }, [])

  return {
    todos,
    totalAmount,
    handleFetchTodos,
    handleDelete,
    handleUpdate,
    handleCreate,
  }
}
