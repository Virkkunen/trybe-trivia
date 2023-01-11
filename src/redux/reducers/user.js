import { ADD_USER_INFO } from '../actions';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER_INFO:
    return {
      ...state,
      username: action.payload.username,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default user;
