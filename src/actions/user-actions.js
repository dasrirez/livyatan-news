import { userService } from '../service/user-service'
import { alertActions } from './alert-actions'
import { history } from '../helpers/'
import { clearError, setError } from './error-actions'

export const SIGNIN_REQUEST = 'user:signinRequest'
export const SIGNIN_SUCCESS = 'user:signinSuccess'
export const SIGNIN_FAILURE = 'user:signinFailure'

export const SIGNOUT = 'user:signout'

const oauth = googleUser => {
  let token = googleUser.Zi.id_token
  return dispatch => {
    dispatch(request('oauth'))
    userService.oauth(token)
      .then(
        data => data.json(),
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        }
      )
      .then(data => {
        dispatch(success(data.userId))
        history.push('/dashboard')
      })
  }

  function request(userId) { return { type: SIGNIN_REQUEST, userId, } }
  function success(userId) { return { type: SIGNIN_SUCCESS, userId, } }
  function failure(error) { return { type: SIGNIN_FAILURE, error, } }
}

const signin = (userId, password) => {
  return dispatch => {
    dispatch(request(userId))

    userService.signin(userId, password)
      .then(
        () => {
          dispatch(success( userId ))
          dispatch(clearError())
          // redirect here
          history.push('/dashboard')

        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(setError(error.toString()))
          // dispatch(alertActions.error(error.toString()))
        }
      )
      .catch((err) => this.props.setError(err));
  }

  function request(userId) { return { type: SIGNIN_REQUEST, userId, } }
  function success(userId) { return { type: SIGNIN_SUCCESS, userId, } }
  function failure(error) { return { type: SIGNIN_FAILURE, error, } }
}

const signout = () => {
  userService.signout()
  return { type: SIGNOUT }
}

const signup = (userId, password) => {
  return dispatch => {
    dispatch(request(userId))

    userService.signup(userId, password)
      .then(
        () => {
          dispatch(success(userId))
          dispatch(clearError())
          // redirect here
          history.push('/dashboard')
          // dispatch(alertActions.success('Signup successful'))
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(setError(error.toString()))
          // dispatch(alertActions.error(error.toString()))
        }
      )
      .catch((err) => this.props.setError(err));
  }

  function request(userId) { return { type: SIGNIN_REQUEST, userId } }
  function success(userId) { return { type: SIGNIN_SUCCESS, userId } }
  function failure(error) { return { type: SIGNIN_FAILURE, error } }
}

export const userActions = {
  oauth,
  signin,
  signout,
  signup,
}
