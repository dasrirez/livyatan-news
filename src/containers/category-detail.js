/*
 * Component to display a single category tile for a user to select
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card } from 'antd';

import { selectCategory } from '../actions/categories-actions'

const { Meta } = Card;


class CategoryDetail extends React.Component {
  constructor(props) {
    super(props)
    this.isSelected = this.isSelected.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  isSelected() {
    return this.props.activeCategory &&
      this.props.category.id === this.props.activeCategory.id
  }

  handleClick() {
    if (!this.isSelected())
      this.props.selectCategory(this.props.category)
    else
      this.props.selectCategory(null)
  }

  render() {
    const name = this.props.category.type.charAt(0).toUpperCase() + this.props.category.type.slice(1)
    return <div onClick={this.handleClick}>
      <Card
      hoverable
      className={'category-item'}
      cover={<img alt={this.props.category.type} src={this.props.category.img}
      onClick={this.handleClick}
      />}
    >
      <Meta
        title={this.isSelected() ? <b>{name}</b> : null}
        description={this.isSelected() ? null : <b>{name}</b>}
        // description="www.instagram.com"
      />
    </Card>
    </div>
  }
}


const mapStateToProps = state => ({ activeCategory: state.activeCategory })
const mapDispatchToProps = dispatch => bindActionCreators({ selectCategory }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail)