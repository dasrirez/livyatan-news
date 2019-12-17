import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Cookies.get('userId')
      ? <Component {...props} />
      : <Redirect to={{pathname: '/'}} />
  )} />
)