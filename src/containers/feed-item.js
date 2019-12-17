import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row, Button, Input, PageHeader } from 'antd'

import { resetPage } from '../actions/page-actions'
import { getArticles } from '../actions/articles-actions'
import { selectFeed, fetchDeleteFeed, fetchPatchFeed } from '../actions/feed-actions'

class FeedItem extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      renamedFeed: this.props.activeFeed.name,
    }
    this.handleRename = this.handleRename.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }

  fetchDeleteFeed () {
//    const refetch = this.props.activeFeed && this.props.activeFeed._id === this.props.feed._id
    this.props.fetchDeleteFeed(this.props.activeFeed.userId, this.props.activeFeed._id)
  }

  fetchPatchFeed () {
    this.props.fetchPatchFeed(this.props.feed.userId, this.props.feed._id, this.state.renamedFeed.trim())
  }

  handleRename(e) {
    e.preventDefault()
    this.props.fetchPatchFeed(this.props.activeFeed.userId,
      this.props.activeFeed._id,
      this.state.renamedFeed.trim())
  }

  handleDelete(e) {
    e.preventDefault()
    this.props.fetchDeleteFeed(this.props.activeFeed.userId, this.props.activeFeed._id)
  }


  render () {
    return <React.Fragment>
        <PageHeader
          className={'manage-feed-header'}
          title="Manage Feed"
          subTitle={`You can rename or delete this feed here`}
        >
        <Row className={'manage-feed-form-item'} gutter={6}>
          <Col span={8}>
            <Input
              defaultValue={this.props.activeFeed.name}
              onChange={(e) => {this.setState({ renamedFeed: e.target.value })}}/>
          </Col>
          <Col span={2}>
            <Button onClick={this.handleRename}>Rename</Button>
          </Col>
        </Row>
        <Row className={'manage-feed-form-item'}>
          <Col>
            <Button onClick={this.handleDelete} type="danger">Delete</Button>
          </Col>
        </Row>
        </PageHeader>
      </React.Fragment>
  }
}

const mapStateToProps = state => ({
  user: state.authentication,
  activeFeed: state.activeFeed
})

const mapDispatchToProps = dispatch => bindActionCreators({
  selectFeed,
  getArticles,
  resetPage,
  fetchDeleteFeed,
  fetchPatchFeed
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FeedItem)