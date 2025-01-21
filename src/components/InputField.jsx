import React from "react"
import PropTypes from "prop-types"
import TextField from "@mui/material/TextField"

const InputField = ({ label, name, value, onChange, onBlur, error, helperText, required, ...props }) => {
  return (
    <TextField
      required={required}
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={!!error}
      helperText={helperText}
      {...props}
    />
  )
}

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  helperText: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func
}

export default InputField
