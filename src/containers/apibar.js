import React, { Component } from 'react'
import { connect } from 'react-redux'

import Tweets from './tweets'
import Weather from './weather'
import Stocks from './stocks'
import { Row, Col } from 'antd'

class APIbar extends Component {

  render () {
    return (
    <Row gutter={32}>
      <Col span={12}>
        <Tweets/>
      </Col>
      <Col span={12}>
        <Weather />
        <Stocks />
      </Col>
    </Row>
    )
  }
}

export default connect()(APIbar)
