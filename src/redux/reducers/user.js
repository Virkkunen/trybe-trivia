import { ADD_USER_INFO } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
  avatar: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
      avatar: action.payload.avatar,
    };
  default: return state;
  }
};

export default user;
