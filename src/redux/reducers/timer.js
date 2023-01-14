import { SET_TIMER_INFO, STOP_TIME, START_TIME, RESET_TIMER } from '../actions';

const INITIAL_STATE = {
  secondsLeft: 0,
  stopTime: false,
  startTime: false,
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

  case START_TIME:
    return {
      ...state,
      startTime: action.payload,
    };

  case RESET_TIMER:
    return {
      ...INITIAL_STATE,
    };

  default: return state;
  }
};

export default timer;
