import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { PageHeader } from 'antd'

import { fetchSources } from '../actions/sources-actions'
import { fetchPatchSource } from '../actions/feed-actions'

import CategoryList from './category-list'
import Paragraph from 'antd/lib/typography/Paragraph';
import { Button } from 'antd';

class Source extends React.Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    this.props.handler(this.props.source)
  }

  render = () =>
    <PageHeader title={this.props.source.name}>
      <div className="wrap">
        <div className="content">
          <Paragraph>
            {this.props.source.description}
          </Paragraph>
        </div>
        <div className="extraContent">
          <p className="contentLink">
            <a href={this.props.source.url}>
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"
                alt="start"
              />
              Source Website
            </a>
          </p>
          <p>
            <Button
              onClick={this.handleClick}
              type={this.props.inFeed ? 'primary' : 'default'}
              shape="circle"
              icon="download"
              size="small"
              >
            </Button>
            {!this.props.inFeed ? 'Add' : 'Remove'}
          </p>
        </div>
      </div>
    </PageHeader>
}

class Sources extends React.Component {
  constructor(props) {
    super(props)
    this.sourceHandler = this.sourceHandler.bind(this)
  }

  componentDidUpdate(prevProps) {
    const { activeCategory } = this.props
    if (activeCategory && (!prevProps.activeCategory || activeCategory.id !== prevProps.activeCategory.id))
        this.props.fetchSources({ category: this.props.activeCategory.type })
  }

  sourceHandler(source) {
    let args = {
      userId: this.props.user.userId,
      feedId: this.props.activeFeed._id,
      sourceId: source.id,
    }
    args.action = this.props.activeFeed.sources.indexOf(source.id) === -1 ? 'add' : 'remove'
    this.props.fetchPatchSource(args)
  }

  render () {
    if (this.props.error) {
      return <div>Error: {this.props.error}</div>
    } else if (this.props.activeCategory == null) {
      return <CategoryList/>
    } else if (this.props.isFetching) {
      return <div>Loading...</div>
    } else {
      return (
        <div>
          <CategoryList />
          {
            this.props.activeSources.items && this.props.activeSources.items.map(source =>
              <Source key={source.id}
                inFeed={this.props.activeFeed.sources.indexOf(source.id) !== -1}
                handler={this.sourceHandler}
                source={source}>
              </Source>
          )}
        </div>
      )
    }
  }
}

const mapStateToSourcesProps = state => {
  return {
    activeCategory: state.activeCategory,
    activeFeed: state.activeFeed,
    activeSources: state.activeSources,
    user: state.authentication,
  }
}

const mapDispatchToSourcesProps = dispatch => bindActionCreators({
    fetchPatchSource,
    fetchSources,
  }, dispatch)

export default connect(mapStateToSourcesProps, mapDispatchToSourcesProps)(Sources)
