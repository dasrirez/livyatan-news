/*
 * Component to hold a series of category sub-components
 */
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { PageHeader } from 'antd'

import { selectCategory } from '../actions/categories-actions'
import CategoryDetail from './category-detail';

class CategoryList extends React.Component {
  generateCategories(categories) {
    return categories.map((category) => {
      return(
        <CategoryDetail key={category.id} category={category}/>
      )
    })
  }
  render () {
    let { categories } = this.props
    return (
      <div className={'category-view'}>
        <PageHeader
          // onBack={() => null}
          title="Manage Sources"
          subTitle="Please select a category"
        />
        <div className={'category-item-container'}>
          {this.generateCategories(categories)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({ selectCategory }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
