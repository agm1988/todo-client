import React from 'react'
import { Pagination } from '@mui/material'
import { PER_PAGE } from "../../constants"
import PropTypes from "prop-types"

const CustomPagination = ({ totalAmount, perPage = PER_PAGE, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalAmount / perPage)

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => {
          onPageChange(page)
        }}
        color="primary"
        size="large"
        variant="outlined"
      />
    </div>
  )
}

CustomPagination.propTypes = {
  totalAmount: PropTypes.number.isRequired,
  perPage: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default CustomPagination
