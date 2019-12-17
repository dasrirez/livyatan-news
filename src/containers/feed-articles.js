/*
 *
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Spin, Empty } from 'antd'

import { getArticles, getStarredArticles } from '../actions/articles-actions'
import { VIEWS } from '../constants/'

import { incrementPage } from '../actions/page-actions'

import { getStarred } from '../actions/starred-actions'
import Article from './article'

class FeedArticles extends React.Component {
  constructor(props) {
    super(props)
    this.state = { ...this.state }
    window.onscroll = () => {
      if ((window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight)
        && !this.state.isLoading){
        if (this.props.page < 10){
          this.props.incrementPage(this.props.page)
          this.loadArticles()
        }
      }
    };
  }

  componentWillMount() {
    this.props.getStarred({ userId: this.props.user.userId })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }



  loadArticles(){
    //console.log('time to load some more');
    // if this is a feed and not starred articles, grab more from feed
    if (this.props.activeView === VIEWS.FEED) {
      this.props.getArticles(this.props.user.userId, this.props.activeFeed, this.props.page, this.props.articles)
    }
    else if (this.props.activeView === VIEWS.STARRED) {
      this.props.getStarredArticles(({ userId: this.props.user.userId, page: this.props.page, articles: this.props.articles }))
    }
  }

  isStarred(article){
    let { starred } = this.props
    let startObj = starred.find(item => item.article.url === article.url)
    return startObj
  }

  render() {
    let footerMessage = ''
    if (!this.props.starred || !this.props.articles || this.props.articles.length ===0) {
      if (this.props.loadingArticles)
        return <Spin/>
      return <Empty/>
    }
    if (this.props.page === 10 && this.props.articles.length > 0){
      footerMessage = "You're all caught up! :D"
    }
    else if (this.props.loadingArticles) {
      footerMessage = <Spin/>
    }
    return (
      <div className="articleList">
        {this.props.articles.map(article =>
            <Article
            key={article.url}
            isStarred={this.isStarred(article) != null}
            starId={this.isStarred(article) != null ? this.isStarred(article)._id : null}
            article={article}/>
        )}
        {footerMessage}
      </div>
    )
  }

}

const mapStateToProps = state => ({
  articles: state.articles,
  loadingArticles: state.loadingArticles,
  starred: state.starred,
  user: state.authentication,
  activeFeed: state.activeFeed,
  activeView: state.activeView,
  page: state.page
})

const mapDispatchToProps = dispatch => bindActionCreators({ getStarred, getArticles, incrementPage, getStarredArticles }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(FeedArticles)