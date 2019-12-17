let DOMAIN

if (process.env.NODE_ENV !== 'production') {
  DOMAIN = 'http://localhost:3001'
} else {
  DOMAIN = 'https://livyatan.xyz'
}

export { DOMAIN }

export const VIEWS = {
  CATEGORY: 'category',
  FEED: 'feed',
  MANAGE_FEED: 'manageFeeds',
  MANAGE_FEED_SOURCES: 'manageFeedSources',
  STARRED: 'starred',
  API: 'api'
}