const { check, validationResult } = require('express-validator/check');
const { OAuth2Client } = require('google-auth-library');
const { ObjectId, MongoClient } = require('mongodb');
const { sanitize } = require('express-validator/filter');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const cors = require('cors');
const crypto = require('crypto');
const express = require('express');
const helmet = require('helmet')
const http = require('http');
const NewsAPI = require('newsapi');
const session = require('express-session');

const Twitter = require('twitter');
const weather = require('openweather-apis');
const alpha = require('alphavantage')({ key: process.env.LIVYATAN_ALPHAVANTAGE_KEY });

let db;
const connectionString = process.env.LIVYATAN_MONGO_URL;

const newsapi = new NewsAPI(process.env.LIVYATAN_NEWSAPI_KEY);

const app = express();

if (process.env.NODE_ENV !== 'production') {
  //app.use(cors({ origin: 'http://localhost:3000' }));
  app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
}

app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const CLIENT_ID='533049329825-n6357kvcn53u4e8i5ffk1ei7cjkcvt91.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

// TODO hide and change secret
const PORT = 3001;
app.use(session({
  secret: process.env.LIVYATAN_SECRET,
  resave: false,
  saveUninitialized: true,
}));

/* helpers */
function generateSalt() {
  return crypto.randomBytes(16).toString('base64');
}

function generateHash(password, salt) {
  const hash = crypto.createHmac('sha512', salt);
  hash.update(password);
  return hash.digest('base64');
}

function isAuthenticated(req, res, next) {
  if (!req.userId) return res.status(401).end('access denied');
  return next();
}

function isAuthorized(req, res, next) {
  if (req.userId !== req.params.userId) return res.status(403).end('forbidden');
  return next();
}

function runValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
  return next();
}

// TODO: design feed template and assign it to the user
function createDefaultFeeds(userId) {
  return userId;
}

// this function is run every day and adds new sources to sources db if they exist
function updateSources() {
  newsapi.v2.sources().then((response) => {
    response.sources.forEach((source) => {
      db.collection('Sources').updateOne({ id: source.id }, {
        $set: {
          name: source.name,
          description: source.description,
          url: source.url,
          category: source.category,
          language: source.language,
          country: source.country,
        },
      },
      {
        upsert: true,
      }).catch((reason) => {
        console.log(`failed to update sources in DB (${reason})`);
      });
    });
  }).catch((reason) => {
    console.log(`failed to get sources (${reason})`);
  });
}

setInterval(updateSources, 86400000);

app.use((req, res, next) => {
  req.userId = ('userId' in req.session) ? req.session.userId : null;
  res.setHeader('Set-Cookie', cookie.serialize('userId', req.userId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  }));
  next();
});

MongoClient.connect(connectionString, { useNewUrlParser: true })
  .then((client) => {
    db = client.db('Livyatan');
    http.createServer(app).listen(PORT, (err) => {
      if (err) console.log(err);
      else console.log('HTTP server on http://localhost:%s', PORT);
    });
  });


app.use((req, res, next) => {
  console.log('HTTP request', req.method, req.url, req.body);
  next();
});

app.post('/api/signup/',
  check('userId').exists(),
  check('password').exists(),
  sanitize('userId'),
  runValidation,
  (req, res) => {
  const { userId } = req.body;
  const { password } = req.body;
  let salt;
  let hash;
  db.collection('Users').findOne({ _id: userId })
    .then((user) => {
      if (user) return res.status(409).end(`userId ${userId} already exists`);
      salt = generateSalt();
      hash = generateHash(password, salt);
      const newUser = { _id: userId, hash, salt };
      db.collection('Users').insertOne(newUser);
      req.session.userId = userId;
      res.setHeader('Set-Cookie', cookie.serialize('userId', userId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      }));
      createDefaultFeeds(userId);
      return res.json(`user ${userId} signed up`);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).end('database error');
    });
});

// TODO Add to docs
app.post('/api/oauth/',
  check('token').exists(),
  runValidation,
  (req, res) => {
    const { token } = req.body
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const userId = payload.email.split('@').shift();
      db.collection('Users').updateOne(
        { _id: userId },
        { $set: { _id: userId } },
        { upsert: true },
        (err) => {
          if (err) return res.status(500).end(err);
          req.session.userId = userId;
          res.setHeader('Set-Cookie', cookie.serialize('userId', userId, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7,
          }));
          return res.json({ userId });
        });
    }
    verify().catch(() => res.status(401).end('access denied'));
});

app.post('/api/signin/',
  check('userId').exists(),
  check('password').exists(),
  sanitize('userId'),
  runValidation,
  (req, res) => {
  const { userId } = req.body;
  const { password } = req.body;
  db.collection('Users').findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).end(err);
    if (user == null) return res.status(401).end('access denied');
    if (!user.hash || user.hash !== generateHash(password, user.salt)) return res.status(401).end('access denied');
    req.session.userId = userId;
    res.setHeader('Set-Cookie', cookie.serialize('userId', userId, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    }));
    return res.json(`user ${userId} signed in`);
  });
});

app.get('/api/signout/', (req, res) => {
  req.session.destroy();
  res.setHeader('Set-Cookie', cookie.serialize('userId', '', {
    path: '/',
    maxAge: 0,
  }));
  return res.json('signed out');
});

app.post('/api/users/:userId/stars/', isAuthenticated, isAuthorized, (req, res, next) => {
  const { userId } = req.params;
  const newStar = { userId, article: req.body.article };
  db.collection('Stars').findOne(newStar, (err, response) => {
    if (response === null) {
      db.collection('Stars').insertOne(newStar, (err2, response2) => {
        if (err2) throw err;
        const result = response2.ops.shift();
        res.json({ result });
        next();
      });
    } else {
      res.status(409).end(`article ${newStar.article.title} is already starred`);
    }
  });
});

app.get('/api/users/:userId/stars/', isAuthenticated, isAuthorized, (req, res, next) => {
  const { userId } = req.params;
  const query = { userId };
  if (req.query.page > 0){
    const pageSize = 10;
    const skipAmount = (req.query.page - 1) * pageSize;
    db.collection('Stars').find(query).skip(skipAmount).limit(pageSize).toArray((err, articles) => {
      if (err) throw err;
      res.json(articles);
      next();
    });
  }
  else{
    db.collection('Stars').find(query).toArray((err, articles) => {
      if (err) throw err;
      res.json(articles);
      next();
    });
  }
});

app.delete('/api/users/:userId/stars/:articleId/',
  isAuthenticated,
  isAuthorized,
  check('articleId').isMongoId(),
  runValidation,
  (req, res, next) => {
    const { userId } = req.params;
    const { articleId } = req.params;
    const query = { userId, _id: ObjectId(articleId) };
    db.collection('Stars').deleteOne(query, (err, obj) => {
      if (err) throw err;
      if (obj.deletedCount > 0) {
        res.json({ articleId });
        next();
      } else {
        res.status(404).end(`did not find ${articleId} in the database`);
      }
    });
  });

app.get('/api/users/:userId/feeds/:feedId/articles/',
  isAuthenticated,
  isAuthorized,
  check('feedId').isMongoId(),
  runValidation,
  (req, res, next) => {
    db.collection('Feeds').findOne({ _id: ObjectId(req.params.feedId) }, (err, feed) => {
      if (err) {
        res.status(500).end('database error');
      } else if (feed == null) {
        res.status(404).end(`feed ${req.params.feedId} not found`);
      } else {
        let endpoint;
        if (req.query.sortBy === 'top') endpoint = 'topHeadlines';
        else endpoint = 'everything';
        newsapi.v2[endpoint]({
          q: (feed.sources.length === 0 ? 'NOT' : req.query.q),
          sortBy: req.query.sortBy,
          sources: feed.sources.join(','),
          pageSize: 10,
          page: req.query.page
        }).then((response) => {
          res.send(response);
          next();
        }).catch((reason) => {
          res.status(500).end(`failed to get sources (${reason})`);
        });
      }
    });
  });

app.get(('/api/users/:userId/feeds/'),
  isAuthenticated,
  isAuthorized,
  (req, res, next) => {
    db.collection('Feeds').find({ userId: req.params.userId }).toArray()
      .then((feeds) => {
        res.json(feeds);
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end('database error');
      });
  });

app.post(('/api/users/:userId/feeds/'),
  isAuthenticated,
  isAuthorized,
  check('name').isLength({ min: 1, max: 16 }),
  runValidation,
  sanitize('name'),
  (req, res, next) => {
    db.collection('Feeds').insertOne({ userId: req.params.userId, name: req.body.name, sources: [] })
      .then((insertResponse) => {
        // explicitly used `_id` key to preserve _id as first key in result
        res.json({ _id: insertResponse.insertedId, ...insertResponse.ops[0]});
        next();
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end('database error');
      });
  });

app.get('/api/sources/', isAuthenticated, (req, res) => {
  let dbQuery = {};
  if (req.query.category)
    dbQuery.category = { $eq: req.query.category }
  if (req.query.country)
    dbQuery.country = { $eq: req.query.country }
  if (req.query.language)
    dbQuery.language = { $eq: req.query.language }
  db.collection('Sources').find(dbQuery).toArray()
    .then((response) => {
    res.send(response);
  }).catch((reason) => {
    res.status(500).end(`failed to get sources (${reason})`);
  });
});

app.patch('/api/users/:userId/feeds/:feedId/',
  isAuthenticated,
  isAuthorized,
  check('name').isLength({ min: 1, max: 16 }),
  check('feedId').isMongoId(),
  runValidation,
  (req, res) => {
    db.collection('Feeds').findOne({ _id: ObjectId(req.params.feedId) })
      .then((response) => {
        if (!response) return res.status(404).end(`feed ${req.params.feedId} does not exist`);
        if (req.session.userId !== response.userId || req.params.userId !== response.userId) {
          return res.status(403).end('forbidden');
        }
        if (!req.body.name) return res.status(400).end('invalid argument');

        return db.collection('Feeds').findOneAndUpdate({ _id: ObjectId(req.params.feedId) }, { $set: { name: req.body.name } }, { returnOriginal: false })
          .then(result => res.json(result.value));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end('database error');
      });
  });

app.delete('/api/users/:userId/feeds/:feedId/',
  isAuthenticated,
  isAuthorized,
  check('feedId').isMongoId(),
  runValidation,
  (req, res) => {
    db.collection('Feeds').findOne({ _id: ObjectId(req.params.feedId) })
      .then((response) => {
        if (!response) return res.status(404).end(`feed ${req.params.feedId} does not exist`);
        if (req.session.userId !== response.userId || req.params.userId !== response.userId) {
          return res.status(403).end('forbidden');
        }

        return db.collection('Feeds').findOneAndDelete({ _id: ObjectId(req.params.feedId) })
          .then(result => res.json(result.value));
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end('database error');
      });
  });

app.patch('/api/users/:userId/feeds/:feedId/sources/',
  isAuthenticated,
  isAuthorized,
  check('feedId').isMongoId(),
  check('sourceId').custom(sourceId => new Promise((resolve, reject) => {
    db.collection('Sources').findOne({ id: sourceId })
      .then(response => {
        if (response == null)
          reject(`source ${sourceId} does not exist`)
        else
          resolve();
        })
    })),
  runValidation,
  (req, res) => {
    db.collection('Feeds').findOne({ _id: ObjectId(req.params.feedId) })
      .then((response) => {
        if (!response) return res.status(404).end(`feed ${req.params.feedId} does not exist`);
        if (req.session.userId !== response.userId || req.params.userId !== response.userId) {
          return res.status(403).end('forbidden');
        }
        const query = { _id: ObjectId(req.params.feedId) };
        let update;
        switch (req.body.action) {
          case 'add':
            update = { $addToSet: { sources: req.body.sourceId } };
            return db.collection('Feeds').findOneAndUpdate(query, update, { returnOriginal: false })
              .then(result => res.json(result.value));
          case 'remove':
            update = { $pull: { sources: req.body.sourceId } };
            return db.collection('Feeds').findOneAndUpdate(query, update, { returnOriginal: false })
              .then(result => res.json(result.value));
          default:
            return res.status(400).end('invalid argument');
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).end('database error');
      });
  });

// https://developer.twitter.com/en/docs/trends/trends-for-location/api-reference/get-trends-place
const twitterClient = new Twitter({
  consumer_key: process.env.LIVYATAN_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.LIVYATAN_TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.LIVYATAN_TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.LIVYATAN_TWITTER_ACCESS_TOKEN_SECRET,
});

app.get('/api/tweets/', function(req, res, next) {
  db.collection('Tweets').find({}).toArray((err, tweets) => {
    if (err) return res.status(500).json({ err: err });
    return res.status(200).json(tweets);
  })
});



app.get('/api/weather/', function(req, res, next) {
  db.collection('Weather').find({}).toArray((err, weather) => {
    if (err) return res.status(500).json({err: err});
    return res.status(200).json(weather);
  });
})

// https://www.alphavantage.co/documentation/
app.get('/api/stocks/', function(req, res, next) {
  db.collection('Stocks').find({}).toArray((err, stocks) => {
    if (err) return res.status(500).json({err: err});
    return res.status(200).json(stocks);
  });
})

function getStocks(fromCurrency, toCurrency){
  alpha.forex.rate(fromCurrency, toCurrency).then(data => {
    db.collection('Stocks').updateOne({ toCurrency: data['Realtime Currency Exchange Rate']['3. To_Currency Code'] }, {
      $set: {
        fromCurrency: data['Realtime Currency Exchange Rate']['1. From_Currency Code'],
        toCurrency: data['Realtime Currency Exchange Rate']['3. To_Currency Code'],
        exchangeRate: data['Realtime Currency Exchange Rate']['5. Exchange Rate'],
      },
    },
    {
      upsert: true,
    }).catch((reason) => {
      console.log(`failed to update stocks in DB (${reason})`);
    });
  }).catch((reason) => {
    console.log(`failed to get stocks (${reason})`);
  })
}

function updateTweets(){
  twitterClient.get('trends/place', { id: 23424775 }, function(error, tweets, response) {
    if (!error) {
      const query = tweets[0].trends;
      db.collection('Tweets').deleteMany().then(response => {
        if (response.result.ok != 1) throw response.result.n
        db.collection('Tweets').insertMany(query).catch((reason) => {
          console.log(`failed to update tweets in DB (${reason})`)
        })
      })
      .catch((reason) => { console.log(`failed to delete tweets in DB (${reason})`)})
    }
    else {
      console.log(`failed to get tweets (${error})`);
    }
  });
}

// https://openweathermap.org/current
weather.setLang('en');
weather.setCity('Toronto');
weather.setUnits('metric');
weather.setAPPID(process.env.LIVYATAN_OPENWEATHER_KEY);

function updateWeather(){
  weather.getAllWeather(function(err, json){
    if (err) return res.status(500).json({ err: err });
    db.collection('Weather').replaceOne({}, json, { upsert: true }
    ).catch((reason) => {
      console.log(`failed to update weather in DB (${reason})`);
    });
  })
}

function updateStocks(){
  getStocks('cad', 'usd')
  getStocks('cad', 'btc')
  getStocks('cad', 'gbp')
  getStocks('cad', 'eur')
  getStocks('cad', 'hkd')
}

// 30 min
setInterval(updateStocks, 1800000);
// 15 min
setInterval(updateTweets, 900000);
// 15 min
setInterval(updateWeather, 900000);
