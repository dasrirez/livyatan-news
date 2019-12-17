import { SET_ERROR, CLEAR_ERROR } from '../actions/error-actions'

export default function (state='', { type, payload }) {
  switch (type) {
    case SET_ERROR:
      return payload.err
    case CLEAR_ERROR:
      return ''
    default:
      return state
  }
}