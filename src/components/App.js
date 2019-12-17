import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import { alertActions } from '../actions/alert-actions'
import { Landing } from '../containers/landing'
import { history } from '../helpers'
import { NoMatch } from './no-match'
import { PrivateRoute } from './private-route'
import { Signin } from '../containers/signin'
import { Signup } from '../containers/signup'

import Credits from '../containers/credits'
import Dashboard from '../containers/dashboard'
import Sidebar  from '../containers/sidebar'

class App extends React.Component {
  constructor(props){
    super(props)

    const { dispatch } = this.props
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())
    })
  }

  render() {
    return(
      <div>
        <Router history={history}>
          <div>
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/signup" component={Signup} />
              <Route path="/signin" component={Signin} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/sidebar" component={Sidebar} />
              <Route path="/credits" component={Credits} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

function mapStateToProps(state){
  const {alert} = state
  return {
    alert,
  }
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }
