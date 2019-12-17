import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Icon } from 'antd'
import { resetPage } from '../actions/page-actions'
import { getStarredArticles } from '../actions/articles-actions'
import { selectFeed } from '../actions/feed-actions'

class Starred extends Component {
  componentWillMount() {
    this.props.getStarredArticles({ userId: this.props.user.userId, page: 1 })
    this.props.resetPage()
  }
  selectStarred = () => this.props.selectFeed(null)
  render() {
    return (
      <span onClick={() => {this.selectStarred(); this.props.resetPage(); this.props.getStarredArticles({ userId: this.props.user.userId, page: 1 })}}>
        <Icon type="star"/>Starred
      </span>
    )
  }
}

const mapStateToProps = state => ({ user: state.authentication, activeFeed: state.activeFeed })
const mapDispatchToProps = dispatch => bindActionCreators({ selectFeed, getStarredArticles, resetPage }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Starred)