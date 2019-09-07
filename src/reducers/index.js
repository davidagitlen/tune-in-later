import { combineReducers } from 'redux';
import { setCurrentUserReducer } from '../reducers/setCurrentUserReducer';

export const rootReducer = combineReducers({
  currentUser: setCurrentUserReducer
})