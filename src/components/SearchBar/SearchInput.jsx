import React from "react"
import InputField from "../InputField"
import PropTypes from "prop-types"

const SearchInput = ({value, name, label, onChange, ...props}) => (
  <InputField
    label={label}
    name={name}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
)

SearchInput.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  }))
}

export default SearchInput
