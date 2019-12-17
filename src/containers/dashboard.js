/*
 * Component to hold all major components in the dashboard
 */
import React from 'react'
import { connect } from 'react-redux'
import {
  Layout, Menu, Breadcrumb, Icon,
} from 'antd';

import Navbar from './navbar'
import AddFeed from './add-feed'
import FeedArticles from './feed-articles'
import Starred from './starred'
import Sources from './sources'
import FeedItem from './feed-item'
import { resetPage } from '../actions/page-actions'
import APIbar from './apibar'
import Error from './error'
import { fetchAllSources } from '../actions/sources-actions'
import { getArticles, getStarredArticles } from '../actions/articles-actions'
import { fetchUserFeeds, selectFeed, selectStarred, manageFeed, manageFeedSources, selectAPIs } from '../actions/feed-actions'
import { bindActionCreators } from 'redux'
import { VIEWS } from '../constants'

const { SubMenu } = Menu
const { Header, Content, Sider } = Layout


class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.createFeedItem = this.createFeedItem.bind(this)
    this.getContent = this.getContent.bind(this)
  }

  componentDidMount () {
    this.props.fetchAllSources()
    this.props.fetchUserFeeds(this.props.user.userId)
  }

  createFeedItem() {
    if (this.props.userFeeds && this.props.userFeeds.feeds) {
      return this.props.userFeeds.feeds.map(feed =>
        <SubMenu key={feed._id} title={
            <span>
              <Icon type="book" />
              {feed.name}
            </span>
          }>
          <Menu.Item
            onClick={() => {
              this.props.selectFeed(feed)
              this.props.resetPage()
              this.props.getArticles(feed.userId, feed)
              }
            }
            key={`show:${feed._id}`}>
            <Icon type="eye" />
            Show
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              this.props.manageFeedSources(feed)}
            key={`manageSources:${feed._id}`}>
            <Icon type="read" />
            Manage Feed Sources
          </Menu.Item>
          <Menu.Item
            onClick={() =>
              this.props.manageFeed(feed)}
            key={`manage:${feed._id}`}>
            <Icon type="setting" />
            Manage Feed
          </Menu.Item>
        </SubMenu>
      )
    }
  }

  getContent() {
    const { activeView } = this.props
    if (activeView === VIEWS.STARRED || activeView === VIEWS.FEED)
      return <FeedArticles/>
    if (activeView === VIEWS.MANAGE_FEED_SOURCES)
      return <Sources/>
    if (activeView === VIEWS.MANAGE_FEED)
      return <FeedItem/>
    if (activeView === VIEWS.API)
      return <APIbar />
  }

  // TODO: create a MainView component to follow the Sidebar to determine what is shown
  render () {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        <Navbar/>
        </Header>
        <Layout>
          <Sider width={300} className={'sidebar'}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['starred']}
              // defaultOpenKeys={['sub1']}
              className={'sidebar-menu'}
            >
              <Menu.Item key="addFeed">
                <AddFeed/>
              </Menu.Item>
              <Menu.Item key="starred" onClick={() => {
                  this.props.selectStarred()
                  this.props.resetPage()
                  this.props.getStarredArticles({ userId: this.props.user.userId, page: 1 })
                }
              }>
                <Starred/>
              </Menu.Item>
              <Menu.Item key="Other news" onClick={() => {
                  this.props.selectAPIs()
                  this.props.resetPage()
                }
              }>
                <span onClick={() => { this.props.selectAPIs(); this.props.resetPage() }}>
                  <Icon type="compass"/>Other News
                </span>
              </Menu.Item>
              {this.createFeedItem()}
            </Menu>
          </Sider>
          <Layout className={'main-view'}>
            <Breadcrumb className={'main-view-breadcrumb'}>
            </Breadcrumb>

            <Content className={'main-view-content'}>
              {this.props.error && <Error/>}
              {this.getContent()}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  user: state.authentication,
  error: state.error,
  userFeeds: state.userFeeds,
  activeView: state.activeView,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { fetchAllSources,
    fetchUserFeeds,
    selectFeed,
    selectStarred,
    manageFeed,
    manageFeedSources,
    getArticles,
    getStarredArticles,
    resetPage,
    selectAPIs,
  },

  dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
