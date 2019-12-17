import { RECEIVE_STARRED } from '../actions/starred-actions'
export default function (state=null, { type, payload }) {
  switch (type) {
    case RECEIVE_STARRED:
      return payload.data
    default:
      return state
  }
}
