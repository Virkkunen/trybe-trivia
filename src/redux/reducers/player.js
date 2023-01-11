import { ADD_PLAYER_INFO } from '../actions';

const INITIAL_STATE = {
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_INFO:
    return {
      ...state,
      score: action.payload.score,
    };
  default: return state;
  }
};

export default player;
