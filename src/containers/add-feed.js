
import React from 'react'
import { bindActionCreators } from 'redux'

import { Row, Col, Button, Input } from 'antd'

import { fetchAddFeed } from '../actions/feed-actions'
import { connect } from 'react-redux'

class AddFeed extends React.Component {
  constructor (props) {
    super(props)
    this.state = { newFeedName: '' }
    this.fetchAddFeed = this.fetchAddFeed.bind(this)
  }

  fetchAddFeed () {
    const feedName = this.state.newFeedName.trim()
    if (feedName.length !== 0) {
      this.props.fetchAddFeed(this.props.user.userId, feedName)
      this.setState({
        newFeedName: '',
        inputErrorMessage: null
      })
    } else {
      // dispatch an error to update navbar
      // this.setState({ inputErrorMessage: 'Feed name must contain characters' })
    }
  }

  addFeedForm () {
    return <>
      <Row gutter={10}>
        <Col span={18}>
          <Input id="newFeedName" placeholder="My new feed"/>
        </Col>
        <Col>
          <Button>Add</Button>
        </Col>
      </Row>
    </>
  }

  render () {
    return <>
      <Row gutter={10}>
        <Col span={18}>
          <Input
            onChange={(e) => this.setState({newFeedName: e.target.value})}
            placeholder="My new feed"/>
        </Col>
        <Col>
          <Button onClick={this.fetchAddFeed}>Add</Button>
        </Col>
      </Row>
    </>
    }
  }

const mapStateToProps = state => {
  return {
    user: state.authentication,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchAddFeed }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFeed)