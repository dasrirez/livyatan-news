import { DOMAIN } from '../constants'
import { setError } from './error-actions'
// import { DOMAIN, VIEWS } from '../constants'
import { getArticles } from './articles-actions';
// import { changeActiveView } from './active-view-actions'

export const ERROR_USER_FEEDS = 'userFeeds:error'
export const RECEIVE_USER_FEEDS = 'userFeeds:receive'
export const REQUEST_USER_FEEDS = 'userFeeds:request'
export const SELECT_FEED = 'userFeeds:select'
export const SELECT_STARRED = 'userFeeds:selectStarred'
export const SELECT_API = 'userFeeds:selectAPI'
export const MANAGE_FEED = 'userFeeds:manage'
export const MANAGE_FEED_SOURCES = 'userFeeds:manageSources'
export const ADD_FEED = 'userFeeds:add'
export const DELETE_FEED = 'userFeeds:delete'
export const PATCH_SOURCE = 'userFeeds:patchSource'
export const PATCH_FEED = 'userFeeds:patchFeed'


export const selectAPIs = () => ({
  type: SELECT_API,
})

export const requestUserFeed = () => ({
  type: REQUEST_USER_FEEDS,
})

export const selectStarred = () => ({
  type: SELECT_STARRED,
  payload: {
    feed: null,
  },
})

export const selectFeed = feed => ({
  type: SELECT_FEED,
  payload: {
    feed,
  },
})

export const manageFeed = feed => ({
  type: MANAGE_FEED,
  payload: {
    feed,
  },
})

export const manageFeedSources = feed => ({
  type: MANAGE_FEED_SOURCES,
  payload: {
    feed,
  },
})

export const receiveUserFeed = feeds => ({
  type: RECEIVE_USER_FEEDS,
  payload: {
    receivedAt: Date.now(),
    feeds: feeds,
  },
})

export const errorUserFeed = err => ({
  type: ERROR_USER_FEEDS,
  payload: {
    error: err.message,
  },
})

export const fetchUserFeeds = user => {
  return dispatch => {
    dispatch(requestUserFeed())
    fetch(`${DOMAIN}/api/users/${user}/feeds/`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(feeds => {
        dispatch(receiveUserFeed(feeds))
      })
      .catch(err => {
        dispatch(errorUserFeed(err))
        dispatch(setError(err.message))
      })
  }
}

export const addFeed = feed => ({
  type: ADD_FEED,
    payload: {
      feed
    }
})

export const deleteFeed = feed => ({
  type: DELETE_FEED,
  payload: {
    feed
  }
})

export const patchFeed = feed => ({
  type: PATCH_FEED,
  payload: {
    feed
  }
})

export const patchSource = feed => ({
  type: PATCH_SOURCE,
  payload: {
    feed
  }
})

export const fetchAddFeed = (userId, feedName) => {
  return dispatch => {
    fetch(`${DOMAIN}/api/users/${userId}/feeds/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "name": feedName
      })
    })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then((feed) => {
        dispatch(addFeed(feed))
      })
      .catch(err => {
        dispatch(errorUserFeed(err))
        dispatch(setError(err.message))
      })
  }
}

export const fetchDeleteFeed = (userId, feedId) => {
  return dispatch => {
    fetch(`${DOMAIN}/api/users/${userId}/feeds/${feedId}/`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then((feed) => {
        dispatch(deleteFeed(feed))
        dispatch(selectStarred())
        // dispatch(changeActiveView(VIEWS.STARRED))
      })
      .catch(err => {
        dispatch(errorUserFeed(err))
        dispatch(setError(err.message))
      })
  }
}

export const fetchPatchSource = args => {
  return dispatch => {
    fetch(`${DOMAIN}/api/users/${args.userId}/feeds/${args.feedId}/sources/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: args.action,
        sourceId: args.sourceId,
      }),
    })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then((updatedFeed) => {
        dispatch(patchSource(updatedFeed))
        if (args.feed) {
          dispatch(getArticles(args.userId, args.feed))
        }
      })
      .catch(err => {
        dispatch(errorUserFeed(err))
        dispatch(setError(err.message))
      })
  }
}
export const fetchPatchFeed = (userId, feedId, newFeedName) => {
  return dispatch => {
    fetch(`${DOMAIN}/api/users/${userId}/feeds/${feedId}/`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: newFeedName
      }),
    })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then((updatedFeed) => {
        dispatch(patchFeed(updatedFeed))
      })
      .catch(err => {
        dispatch(errorUserFeed(err))
        dispatch(setError(err.message))
      })
  }
}