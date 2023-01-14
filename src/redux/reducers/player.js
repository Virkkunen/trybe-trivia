import { ADD_PLAYER_INFO, CORRECT_CHOOSE, RESET_GAME } from '../actions';

const INITIAL_STATE = {
  score: 0,
  assertions: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_PLAYER_INFO:
    return {
      ...state,
      score: Number(state.score + action.payload),
    };
  case CORRECT_CHOOSE:
    return {
      ...state,
      assertions: Number(state.assertions + action.payload),
    };
  case RESET_GAME:
    return {
      ...state,
      assertions: action.payload,
      score: action.payload,
    };
  default: return state;
  }
};

export default player;
