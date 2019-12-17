import { INCREMENT_PAGE, RESET_PAGE } from '../actions/page-actions'

export default function (state = 1, { type, payload }) {
  switch (type) {
    case INCREMENT_PAGE:
      return (payload.page + 1)
    case RESET_PAGE:
      return 1
    default:
      return state
  }
}