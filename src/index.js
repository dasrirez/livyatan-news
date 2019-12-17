import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
//import { createLogger } from 'redux-logger'

import './style/index.css'
import * as serviceWorker from './service-worker'

import allReducers from './reducers'

import { App } from './components/App'

let store
let allStoreEnhancers

if (process.env.NODE_ENV !== 'production') {
  allStoreEnhancers = compose(
    applyMiddleware(
      thunkMiddleware,
    //  createLogger(),
    ),
    /**
     * Uncomment below ONLY IF you are using `Redux Dev Tools Chrome extension` found at
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
     * */
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
} else {
  allStoreEnhancers = compose(
    applyMiddleware(thunkMiddleware))
}

store = createStore(
  allReducers,
  allStoreEnhancers,
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
