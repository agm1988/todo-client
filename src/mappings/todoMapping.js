// TODO: fetch from api statuses dict, labelk should be in translations onn backend.
//  All data should be received fromm backent, minimum logic on frontyend

import { DONE_TODO, IN_PROGRESS_TODO, PENDING_TODO } from "../dictionaries/todoDict"

export const TODO_STATUSES_MAPPING = {
  [PENDING_TODO]: {
    value: PENDING_TODO,
    label: 'Pending'
  },
  [IN_PROGRESS_TODO]: {
    value: IN_PROGRESS_TODO,
    label: 'In Progress'
  },
  [DONE_TODO]: {
    value: DONE_TODO,
    label: 'Done'
  }
}
