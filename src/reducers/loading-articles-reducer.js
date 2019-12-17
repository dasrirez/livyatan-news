import { LOADING, NOT_LOADING } from '../actions/loading-articles-actions'

export default function (state=false, { type }) {
  switch (type) {
    case LOADING:
      return true
    case NOT_LOADING:
      return false
    default:
      return state
  }
}