import React from "react"
import PropTypes from "prop-types"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography
} from "@mui/material"
import { red } from "@mui/material/colors"
import { Create, DeleteTwoTone } from "@mui/icons-material"
import StatusLabel from "../labels/StatusLabel"

const TodoItem = ({todo, handleEdit, handleDelete}) => {
  return (
    <Card key={todo.id} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {todo.status[0]}
          </Avatar>
        }
        title={todo.title}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {todo.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <StatusLabel status={todo.status} />
        <IconButton
          onClick={() => handleEdit(todo)}
          aria-label="add to favorites">
          <Create />
        </IconButton>
        <IconButton
          onClick={() => handleDelete(todo.id)}
          aria-label="share">
          <DeleteTwoTone />
        </IconButton>
      </CardActions>

      <Divider />
    </Card>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string
  })),
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default TodoItem
