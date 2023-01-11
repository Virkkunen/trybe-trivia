export const ADD_USER_INFO = 'ADD_USER_INFO';
export const ADD_PLAYER_INFO = 'ADD_PLAYER_INFO';

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
