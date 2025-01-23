import React, { useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid"
import {useQuery} from "../../context/QueryContext"
import {useStatus} from "../../context/StatusContext"
import {usePage} from "../../context/PageContext"
import SearchInput from "./SearchInput"
import StatusFilters from "./StatusFilters"
import PropTypes from "prop-types"

const SearchBar = ({ statuses }) => {
  // Local state for the form
  const [localQuery, setLocalQuery] = useState('')
  const [localStatus, setLocalStatus] = useState(' ')

  const { setQuery } = useQuery()
  const { setStatus } = useStatus()
  const { setPage } = usePage()

  const handleSearch = (event) => {
    event.preventDefault()

    // Update contexts only when Search is clicked
    setQuery(localQuery)
    setStatus(localStatus)
    setPage(1)
  }

  const handleReset = (event) => {
    event.preventDefault()
    setLocalQuery('')
    setLocalStatus(' ')

    setQuery('')
    setStatus('')
    setPage(1)
  };

  return (
    <form onSubmit={handleSearch}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <SearchInput
            label="Search by Title"
            name="query"
            value={localQuery}
            onChange={setLocalQuery}
          />
        </Grid>

        {/* Dropdown for Status */}
        <Grid item xs={4}>
          <StatusFilters
            label="Filter by Status"
            name="status"
            value={localStatus}
            onChange={setLocalStatus}
            options={statuses}
          />
        </Grid>

        {/* Search Button */}
        <Grid item xs={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Search
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button onClick={(e) => handleReset(e)} variant="contained" color="warning" fullWidth>
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  )
}

SearchBar.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }))
}

export default SearchBar
