import React from 'react'
import { connect } from 'react-redux'

import { Typography, Divider, Icon, Card } from 'antd'
import { bindActionCreators } from 'redux'

import { postStarred, deleteStarred } from '../actions/starred-actions'
import generalImg from '../../src/media/general.jpg'

const { Title, Paragraph } = Typography
const { Meta } = Card

class Article extends React.Component {
  constructor(props) {
    super(props)
		this.state = {
			expanded: false,
		}
    this.articleHandler = this.articleHandler.bind(this)
  }

  articleHandler(article) {
    let { userId, } = this.props.user
    let viewingStarred = !this.props.activeFeed
    let args = {
      userId,
      refetch: viewingStarred
    }
    if (!this.props.isStarred) {
      this.props.postStarred({
        ...args,
        article,
      })
    } else {
      this.props.deleteStarred({
        ...args,
        starId: this.props.starId,
      })
    }
  }

  render() {
    const fb = "https://www.facebook.com/sharer/sharer.php?u=" + this.props.article.url + "&amp;src=sdkpreparse"
    // const content = this.state.expanded ? <div>BLAH</div> : <>
    const content = <>
      <div onClick={() => this.articleHandler(this.props.article)}>
        <Icon type="star" theme={this.props.isStarred ? 'filled' : 'outlined'}/> {this.props.isStarred ? 'Unstar' : 'Star'}
      </div>
      <Typography>
        <Paragraph>
        <Title>{this.props.article.title}</Title>
        <Card
          className={'article-image'}
          cover={<img alt="example" src={this.props.article.urlToImage != null ? this.props.article.urlToImage : generalImg} />}
        >
          <Meta
            // title={this.props.article.title}
            description={`Source: ${this.props.article.source.name}`}
          />
        </Card>
        </Paragraph>
        <Paragraph>
          {this.props.article.description}
        </Paragraph>
        <Paragraph>
        </Paragraph>
        <ul>
          <li>
            <Icon type="link"/><a href={this.props.article.url}>Link to Article</a>
          </li>
          <li>
            <div
            className="fb-share-button"
            data-href={this.props.article.url}
            data-layout="button"
            data-size="small">
              <Icon type="facebook"/>
              <a
              target="_blank"
              rel="noopener noreferrer"
              href= {fb}>
              Share</a>
            </div>
          </li>
        </ul>
        <Divider />
      </Typography>
      </>
		return (
      <div>
        {content}
      </div>
		)
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  user: state.authentication,
  activeFeed: state.activeFeed,
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  postStarred,
  deleteStarred,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Article)