import React from 'react'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import { Button } from 'antd'

class Credits extends React.Component {

	render(){
		return (
			<div className={'credits-container'}>
				<h1>Credits</h1>
				<div>
					<h2>Photos</h2>
					<p>Photos for the categories</p>
					<ul>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by rawpixel.com - www.freepik.com</a>
						</li>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/sport">Sport photo created by freepik - www.freepik.com</a>
						</li>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by mindandi - www.freepik.com</a>
						</li>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/background">Background photo created by freepik - www.freepik.com</a>
						</li>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/business">Business photo created by rawpixel.com - www.freepik.com</a>
						</li>
						<li>
							<a href="https://www.freepik.com/free-photos-vectors/technology">Technology photo created by jannoon028 - www.freepik.com</a>
						</li>
						<li>
							<a href="http://www.freepik.com/free-photos-vectors/cpu">CPU photo created by chevanon - www.freepik.com</a>
						</li>
					</ul>
					<p>Photos for landing page</p>
					<ul>
						<li>
							React Logo Provided from React starter code
						</li>
						<li>
							<a href="https://www.kisspng.com/png-google-logo-g-suite-google-656820/download-png.html">Google Logo</a>
						</li>
						<li>
							<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>
						</li>
						<li>
							<div>Icons made by <a href="https://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" 			    title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" 			    title="Creative Commons BY 3.0" >CC 3.0 BY</a></div>
						</li>
					</ul>
					<p>All other photos are provided from websites that news is pulled from</p>
				</div>
				<div>
					<h2>Code</h2>
					<ul>
						<li>
							<a href="http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example">React + Redux Login Tutorial</a>
						</li>
						<li>
							<a href="https://alligator.io/react/react-infinite-scroll/">Infinite Scroll React Tutorial</a>
						</li>
						<li>
							<a href="https://developers.facebook.com/docs/plugins/share-button/">Facebook Share Button</a>
						</li>
						<li>
							<a href="https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place">Twitter API Call</a>
						</li>
						<li>
							<a href="https://openweathermap.org/current">OpenWeatherMap API Doc</a>
						</li>
						<li>
							<a href="https://www.alphavantage.co/documentation/">AlphaVantage API Doc</a>
						</li>
						<li>
							Modified code samples from <a href="https://ant.design/docs/react/introduce">Ant Design Library</a>
						</li>
					</ul>
				</div>
				<div>
					<h2>APIs</h2>
					<ul>
						<li>
							<a href="https://newsapi.org">Powered by News API</a>
						</li>
						<li>
							<a href="https://developer.twitter.com/en.html">Powered by Twitter</a>
						</li>
						<li>
							<a href="https://www.alphavantage.co/">Powered by AlphaVantage</a>
						</li>
						<li>
							<a href="https://openweathermap.org/api">Powered by OpenWeatherMap</a>
						</li>
					</ul>
				</div>
				<Button href="/" type="submit">Back</Button>
			</div>
		)
	}
}

export default connect()(Credits)