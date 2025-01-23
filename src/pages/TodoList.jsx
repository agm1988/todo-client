import React from "react";
import { Container, Typography } from "@mui/material";
import TodosList from "../components/Todo/TodosList";
import TodoForm from "../components/TodoForm";
import CustomModal from "../modals/CustomModal";
import LoadingOverlay from "../components/LoadingOverlay";
import useAsync from "../hooks/useAsync";
import { useQuery } from "../context/QueryContext";
import { useStatus } from "../context/StatusContext";
import { usePage } from "../context/PageContext";
import { useTodos } from "../hooks/useTodos";
import { useModal } from "../hooks/useModal";

const TodoList = () => {
  const { query } = useQuery();
  const { status } = useStatus();
  const { page } = usePage();

  const {
    todos,
    totalAmount,
    onLoading, // Unified loading state
    handleFetchTodos,
    handleDelete,
    handleUpdate,
    handleCreate,
  } = useTodos(query, status, page);

  const {
    modalOpen,
    editingTodo,
    deletingTodo,
    toggleModal,
    openEditModal,
    closeModal,
    openDeleteModal,
  } = useModal();

  useAsync(handleFetchTodos, [query, status, page]);

  const handleFormSubmit = async (payload) => {

    const requestObj = payload.id ? handleUpdate(payload) : handleCreate(payload)

    return requestObj.then(() => closeModal())
  }

  const handleDeleteConfirm = () => {
    handleDelete(deletingTodo.id)
    closeModal()
  }

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
    >
      {/* Show the overlay during any operation */}
      <LoadingOverlay loading={onLoading} />

      <TodosList
        todos={todos}
        totalAmount={totalAmount}
        handleEdit={openEditModal}
        handleDelete={openDeleteModal}
      />

      <CustomModal
        isOpen={modalOpen || !!deletingTodo}
        onClose={closeModal}
        title={
          deletingTodo
            ? "Deleting Todo"
            : editingTodo?.id
              ? "Edit Todo"
              : "Create New Todo"
        }
        onConfirm={deletingTodo ? handleDeleteConfirm : null}
      >
        {deletingTodo ? (
          <Typography>
            {`Are you sure you want to delete "${deletingTodo?.title}" item?`}
          </Typography>
        ) : (
          <TodoForm
            initialValues={editingTodo}
            onSubmit={(values) => handleFormSubmit(values)}
          />
        )}
      </CustomModal>
    </Container>
  );
};

export default TodoList;
