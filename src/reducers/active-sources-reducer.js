import { REQUEST_SOURCES, RECEIVE_SOURCES, ERROR_SOURCES } from '../actions/sources-actions'

let initialState = {
  isFetching: false,
  error: null,
  items: [],
}

export default function (state=initialState, { type, payload }) {
  switch (type) {
    case REQUEST_SOURCES:
      return {
        ...state,
        isFetching: true,
      }
    case RECEIVE_SOURCES:
      return {
        ...state,
        isFetching: false,
        items: payload.data,
      }
    case ERROR_SOURCES:
      return {
        ...state,
        error: payload.error
      }
    default:
      return state
  }
}
