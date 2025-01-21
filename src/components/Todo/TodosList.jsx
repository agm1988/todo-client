import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button"
import { Box, Typography } from "@mui/material"
import { Send } from "@mui/icons-material"
import TodoItem from "./TodoItem"
import CustomPagination from "../CustomPagination/CustomPagination"
import { usePage } from "../../context/PageContext"

const TodosList = ({todos, totalAmount, handleEdit, handleDelete}) => {
  const { page, setPage } = usePage();

  return (
    <Fragment>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
      </Box>
      <Button
        variant="contained"
        endIcon={<Send />}
        color="success"
        onClick={() => handleEdit()}
      >
        New Todo
      </Button>
      {
        todos.length === 0 ? <Typography variant="h5">No Todos</Typography> : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        )
      }
      <CustomPagination
        totalAmount={totalAmount}
        currentPage={page}
        onPageChange={setPage}
      />
    </Fragment>
  )
}

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string
  })),
  totalAmount: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TodosList
