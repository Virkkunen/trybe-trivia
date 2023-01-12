import { SET_TIMER_INFO } from '../actions';

const INITIAL_STATE = {
  // seconds: 30,
  timerActive: false,
  timerDone: false,
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_TIMER_INFO:
    return {
      ...state,
      timerActive: action.payload.timerActive,
      timerDone: action.payload.timerDone,
    };
  default: return state;
  }
};

export default timer;
