import {TODO_STATUSES_MAPPING} from "../mappings/todoMapping"

export const searchStatusesDict= [
  { value: ' ', label: 'All' },
  ...Object.values(TODO_STATUSES_MAPPING)
]
