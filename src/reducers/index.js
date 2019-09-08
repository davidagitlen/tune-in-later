import { combineReducers } from 'redux';
import { setCurrentUserReducer } from '../reducers/setCurrentUserReducer';
import { setCurrentUserFavoritesReducer } from '../reducers/setCurrentUserFavoritesReducer';
import { displaySearchResultsReducer } from '../reducers/displaySearchResultsReducer';

export const rootReducer = combineReducers({
  currentUser: setCurrentUserReducer,
  favorites: setCurrentUserFavoritesReducer,
  searchResults: displaySearchResultsReducer
})