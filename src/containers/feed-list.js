import React from 'react'
import FeedItem from './feed-item'
import { bindActionCreators } from 'redux'

import { fetchUserFeeds, fetchAddFeed } from '../actions/feed-actions'
import { connect } from 'react-redux'

class FeedList extends React.Component {
  constructor (props) {
    super(props)
    this.state = { newFeedName: '' }
  }

  componentDidMount () {
    this.props.fetchUserFeeds(this.props.user.userId)
  }

  createFeedListItems() {
    return this.props.userFeeds.feeds && this.props.userFeeds.feeds.map(feed => {
      return <FeedItem key={feed._id}
                        selected={this.props.activeFeed && feed._id === this.props.activeFeed._id}
                        feed={feed}/>})
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
      this.setState({ inputErrorMessage: 'Feed name must contain characters' })
    }
  }

  inputErrorMessage () {
    return (
      <div>{this.state.inputErrorMessage}</div>
    )
  }

  addFeedForm () {
    return (
      <div>
        <input type="text" value={this.state.newFeedName}
               onChange={(event) => {this.setState({ newFeedName: event.target.value })}}/>
        {this.inputErrorMessage()}
        <input type="button" onClick={() => this.fetchAddFeed()} value="Add Feed"/>
      </div>
    )
  }

  render () {
    if (this.props.userFeeds.error) {
      return <div>Error: {this.props.userFeeds.error}</div>
    } else if (this.props.userFeeds.isFetching) {
      return <div>Loading...</div>
    } else {
      return (
        <div style={{ borderStyle: 'solid', borderColor: 'red' }}>
          <h3>Feed List</h3>
          {this.addFeedForm()}
          {this.createFeedListItems()}
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication,
    userFeeds: state.userFeeds,
    activeFeed: state.activeFeed,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchUserFeeds, fetchAddFeed }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedList)