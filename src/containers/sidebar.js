import React, { Component } from 'react'
import { connect } from 'react-redux'

import FeedList from './feed-list'
import Starred from './starred'

class Sidebar extends Component {

  render () {
    return (
      <div>
        <Starred/>
        <FeedList/>
      </div>
    )
  }
}

export default connect()(Sidebar)
