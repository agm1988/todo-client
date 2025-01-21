import React from "react"
import Dialog from "@mui/material/Dialog"
import { DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material"
import Button from "@mui/material/Button"
import PropTypes from "prop-types"
import TodoForm from "../components/TodoForm"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
})

const Modal = ({title, isOpen, onClose, ...props}) => {
  return (
    <Dialog
      open={isOpen}
      TransitionComponent={Transition}
      onClose={onClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

TodoForm.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
