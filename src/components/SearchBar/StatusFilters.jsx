import React from "react"
import SelectField from "../SelectField"
import PropTypes from "prop-types"

const SearchFilters = ({ options, value, name, label, onChange }) => {
  return (
    <SelectField
      label={label}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
    />
  )
}

SearchFilters.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })),
    onChange: PropTypes.func.isRequired
  }))
}

export default SearchFilters
