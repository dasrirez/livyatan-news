import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const NoMatch = ({ component: Component, ...rest }) => (
  <Route {...rest} render={ props => (
    <Redirect to={{pathname: '/'}} />
  )} />
)