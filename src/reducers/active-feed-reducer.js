import { PATCH_SOURCE, SELECT_FEED, SELECT_STARRED, MANAGE_FEED, MANAGE_FEED_SOURCES } from '../actions/feed-actions'

export default function (state = null, { type, payload }) {
  switch (type) {
    case SELECT_STARRED:
      return null
    case SELECT_FEED:
      return payload.feed
    case MANAGE_FEED:
      return payload.feed
    case MANAGE_FEED_SOURCES:
      return payload.feed
    case PATCH_SOURCE:
        return payload.feed
    default:
      return state
  }
}
