import {
  REQUEST_USER_FEEDS,
  RECEIVE_USER_FEEDS,
  ERROR_USER_FEEDS,
  ADD_FEED,
  DELETE_FEED,
  PATCH_FEED,
  PATCH_SOURCE
} from '../actions/feed-actions'

let initialState = {
  isFetching: false,
  didInvalidate: false,
  error: null
}

const addFeed = (feeds, feed) => {
  let newFeeds = feeds.slice()
  newFeeds.push(feed)
  return newFeeds
}

const deleteFeed = (feeds, feedToDelete) => {
  let newFeeds = feeds.filter(feed => feed._id !== feedToDelete._id)
  return newFeeds
}

const patchFeed = (feeds, updatedFeed) => {
  let newFeeds = feeds.map(feed => {
    if (feed._id === updatedFeed._id) {
      return updatedFeed
    } else {
      return feed
    }
  })
  return newFeeds
}

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case REQUEST_USER_FEEDS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_USER_FEEDS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        feeds: payload.feeds,
      }
    case ERROR_USER_FEEDS:
      return {
        ...state,
        error: payload.error
      }
    case ADD_FEED:
      return {
        ...state,
        feeds: addFeed(state.feeds, payload.feed)
      }
    case DELETE_FEED:
      return {
        ...state,
        feeds: deleteFeed(state.feeds, payload.feed)
      }
    case PATCH_FEED:
      return {
        ...state,
        feeds: patchFeed(state.feeds, payload.feed)
      }
    case PATCH_SOURCE:
      return {
        ...state,
        feeds: patchFeed(state.feeds, payload.feed)
      }
    default:
      return state
  }
}
