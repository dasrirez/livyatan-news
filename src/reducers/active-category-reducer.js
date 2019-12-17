import { SELECT_CATEGORY } from '../actions/categories-actions'

export default function (state = null, { type, payload }) {
  switch (type) {
    case SELECT_CATEGORY:
      return payload.category
    default:
      return state
  }
}
