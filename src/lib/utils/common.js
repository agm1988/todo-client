import {PER_PAGE} from "../../constants"

export const parseError = error => error?.response?.data

export const prepareSearchParams = (query, status, page = 1, per_page = PER_PAGE) => {
  return {
    search: query,
    filters: {
      status: status
    },
    offset: per_page * (page - 1),
    per_page: per_page
  }
}
