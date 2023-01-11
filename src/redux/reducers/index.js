import { combineReducers } from 'redux';
import user from './user';
import player from './player';

const rootReducers = combineReducers({
  user,
  player,
});

export default rootReducers;
