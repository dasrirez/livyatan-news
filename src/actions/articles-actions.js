import { DOMAIN } from '../constants'
import { loading, notLoading } from './loading-articles-actions'
import { setError } from './error-actions'


export const REQUEST_FEED_ARTICLES = 'articles:request'
export const RECEIVE_FEED_ARTICLES = 'articles:receive'
export const FEED_ARTICLES_ERROR = 'articles:error'
export const APPEND_FEED_ARTICLES = 'articles:append'

export const requestArticles = () => {
  return {
    type: REQUEST_FEED_ARTICLES,
  }
}

export const receiveArticles = (json) => ({
  type: RECEIVE_FEED_ARTICLES,
  payload: {
    receivedAt: Date.now(),
    data: json,
  }
})

export const appendArticles = (json, articles) => ({
  state: articles,
  type: APPEND_FEED_ARTICLES,
  payload: {
    receivedAt: Date.now(),
    data: json,
  }
})

export const articlesError = (err) => {
  return {
    type: FEED_ARTICLES_ERROR,
    payload: {
      error: err.message,
    },
  }
}

export function getArticles(userId ,feed, page=1, articles = null){
  return dispatch => {
    dispatch(requestArticles())
    dispatch(loading())
    return fetch(`${DOMAIN}/api/users/${userId}/feeds/${feed._id}/articles/?page=${page}`, {credentials: 'include'})
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(json => {
        if (page === 1){
          dispatch(receiveArticles(json.articles))
        }
        else {
          dispatch(appendArticles(json.articles, articles))
        }
        dispatch(notLoading())
      })
      .catch(err => {
        dispatch(setError(err.message))
        dispatch(notLoading())
      })
  }
}

export function getStarredArticles(args){
  return dispatch => {
    dispatch(requestArticles())
    dispatch(loading())
    return fetch(`${DOMAIN}/api/users/${args.userId}/stars/?page=${args.page}`, {credentials: 'include'})
      .then(
        response => {
          if (response.ok)
            return response.json()
          throw Error(response.statusText)
        },
        error => console.log('An error occurred.', error),
      )
      .then(json => {
        let i = 0
        let articles = []
        if (json.length === 0) {
          if (args.articles){
            dispatch(appendArticles(articles, args.articles))
          }
          else{
            dispatch(receiveArticles(articles))
          }
          dispatch(notLoading())
        } else {
          json = json.forEach(starred => {
            articles.push(starred.article)
            i++
            if (i === json.length){
              if (args.articles){
                dispatch(appendArticles(articles, args.articles))
              }
              else{
                dispatch(receiveArticles(articles))
              }
              dispatch(notLoading())
            }
          })
        }
      })
      .catch(err => {
        dispatch(setError(err.message))
        dispatch(notLoading())
      })
  }
}