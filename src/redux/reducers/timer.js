import { SET_TIMER_INFO, STOP_TIME } from '../actions';

const INITIAL_STATE = {
  secondsLeft: 0,
  stopTime: false,
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

  case STOP_TIME:
    return {
      ...state,
      stopTime: action.payload,
      secondsLeft: action.secondsLeft,

    };

  default: return state;
  }
};

export default timer;
