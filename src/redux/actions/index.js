export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';

export const addUserInfo = (username, email) => ({
  type: ADD_USER_INFO,
  payload: {
    username,
    email,
  },
});

export const addPlayerInfo = (score) => ({
  type: ADD_PLAYER_INFO,
  payload: {
    score,
  },
});
function requestStarted() {
  return { type: 'REQUEST_STARTED' };
}
function requestSuccessful(choices) {
  return { type: 'REQUEST_SUCCESSFUL',
    payload: choices,
  };
}
function requestFailed(error) {
  return {
    type: 'REQUEST_FAILED',
    payload: error,
  };
}

export function fetchAPIQuestions(token) {
  return async (dispatch) => {
    dispatch(requestStarted());
    console.log('REQUEST_STARTED');
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const data = await response.json();

      dispatch(requestSuccessful(data.results));
      console.log('REQUEST_SUCCESSFUL');
    } catch (error) {
      dispatch(requestFailed(error));
      console.log('REQUEST_FAILED');
    }
  };
}
