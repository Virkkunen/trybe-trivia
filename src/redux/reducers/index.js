import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import game from './game';

const rootReducers = combineReducers({
  user,
  player,
  game,
});

export default rootReducers;
