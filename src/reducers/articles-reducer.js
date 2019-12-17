import { RECEIVE_FEED_ARTICLES, APPEND_FEED_ARTICLES } from '../actions/articles-actions'

export default function (state = null, { type, payload }) {
  switch (type) {
    case RECEIVE_FEED_ARTICLES:
      return payload.data
    case APPEND_FEED_ARTICLES:
      return state.concat(payload.data)
    default:
      return state
  }
}