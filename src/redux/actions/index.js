export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const SET_TIMER_INFO = 'SET_TIMER_INFO';
export const STOP_TIME = 'STOP_TIME';
export const START_TIME = 'START_TIME';
export const SEND_SECS = 'SEND_SECS';

export const addUserInfo = (username, email) => ({
  type: ADD_USER_INFO,
  payload: {
    username,
    email,
  },
});

export const addPlayerInfo = (score) => ({
  type: ADD_PLAYER_INFO,
  payload: score,

});
function requestStarted() {
  return { type: 'REQUEST_STARTED' };
}
function requestSuccessful(choices, TokenIsValid) {
  console.log(TokenIsValid);
  return { type: 'REQUEST_SUCCESSFUL',
    payload: choices,
    token: TokenIsValid,

  };
}
function requestFailed(error) {
  return {
    type: 'REQUEST_FAILED',
    payload: error,
  };
}

export function fetchAPIQuestions(token) {
  const THREE = 3;
  return async (dispatch) => {
    dispatch(requestStarted());
    console.log('REQUEST_STARTED');
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();

      if (data.response_code !== THREE) {
        dispatch(requestSuccessful(data.results, true));
      } else {
        dispatch(requestSuccessful(data.results, false));
      }

      console.log('REQUEST_SUCCESSFUL');
    } catch (error) {
      dispatch(requestFailed(error));
      console.log('REQUEST_FAILED');
    }
  };
}

export const setTimerInfo = (timerActive, timerDone) => ({
  type: SET_TIMER_INFO,
  payload: {
    timerActive,
    timerDone,
  },
});

export const funcStopTime = (stop, secs) => ({
  type: STOP_TIME,
  payload: stop,
  secondsLeft: secs,
});

export const funcStartTime = (start) => ({
  type: START_TIME,
  payload: start,
});
