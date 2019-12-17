# Livyatan

## Description
Livyatan is a news aggregator built on top of News API which delivers news from over 130 sources from around the world.
Users are able to create custom feeds, favorite articles, share articles on social media,
and curate their feeds based on sources and categories. Livyatan also offers trending tweets
provided by Twitters Developer API, real-time CAD currency exchange rates, and up to date
weather forecasts.

[Video Demo](https://www.youtube.com/watch?v=EU_osF_mL64)

[API Documentation](doc/README.md)

## Technologies Used
* Frontend: React, Redux
* Backend: NodeJS, Express, NGINX, Docker
* Database: MongoDB
* OAuth authentication

## Running instructions:
To run the project locally

```
# export env variables
export LIVYATAN_SECRET=<express-session secret>
export LIVYATAN_NEWSAPI_KEY=<api key>
export LIVYATAN_MONGO_URL=<Mongo URL>
export LIVYATAN_ALPHAVANTAGE_KEY=<api key>
export LIVYATAN_OPENWEATHER_KEY=<api key>
export LIVYATAN_TWITTER_CONSUMER_KEY=<api key>
export LIVYATAN_TWITTER_CONSUMER_SECRET=<api secret>
export LIVYATAN_TWITTER_ACCESS_TOKEN_KEY=<token key>
export LIVYATAN_TWITTER_ACCESS_TOKEN_SECRET=<token secret>

# install packages
npm i
# run frontend server
npm start
# run backend server
node src/server.js
```

Note: Docker files are used to run the web app with a configured NGINX server, not locally.

_Credits: Daniel Hugh, Darius Asri Rezaei, James Nicol_
