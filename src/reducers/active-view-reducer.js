import { VIEWS } from '../constants'
import { CHANGE_ACTIVE_VIEW } from '../actions/active-view-actions'
import { SELECT_FEED, SELECT_STARRED, MANAGE_FEED, MANAGE_FEED_SOURCES, SELECT_API } from '../actions/feed-actions'

const initialState = VIEWS.STARRED

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SELECT_FEED:
      return VIEWS.FEED
    case SELECT_STARRED:
      return VIEWS.STARRED
    case MANAGE_FEED:
      return VIEWS.MANAGE_FEED
    case MANAGE_FEED_SOURCES:
      return VIEWS.MANAGE_FEED_SOURCES
    case CHANGE_ACTIVE_VIEW:
      return payload.view
    case SELECT_API:
      return VIEWS.API
    default:
      return state
  }
}