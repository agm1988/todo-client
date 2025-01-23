import { useState, useCallback } from "react";
import { fetchTodos, deleteTodo, updateTodo, createTodo } from "../api/apiClient";
import { prepareSearchParams } from "../lib/utils/common";

export const useTodos = (query, status, page) => {
  const [todos, setTodos] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [onLoading, setOnLoading] = useState(false); // Single loading state

  const handleFetchTodos = useCallback(() => {
    setOnLoading(true);
    const params = prepareSearchParams(query, status, page);

    return fetchTodos(params)
      .then((response) => {
        setTodos(response.data.data);
        setTotalAmount(response.data.total_amount);
        return response;
      })
      .catch((error) => console.error("Error fetching todos:", error))
      .finally(() => setOnLoading(false));
  }, [query, status, page]);

  const handleDelete = useCallback((id) => {
    setOnLoading(true);
    return deleteTodo(id)
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        setTotalAmount((prevTotal) => prevTotal - 1);
      })
      .catch((error) => console.error("Error deleting todo:", error))
      .finally(() => setOnLoading(false));
  }, []);

  const handleUpdate = (updatedTodo) => {
    setOnLoading(true)
    return updateTodo(updatedTodo.id, updatedTodo)
      .then((response) => {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === response.data.id ? response.data : todo
          )
        );
        return response.data
      })
      .finally(() => setOnLoading(false))
  }

  const handleCreate = (newTodo) => {
    setOnLoading(true)

    return createTodo(newTodo)
      .then((response) => {
        setTodos((prevTodos) => [response.data, ...prevTodos])
        setTotalAmount((prevTotal) => prevTotal + 1)
        return response.data
      })
      .finally(() => setOnLoading(false))
  }

  return {
    todos,
    totalAmount,
    onLoading,
    handleFetchTodos,
    handleDelete,
    handleUpdate,
    handleCreate,
  };
};
