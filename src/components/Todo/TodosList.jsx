import React, { Fragment } from "react"
import PropTypes from "prop-types"
import Button from "@mui/material/Button"
import { Box, Typography } from "@mui/material"
import { Send } from "@mui/icons-material"
import TodoItem from "./TodoItem"

const TodosList = ({todos, handleEdit, handleDelete}) => {
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
        todos.length === 0 ? <div>No Todos</div> : (
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
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TodosList
