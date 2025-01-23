import { useState } from "react"

export const useModal = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)
  const [deletingTodo, setDeletingTodo] = useState(null)

  const toggleModal = () => setModalOpen((prev) => !prev)

  const openEditModal = (todo) => {
    setEditingTodo(todo)
    setModalOpen(true)
  };

  const closeModal = () => {
    setModalOpen(false)
    setEditingTodo(null)
    setDeletingTodo(null)
  };

  const openDeleteModal = (todo) => {
    setDeletingTodo(todo)
  };

  return {
    modalOpen,
    editingTodo,
    deletingTodo,
    toggleModal,
    openEditModal,
    closeModal,
    openDeleteModal,
  }
}
