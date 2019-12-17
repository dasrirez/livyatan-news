import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchPatchSource } from '../actions/feed-actions'

class SourceItem extends React.Component {

  patchSourceRemove () {
    let args = {
      feed: this.props.feed,
      feedId: this.props.feed._id,
      userId: this.props.user.userId,
      action: 'remove',
      sourceId: this.props.source.id
    }
    this.props.fetchPatchSource(args)
  }

  render() {
    return (
      <div style={{ borderStyle: 'solid', borderColor: 'green'}}>
        <li>{this.props.source && this.props.source.name}</li>
        <input type="button" value="X" onClick={() => this.patchSourceRemove()}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchPatchSource }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceItem)
