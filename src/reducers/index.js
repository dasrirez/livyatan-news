import { combineReducers } from 'redux'

import ActiveCategoryReducer from './active-category-reducer'
import ActiveFeedReducer from './active-feed-reducer'
import ActiveSourcesReducer from './active-sources-reducer'
import ActiveViewReducer from './active-view-reducer'
import AlertReducer from './alert-reducer'
import AllSourcesReducer from './all-sources-reducer'
import ArticlesReducer from './articles-reducer'
import AuthenticationReducer from './authentication-reducer'
import CategoryReducer from './categories-reducer'
import StarredReducer from './starred-reducer'
import UserFeedsReducer from './user-feeds-reducer'
import PageReducer from './page-reducer'
import LoadingArticlesReducer from './loading-articles-reducer';
import ErrorReducer from './error-reducer';

const allReducers = combineReducers(
  {
    activeCategory: ActiveCategoryReducer,
    activeFeed: ActiveFeedReducer,
    activeSources: ActiveSourcesReducer,
    activeView: ActiveViewReducer,
    alert: AlertReducer,
    allSources: AllSourcesReducer,
    articles: ArticlesReducer,
    authentication: AuthenticationReducer,
    error: ErrorReducer,
    loadingArticles: LoadingArticlesReducer,
    categories: CategoryReducer,
    starred: StarredReducer,
    userFeeds: UserFeedsReducer,
    page: PageReducer,
  }
)

export default allReducers