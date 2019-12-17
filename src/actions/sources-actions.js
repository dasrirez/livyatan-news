import { DOMAIN } from '../constants'
import { setError } from './error-actions'
export const REQUEST_SOURCES = 'sourcelist:request'
export const RECEIVE_SOURCES = 'sourcelist:receive'
export const RECEIVE_ALL_SOURCES = 'sourcelist:receiveAll'
export const ERROR_SOURCES = 'sourcelist:error'

export const requestSources = () => {
  return {
    type: REQUEST_SOURCES
  }
}

export const receiveSources = response => {
  return {
    type: RECEIVE_SOURCES,
    payload: {
      data: response,
      receivedAt: Date.now(),
    }
  }
}

export const receiveAllSources = response => {
  return {
    type: RECEIVE_ALL_SOURCES,
    payload: {
      data: response,
      receivedAt: Date.now(),
    }
  }
}

export const error = err => {
  return {
    type: ERROR_SOURCES,
    payload: {
      error: err.message,
    },
  }
}

export const fetchSources = request => {
  return dispatch => {
    dispatch(requestSources())
    fetch(`${DOMAIN}/api/sources/?category=${request.category}`, { credentials: 'include' })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(json => {
        dispatch(receiveSources(json))
      })
      .catch(err => {
        dispatch(error(err))
        dispatch(setError(err.message))
      })
  }
}

export const fetchAllSources = request => {
  return dispatch => {
    dispatch(requestSources())
    fetch(`${DOMAIN}/api/sources/`, { credentials: 'include' })
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(json => {
        dispatch(receiveAllSources(json))
      })
      .catch(err => {
        dispatch(error(err))
        dispatch(setError(err.message))
      })
  }
}
