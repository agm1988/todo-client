import React, { useEffect, useState } from "react"
import { fetchTodos, deleteTodo, updateTodo, createTodo } from "../api/apiClient"
import TodosList from "../components/Todo/TodosList"
import { Container, Typography } from "@mui/material"
import TodoForm from "../components/TodoForm"
import { useQuery } from "../context/QueryContext"
import { useStatus } from "../context/StatusContext"
import { usePage } from "../context/PageContext"
import { prepareSearchParams } from "../lib/utils/common"
import CustomModal from "../modals/CustomModal"

const TodoList = () => {
  const [todos, setTodos] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [editingTodo, setEditingTodo] = useState(null)
  const [deletingTodo, setDeletingTodo] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  const { query } = useQuery()
  const { status } = useStatus()
  const { page } = usePage()

  useEffect(() => {
    const params = prepareSearchParams(query, status, page)
    fetchTodos(params)
      .then((response) => {
        setTodos(response.data.data)
        setTotalAmount(response.data.total_amount)
      })
      .catch((error) => console.error("Error fetching todos:", error));
  }, [query, status, page])

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  const handleDelete = (id) => {
    setDeletingTodo(null)
    deleteTodo(id)
      .then(() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)))
      .then(() => setTotalAmount(totalAmount - 1))
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
    const requestObj = isUpdate ? (
      updateTodo(payload.id, payload)
        .then(response => onUpdateSuccess(response.data))
    ) : (
      createTodo(payload)
        .then(response => onCreateSuccess(response.data))
        .then(() => setTotalAmount(totalAmount + 1))
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
        totalAmount={totalAmount}
        handleEdit={handleEdit}
        handleDelete={setDeletingTodo}
      />

      {/*/!*  TODO: Refactor confirm now it's shitty *!/*/}
      {/*/!*  Complex code just to show that modal component is reusable and one modal is rendered :) *!/*/}
      {/*/!*  See previous commits for earlier versions *!/*/}
      <CustomModal
        isOpen={isOpen || !!deletingTodo}
        onClose={
          deletingTodo ? () => {setDeletingTodo(null)} : toggleModal
        }
        title={
          () => {
            if (deletingTodo) { return 'Deleting Todo' }
            return editingTodo?.id ? 'Edit Todo' : 'Create New Todo'
          }
        }
        onConfirm={deletingTodo ? () => handleDelete(deletingTodo.id) : null}
      >
        {
          deletingTodo ? (
            <Typography>
              {`Are you sure you want to delete "${deletingTodo?.title}" item?`}
            </Typography>
          ) : (
            <TodoForm
              initialValues={editingTodo}
              onSubmit={(values) => handleFormSubmit(values)}
            />)
        }
      </CustomModal>
    </Container>
  )
}

export default TodoList
