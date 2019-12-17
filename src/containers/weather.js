import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Typography } from 'antd'

import { DOMAIN } from '../constants'

const { Paragraph, Title } = Typography

class Weather extends Component {

  constructor(props) {
    super(props)
    this.getWeather = this.getWeather.bind(this)
    this.state = { ...this.state }
  }

  componentDidMount() {
    this.getWeather()
  }

  getWeather = () => {
    fetch(`${DOMAIN}/api/weather/`)
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
        weather: result[0]
      })
    })
    .catch(err => console.log(err))
  }

  render() {
    const content = this.state.weather ?
    (
        <div key={this.state.weather._id}>
          <p>Current Temp: {this.state.weather.main.temp} Celsius</p>
          <p>Min Temp: {this.state.weather.main.temp_min} Celsius</p>
          <p>Max Temp: {this.state.weather.main.temp_max} Celsius</p>
          <p>Humidity: {this.state.weather.main.humidity}</p>
          <p>Pressure: {this.state.weather.main.pressure}</p>
          <p>Wind Speed: {this.state.weather.wind.speed} km/h</p>
        </div>
    )
    :
    ('Loading Weather...')

    return (
      <Typography>
        <Paragraph>
          <div>
            <Title>Weather in Toronto</Title>
            {content}
          </div>
        </Paragraph>
      </Typography>
    )
  }
}

export default connect()(Weather)