export const SET_ERROR = 'error:set'
export const CLEAR_ERROR = 'error:clear'

export const setError = (err) => {
  return {
    type: SET_ERROR,
    payload: {
      err
    }
  }
}

export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  }
}