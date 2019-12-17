import React from 'react'
import { connect } from 'react-redux'

import { userActions } from '../actions/user-actions'
import { Button, Form, Icon, Input, PageHeader } from 'antd'
import { history } from '../helpers'
import { bindActionCreators } from 'redux'
import Error from './error'
import { clearError } from '../actions/error-actions'

class Signin extends React.Component {
  componentDidMount () {
    this.props.signout()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signin(values.userId, values.password)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <PageHeader
          onBack={() => {
            this.props.clearError()
            history.push('/')
          }}
          title="Sign In"/>
        <Form onSubmit={this.handleSubmit} className={'entry-form'}>
          <div className={'entry-title'}>Sign In</div>
          <Form.Item>
            {getFieldDecorator('userId', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" className={'entry-form-icon'}/>} placeholder="Username"/>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your password!' }],
            })(
              <Input prefix={<Icon type="lock" className={'entry-form-icon'}/>} type="password" placeholder="Password"/>
            )}
          </Form.Item>
          {this.props.error && <Error/>}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    error: state.error
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  signin: userActions.signin,
  signout: userActions.signout,
  clearError
}, dispatch)

const connectedSigninPage = connect(mapStateToProps, mapDispatchToProps)(Signin)
const antdSignin = Form.create()(connectedSigninPage)

export { antdSignin as Signin }