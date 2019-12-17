export const ALERT_SUCCESS = 'alert:success'
export const ALERT_ERROR = 'alert:failure'
export const ALERT_CLEAR = 'alert:clear'

function success(message){
  return { type: ALERT_SUCCESS, message, }
}

function error(message){
  return { type: ALERT_ERROR, message, }
}

function clear(){
  return { type: ALERT_CLEAR, }
}

export const alertActions = {
  clear,
  error,
  success,
}
