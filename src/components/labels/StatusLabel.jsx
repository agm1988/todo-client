import React from "react"
import { Chip } from "@mui/material"
import { DONE_TODO, IN_PROGRESS_TODO, PENDING_TODO } from "../../dictionaries/todoDict"
import { TODO_STATUSES_MAPPING } from "../../mappings/todoMapping"
import PropTypes from "prop-types"

const statusLabelColorMapping = {
  [PENDING_TODO]: 'default',
  [IN_PROGRESS_TODO]: 'warning',
  [DONE_TODO]: 'success'
}

const defaultStatusLabelColor = 'error'

const StatusLabel = ({status}) => (
  <Chip
    label={TODO_STATUSES_MAPPING[status].label}
    color={statusLabelColorMapping[status] || defaultStatusLabelColor}
  />
)

StatusLabel.propTypes = {
  status: PropTypes.string
}

export default StatusLabel
