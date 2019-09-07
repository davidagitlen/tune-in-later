import { combineReducers } from 'redux';
import { setCurrentUserReducer } from '../reducers/setCurrentUserReducer';
import { setCurrentUserFavoritesReducer } from '../reducers/setCurrentUserFavoritesReducer';

export const rootReducer = combineReducers({
  currentUser: setCurrentUserReducer,
  favorites: setCurrentUserFavoritesReducer
})