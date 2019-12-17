import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeActiveView } from '../actions/active-view-actions'
import { VIEWS } from '../constants'
import SourceItem from './source-item'
import { selectFeed } from '../actions/feed-actions'

class SourceList extends React.Component {

  idToSourceObject (sourceId) {
    return this.props.allSources.sources[sourceId]
  }

  createSourceListItems () {
    return this.props.sources.map(sourceId => {
      return <SourceItem key={sourceId} source={this.idToSourceObject(sourceId)} feed={this.props.feed}></SourceItem>
    })
  }

  sourceList () {
    if (this.props.sources.length === 0) {
      return (
        <div>
          <div>No sources to show!</div>
        </div>
      )
    } else {
      return (
        <div>
          <h5>Source List</h5>
          <ul>
            {this.createSourceListItems()}
          </ul>
        </div>
      )
    }
  }

  handleAddSource () {
    this.props.changeActiveView(VIEWS.CATEGORY)
    this.props.selectFeed(this.props.feed)
  }

  render () {
    return (
      <div style={{ borderStyle: 'solid', borderColor: 'gold' }}>
        {this.sourceList()}
        <input type="button"
               onClick={() => this.handleAddSource()}
               value="Add Source"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allSources: state.allSources,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ changeActiveView, selectFeed }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SourceList)