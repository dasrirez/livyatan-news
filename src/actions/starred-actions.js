import { DOMAIN } from '../constants'
import { setError } from './error-actions'
import { getStarredArticles } from './articles-actions';
import { loading, notLoading } from './loading-articles-actions'

export const REQUEST_STARRED = 'star:request'
export const RECEIVE_STARRED = 'star:receive'
export const ERROR_STARRED = 'star:error'

export const requestStarred = () => ({
  type: REQUEST_STARRED,
})

export const receiveStarred = json => ({
  type: RECEIVE_STARRED,
  payload: {
    data: json,
  },
})

export const starredError = json => ({
  type: ERROR_STARRED,
  payload: {
    data: json,
  },
})

export const getStarred = args => {
  return dispatch => {
    dispatch(requestStarred)
    dispatch(loading)
    fetch(`${DOMAIN}/api/users/${args.userId}/stars/`, { credentials: 'include' })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(starred => {
        dispatch(receiveStarred(starred))
        dispatch(notLoading())
      })
      .catch(err => {
        dispatch(starredError(err))
        dispatch(setError(err.message))
        dispatch(notLoading())
      })
  }
}

export const postStarred = args => {
  return dispatch => {
    dispatch(requestStarred)
    fetch(`${DOMAIN}/api/users/${args.userId}/stars/`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        article: args.article,
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
      .then(() => dispatch(getStarred({ userId: args.userId })))
      .catch(err => {
        dispatch(starredError(err))
        dispatch(setError(err.message))
      })
  }
}

export const deleteStarred = args => {
  return dispatch => {
    dispatch(requestStarred)
    fetch(`${DOMAIN}/api/users/${args.userId}/stars/${args.starId}`, {
      method: 'delete',
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
      .then(() => {
        dispatch(getStarred({ userId: args.userId }))
        if (args.refetch)
          dispatch(getStarredArticles({ userId: args.userId }))
      })
      .catch(err => {
        dispatch(starredError(err))
        dispatch(setError(err.message))
      })
  }
}
