import React from 'react'
import { connect } from 'react-redux'

import { Menu, Button } from 'antd'

import { userService } from '../service/user-service'

class Navbar extends React.Component {

	signout(){
		userService.signout();
	}


  render () {
    return (
      <Menu
        selectable={false}
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['0']}
        className={'navbar'}>
        <Menu.Item>
          <div className={'navbar-welcome'}>Welcome {this.props.user.userId}</div>
        </Menu.Item>
      <Menu.Item>
        <div>
          <Button
            type="primary"
            onClick={() => this.signout()}
            href="/">
            Signout
          </Button>
        </div>
      </Menu.Item>
      </Menu>
    )
  }
}

const mapStateToProps = state => ({ user: state.authentication })

export default connect(mapStateToProps)(Navbar)