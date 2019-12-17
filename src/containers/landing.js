import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Card, Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import GoogleLogin from 'react-google-login';

import cloudImg from '../../src/media/cloud-computing.svg'
import twitterImg from '../../src/media/twitter.svg'
import googleImg from '../../src/media/google.svg'
import reactImg from '../../src/media/logo.svg'

import 'antd/dist/antd.css'
import '../style/entry.css'
import '../style/dashboard.css'
import '../style/landing.css'

import Cookies from 'js-cookie'
import { userService } from '../service/user-service'
import { userActions } from '../actions/user-actions'

import { Typography, Menu, Icon } from 'antd'
const { Title } = Typography

class Landing extends React.Component {
  constructor(props){
    super(props)
    const loggedIn = Cookies.get('userId') ? true : false
    this.state = { ...this.state, featureDescription: '', loggedIn: loggedIn }
  }

  signout(){
    userService.signout();
    this.setState({
      ...this.state,
      loggedIn: false
    })
  }

  render(){
    const userIdMessage = this.state.loggedIn ? (
      <Link to='/dashboard'><Icon type="select" />Go to Dashboard</Link>
    ) : (
      ''
    )

    const accessButtons = this.state.loggedIn ? (
      <Link
        // type="submit"
        onClick={() => this.signout()}
      >Sign Out</Link>
    ) : (
      <div className={'nav-button-list'}>
        <Link to="/signup" className={'navbar-button'}>
          Sign Up
        </Link>
        <Link to="/signin" className={'navbar-button'}>
          Sign In
        </Link>
        <div>
          <GoogleLogin
            className={'google-button'}
            clientId="533049329825-n6357kvcn53u4e8i5ffk1ei7cjkcvt91.apps.googleusercontent.com"
            buttonText="Sign in with Google"
            onSuccess={this.props.oauth}
            onFailure={this.props.oauth}
            icon={false}>
            <div>
            <Icon type='google' />Sign in with Google
            </div>
          </GoogleLogin>
        </div>
        {/* <div id="g-signin2"></div> */}
      </div>
    )

    return (
      <div>
        <Menu
          selectable={false}
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['0']}
          className={'navbar'}>
          <Menu.Item>
            { userIdMessage }
          </Menu.Item>

          <Menu.Item>
            <div>
              { accessButtons }
            </div>
          </Menu.Item>
        </Menu>
        <div className={'feature-container'}>
          <div>
            <Title>Livyatan</Title>
            <p>Livyatan is a news aggregator built on top of News API that delivers breaking news from over 130 sources from around the world.
              Users are able to create custom feeds, favourite articles, share articles on social media,
              and curate their feeds based on sources and categories. Livyatan also offers trending tweets
              provided by Twitters Developer API, real-time CAD currency exchange rates, and up to date
              weather forecasts.
            </p>
          </div>
          <div>
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  className={'feature-card'}
                  title="React & Redux"
                  cover={<img className={'feature-image'} alt="React Logo" src={reactImg} height='200px' width='200px'/>}
                >
                  <p>Livyatan uses React with Redux to create a beautiful and seemless user interface.</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className={'feature-card'}
                  title="Google OAuth2"
                  cover={<img className={'feature-image'}alt="Google Logo" src={googleImg} height='200px' width='200px'/>}
                >
                  <p>Offering signin with Google's OAuth2 to allow users to sign in with their Google accounts.</p>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className={'feature-card'}
                  title="Cloud Server"
                  cover={<img className={'feature-image'} alt="Cloud Server" src={cloudImg} height='200px' width='200px'/>}
                >
                  <p>Livyatan is powered by a Virtual Private Server acquired from Digital Ocean.</p>
                  <p>The infrastructure consists of: </p>
                  <ul>
                    <li>
                      NGINX reverse proxy
                    </li>
                    <li>
                      NodeJS based backend
                    </li>
                    <li>
                      MongoDB Database hosted on MongoDB Atlas
                    </li>
                    <li>
                      Services containerized for easy instantiation with Docker
                    </li>
                  </ul>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  className={'feature-card'}
                  title="Multiple APIs"
                  cover={<img className={'feature-image'} alt="Twitter Logo" src={twitterImg} height='200px' width='200px'/>}
                >
                  <p>Integrated with: </p>
                  <ul>
                    <li>
                      <a href="https://newsapi.org/">News API</a>
                    </li>
                    <li>
                      <a href="https://developer.twitter.com/content/developer-twitter/en.html">Twitter API</a>
                    </li>
                    <li>
                      <a href="https://www.alphavantage.co/">AlphaVantage Forex API</a>
                    </li>
                    <li>
                      <a href="https://openweathermap.org/">OpenWeatherMap API</a>
                    </li>
                  </ul>
                  <p>to deliver all of the content that users need in one place.</p>
                </Card>
              </Col>
            </Row>
          </div>
          <div style={{ padding: '8px 0 0 0', textAlign: 'center' }}>
            <a href="/credits">Credits</a>
          </div>
        </div>
      </div>
    )
  }
}
/**
 <div>
 <Button onClick ={() => this.featureDescription(1)}>React & Redux</Button>
 <Button onClick ={() => this.featureDescription(2)}>Google OAuth2</Button>
 <Button onClick ={() => this.featureDescription(3)}>Cloud Server</Button>
 <Button onClick ={() => this.featureDescription(4)}>Multiple APIs</Button>
 {this.state.featureDescription}
 </div>
 */
const mapStateToProps = state => {
  const { users, authentication } = state
  const { userId } = authentication
  return {
    userId,
    users
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  oauth: userActions.oauth,
}, dispatch)

const connectedLanding = connect(mapStateToProps, mapDispatchToProps)(Landing)
export { connectedLanding as Landing }