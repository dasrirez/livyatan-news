import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Icon, Typography } from 'antd'

import { DOMAIN } from '../constants'

const { Paragraph, Title } = Typography

class Tweets extends Component {

  constructor(props) {
    super(props)
    this.getTweets = this.getTweets.bind(this)
    this.state = { ...this.state }
  }

  componentDidMount() {
    this.getTweets()
  }

  getTweets = () => {
    fetch(`${DOMAIN}/api/tweets/`)
    .then(
      response => {
        if (response.ok)
          return response.json()
        throw Error(response.statusText)
      },
      error => console.log('An error occurred.', error),
    )
    .then((result) => {
      const tweets = result.slice(0, 20)
      this.setState({
        ...this.state,
        tweets: tweets
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    const content = this.state.tweets ?
    (
      this.state.tweets.map(tweet => {
        return (
        <li key={tweet._id} >
          <Icon type="twitter" />
          <a href={tweet.url}> {tweet.name}</a>
        </li>
        )
      })
    )
    :
    ('Loading Tweets...')
    return (
      <Typography>
        <Paragraph>
          <div>
            <Title>Trends in Canada</Title>
            <ul>
              {content}
            </ul>
          </div>
        </Paragraph>
      </Typography>
    )
  }
}

export default connect()(Tweets)