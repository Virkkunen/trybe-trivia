import { combineReducers } from 'redux';
import user from './user';
import player from './player';
import game from './game';
import timer from './timer';

const rootReducers = combineReducers({
  user,
  player,
  game,
  timer,
});

export default rootReducers;
