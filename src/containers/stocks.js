import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Typography } from 'antd'

import { DOMAIN } from '../constants'

const { Paragraph, Title } = Typography

class Stocks extends Component {

  constructor(props) {
    super(props)
    this.getStocks = this.getStocks.bind(this)
    this.state = { ...this.state, stocks: [] }
  }

  componentDidMount() {
    this.getStocks()
  }

  getStocks = () => {
    fetch(`${DOMAIN}/api/stocks/`)
    .then(
      response => {
        if (response.ok)
          return response.json()
        throw Error(response.statusText)
      },
      error => console.log('An error occurred.', error),
    )
    .then((result) => {
      this.setState({
        ...this.state,
        stocks: result
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    const content = this.state.stocks ?
    (
        this.state.stocks.map(stock => {
          return (
            <p key={stock._id}>
            {stock.fromCurrency} To {stock.toCurrency} : {stock.exchangeRate}
            </p>
          )
        })
    )
    :
    ('Loading Stocks...')
    return (
      <Typography>
        <Paragraph>
          <div>
            <Title>Exchange Rates</Title>
            {content}
          </div>
        </Paragraph>
      </Typography>
    )
  }
}

export default connect()(Stocks)