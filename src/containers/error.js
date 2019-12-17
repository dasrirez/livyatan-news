import React from 'react'
import { clearError } from '../actions/error-actions'
import { connect } from 'react-redux'
import { Alert } from 'antd'
import { bindActionCreators } from 'redux';

class Error extends React.Component {

  render () {
    return (
      <Alert
        closable
        onClose={() => this.props.clearError()}
        message={this.props.error}
        type="error"
        showIcon
      />
    )
  }
}


const mapStateToProps = state => ({
  error: state.error,
  activeView: state.activeView,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  clearError,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Error)
