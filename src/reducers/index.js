import { combineReducers } from 'redux';
import { setCurrentUserReducer } from '../reducers/setCurrentUserReducer';
import { setCurrentUserFavoritesReducer } from '../reducers/setCurrentUserFavoritesReducer';
import { displaySearchResultsReducer } from '../reducers/displaySearchResultsReducer';
import { setSelectedBookReducer } from '../reducers/setSelectedBookReducer';

export const rootReducer = combineReducers({
  currentUser: setCurrentUserReducer,
  favorites: setCurrentUserFavoritesReducer,
  searchResults: displaySearchResultsReducer,
  selectedBook: setSelectedBookReducer
})