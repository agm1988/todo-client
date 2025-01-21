import React, { useEffect, useState } from "react"
import { fetchTodos, deleteTodo, updateTodo, createTodo } from "../api/apiClient"
import TodosList from "../components/Todo/TodosList"
import { Container } from "@mui/material"
import TodoForm from "../components/TodoForm"
import Modal from "../modals/Modal"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [editingTodo, setEditingTodo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    fetchTodos()
      .then((response) => setTodos(response.data.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, [])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleDelete = (id) => {
    deleteTodo(id)
      .then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)))
  }

  const handleEdit = (todo) => {
    setEditingTodo(todo)
    toggleModal()
  }

  const onUpdateSuccess = (updatedTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    )
  }

  const onCreateSuccess = (todo) => setTodos(prevTodos => [todo, ...prevTodos])

  const handleFormSubmit = async (payload) => {
    const isUpdate = !!payload.id
    // const requestObj = isUpdate ? updateTodo(payload.id, payload) : createTodo(payload)
    const requestObj = isUpdate ? (
      updateTodo(payload.id, payload)
        .then(response => onUpdateSuccess(response.data))
    ) : (
      createTodo(payload)
        .then(response => onCreateSuccess(response.data))
    )

    return requestObj.then(() => toggleModal())
  }

  return (
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
      >
      <TodosList
        todos={todos}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Modal
        isOpen={isOpen}
        onClose={toggleModal}
        todo={editingTodo}
        onSubmit={(values) => handleFormSubmit(values)}
        title={editingTodo?.id ? 'Edit Todo' : 'Create New Todo'}>
        <TodoForm
          initialValues={editingTodo}
          onSubmit={(values) => handleFormSubmit(values)}
        />
      </Modal>
    </Container>
  )
}

export default TodoList
