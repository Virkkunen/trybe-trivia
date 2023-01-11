export const ADD_USER_INFO = 'ADD_USER_INFO';

export const addUserInfo = (username, email) => ({
  type: ADD_USER_INFO,
  payload: [username, email],
});
