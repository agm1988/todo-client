import React from "react"
import Dialog from "@mui/material/Dialog"
import { DialogActions, DialogContent, DialogTitle, Slide } from "@mui/material"
import Button from "@mui/material/Button"
import PropTypes from "prop-types"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const CustomModal = ({title, isOpen, onClose, onConfirm = null, ...props}) => {
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
        <Button color="info" onClick={onClose}>Cancel</Button>
        { onConfirm && <Button color="error" onClick={onConfirm}>Confirm</Button> }
      </DialogActions>
    </Dialog>
  )
}

CustomModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func
}

export default CustomModal
