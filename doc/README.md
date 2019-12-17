# Livyatan REST API Documentation

## Livyatan API

### Sign Up

- description: create a new user
- request: `POST /api/signup/`
    - content-type: `application/json`
    - body: object
        - username: (string) new user username
        - password: (string) password
- response: 200
    - content-type: `application/json`
    - body: user signed up
- response: 409
    - body: user already exists
- response: 500
    - body: database error


```
curl -X POST\
    -H "Content-Type: application/json"\
    -c cookie.txt\
    -d '{"userId":"alice","password":"alice"}'\
    http://localhost:3001/api/signup/
```

### Sign In

- description: signin
- request: `POST /api/signin/`
    - content-type: `application/json`
    - body: object
        - username: (string) new user username
        - password: (string) password
- response: 200
    - content-type: `application/json`
    - body: user signed in
- response: 500
    - body: internal server error
- response: 401
    - body: access denied


```
curl -X POST\
    -H "Content-Type: application/json"\
    -c cookie.txt\
    -d '{"userId":"alice","password":"alice"}'\
    http://localhost:3001/api/signin/
```

### Sign In with Google

- description: signin
- request: `POST /api/oauth/`
    - content-type: `application/json`
    - body: object
        - token: (string) token for signin
- response: 200
    - content-type: `application/json`
    - body: userId
- response: 500
    - body: internal server error
- response: 401
    - body: access denied


```
curl -X POST\
    -H "Content-Type: application/json"\
    -c cookie.txt\
    -d { token }\
    http://localhost:3001/api/oauth/
```



### Sign Out

- description: signout
- request: `GET /api/signout/`
- response: 200
    - content-type: `cookie`
    - body: signed out

```
curl -X GET\
    -b cookie.txt\
    http://localhost:3001/api/signout/
```

### Add Star

- description: Add an article to favourites list
- request: `POST /api/users/:userId/stars/`
- response: 200
    - content-type: `application/json`
    - body: inserted article_id into the database
- response: 401
    - body: access denied
- response: 403
    - body: forbidden
- response: 409
    - body: article is already starred

```
curl -X POST\
    -H "Content-Type: application/json"\
    -b cookie.txt\
    -d '{"article": {"source": {"id": "techcrunch", "name": "TechCrunch"}, "author": "Romain Dillet"}}'\
    localhost:3001/api/users/alice/stars/
```

### Delete Star

- description: Delete an article from favourites list
- request: `DELETE /api/users/:userId/stars/:articleId/`
- response: 200
    - content-type: `application/json`
    - body: deleted article_id
- response: 401
    - body: access denied
- response: 403
    - body: forbidden
- response: 404
    - body: did not find `articleId` in the database

```
curl -X DELETE\
    -b cookie.txt\
    http://localhost:3001/api/users/testJamie2/stars/5c8b309058ad096300632f67/
```

### Get Stars

- description: Get all articles from favourites list
- request: `GET /api/users/:userId/stars/`
- response: 200
    - content-type: `application/json`
    - body: list of articles
- response: 401
    - body: access denied
- response: 403
    - body: forbidden

```
curl -X GET\
    -H 'Content-Type: application/json'\
    -b cookie.txt\
    http://localhost:3001/api/users/alice/stars/
```

### Get Sources
- description: Get a list of news outlet sources based on query
- request: `GET /api/sources/[?category=<category>][&language=<language>][&country=<country>]`
    - query:
        - category: (string) the category to filter sources by, e.g. 'general'
        - language: (string) the language to filter sources by, e.g. 'en'
        - country: (string) the country to filter sources by, e.g. 'us'
- response: 200
    - content-type: `application/json`
    - body: list of objects
        - id: (string) the id of the source
        - name: (string) the source's name
        - description: (string) the source's description
        - url: (string): the source's url
        - category (string): the category of the source
        - language (string): two character representation, e.g. 'en'
        - country (string): two character representation, e.g. 'us'
- response: 401
    - body (string): access denied
- response: 500
    - body: (string)
        - failed to get sources, `reason`

```
curl -X GET\
    -H 'Content-Type: application/json'\
    -b cookie.txt\
    'http://localhost:3001/api/sources/?category=general&language=en&country=ca'
```

### Create Feed
- description: Create a new empty feed for the user
- request: `POST /api/users/:userId/feeds/`
    - content-type: `application/json`
    - body: object
        - name: (string) the name of this feed
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the id of this feed
        - userId: (string) the user this feed belongs to
        - name: (string) the updated name of this feed
        - sources: (list of strings) the sources in this feed
            - _id: (string) the id of the source
- response: 401
    - body: (string) access denied
- response: 403
    - body: (string) forbidden
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    -body (string): database error
```
curl -X POST\
    -H 'Content-Type: application/json'\
    -b cookie.txt\
    -d '{ "userId": "alice", "name": "alices\'s feed" }'\
    http://localhost:3001/api/users/alice/feeds/
```

### Get Feeds
- description: Get a list feeds belonging to a user
- request: `GET /api/users/:userId/feeds/`
- response: 200
    - content-type: `application/json`
    - body: (list of objects) the source ids of the feed
        - _id: (string) the id of this feed
        - userId: (string) the user this feed belongs to
        - name: (string) the updated name of this feed
        - sources: (list of strings) the sources in this feed
            - _id: (string) the id of the source
- response: 401
    - body (string): access denied
- response: 403
    - body (string): forbidden
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    - body (string): database error

```
curl -X GET\
    -H 'Content-Type: application/json'\
    -b cookie.txt\
    http://localhost:3001/api/users/alice/feeds/
```

### Get Feed Articles
- description: Get a list articles according to a user's feed sources
- request: `GET /api/users/:userId/feeds/:feedId/articles/[?sortBy=(relevancy|popularity|publishedAt)&q=<string>]`
    - query:
        - sortBy
            - relevancy: best match for q first
            - popularity: most popular news first
            - publishedAt: most recent news first
        - q (URL-encoded)
            - exact match surrounded with ""
            - must match keywords prepended with +
            - must not match keywords prepended with -
            - Use of AND / OR / NOT operators for further filtering
- response: 200
    - content-type: `application/json`
    - body: (object)
        - status: (string) the status of the api call
        - totalResults: (string) the total number of articles existing for this feed
        - articles: (list of object)
            - source: (object)
                - id: (string) id of the source
                - name: (string) name of the source
            - author: (string) article author
            - title: (string) article title
            - description: (string) short excerpt of the article
            - url: (url) link to the article
            - urlToImage: (url) link to the article image
            - publichsedAt: (date) publish date
            - content: (string) the first few paragraphs of the article
- response: 401
    - body (string): access denied
- response: 403
    - body (string): forbidden
- response: 404
    - body (string): feed `feed` not found
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    -body (string):
        - database error
        - failed to get articles, `reason`

```
curl -X GET\
    -H 'Content-Type: application/json'\
    -b cookie.txt\
    'http://localhost:3001/api/users/alice/feeds/5c8c6a54f2fe0b6d73af1d30/articles/?sortBy=relevance&q=crypto'
```

### Rename Feed
- description: Rename a user's feed
- request: `PATCH /api/users/:userId/feeds/:feedId/`
    - content-type: `application/json`
    - body: object
        - source: (string) the name of the source
- response: 200
    - body: object
        - _id: (string) the id of this feed
        - userId: (string) the user this feed belongs to
        - name: (string) the updated name of this feed
        - sources: (list of strings) the sources in this feed
            - _id: (string) the id of the source
- response: 400
    - body: invalid argument
- response: 401
    - body: access denied
- response: 403
    - body: forbidden
- response: 404
    - body: feed `:feedId` does not exist
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    - body: database error

```
curl -X PATCH\
    -H "Content-Type: application/json" -d '{"name": "newfeedname"}'\
    -b cookie.txt \
    http://localhost:3001/api/users/alice/feeds/5c8b32580de0b863f2c73f27/

```

### Delete Feed
- description: Delete a user's feed
- request: `DELETE /api/users/:userId/feeds/:feedId/`
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the id of this feed
        - userId: (string) the user this feed belongs to
        - name: (string) the name of this feed
        - sources: (list of strings) the sources in this feed
            - _id: (string) the id of the source
- response: 401
    - body: access denied
- response: 403
    - body: forbidden
- response: 404
    - body: feed `:feedId` does not exist
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    - body: database error

```
curl -X DELETE\
    -b cookie.txt\
    http://localhost:3001/api/users/alice/feeds/5c8b32580de0b863f2c73f27/
```

### Update Sources
- description: update the sources of a user's feed
- request: `PATCH /api/users/:userId/feeds/:feedId/sources/`
    - content-type: `application/json`
    - body: object
        - action: (string) either `add` or `remove`
        - sourceId: (string) the target source
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the id of this feed
        - userId: (string) the user this feed belongs to
        - name: (string) the name of this feed
        - sources: (list of strings) the update sources in this feed
            - _id: (string) the id of the source
- response: 400
    - body: invalid argument
- response: 401
    - body: access denied
- response: 403
    - body: forbidden
- response: 404
    - body: feed `:feedId` does not exist
- response: 422
    - body: (object)
        - errors (list of objects)
            - location: (string) location of invalid input
            - param: (string) name of invalid parameter
            - value: (string) value of invalid parameter
            - msg: (string) description of what is invalid
- response: 500
    - body: database error

```
curl -X PATCH\
    -H "Content-Type: application/json"\
    -b cookie.txt\
    -d '{"action": "add", "sourceId": "the-new-york-times"}'\
    http://localhost:3001/api/users/alice/feeds/5c8b325d0de0b863f2c73f28/sources/
```

### Get Tweets
- description: Get current trending tweets in Canada
- request: `GET /api/tweets/`
- response: 200
    - content-type: `application/json`
    - body: object
        - _id: (string) the mongoDB id of this tweet
        - name (string): the trending topic
        - url (string): link to trend on twitter
        - promoted_content (string): whether this trend is promoted or not
        - query (string): search query on twitter
        - tweet_volume (int): the number of tweets related to this trend
- response: 500
    - body: database error

```
curl -X GET http://localhost:3001/api/tweets/
```

### Get Weather
- description: Get current weather in Toronto
- request: `GET /api/weather/`
- response: 200
    - content-type: `application\json`
    - body: object
        - _id: (string) the mongoDB id of this weather object
        - coord: (object)
            - lon: (double) longitude
            - lat: (double) latitude
        - weather: (object)
            - id: (int) weather id
            - main: (string) type of weather, i.e. "Clear", "Rainy"
            - description: (string) description of weather
            - icon: (string) weather icon
        - base: (string) source of weather
        - main: (object)
            - temp: (double) temperature
            - pressure: (int) pressure
            - humidity: (int) humidity
            - temp_mix: (double) min temperature
            - temp_max: (double) max temperature
        - visibility: (int) visibility
        - wind: (object)
            - speed: (double) wind speed
            - deg: (int) direction
        - clouds: (object)
            - all: (int) number of clouds
        - dt: (float) time of data collection, UNIX, utc
        - sys: (object)
            - country: (string) country code
            - sunrise: (float) time of sunrise, UNIX, utc
            - sunset: (float) time of sunset, UNIX, utc
        - id: (float) city ID
        - name: (string) city name
- response: 500
    - body: database error

```
curl -X GET http://localhost:3001/api/tweets/
```

### Get Foreign Exchange Rate
- description: Get current exchange rates for CAD
- request: `GET /api/stocks/`
- response: 200
    - content-type: `application\json`
    - body: List (object)
        - _id: (string) the mongoDB internal id of the rate
        - toCurreny: (string) the currency we are converting CAD to
        - exchangeRate: (float) exchange rate of fromCurrency to toCurrency
        - fromCurreny: (string) the currency we are converting from (CAD)
- response: 500
    - body: database error

```
curl -X GET http://localhost:3001/api/tweets/
```