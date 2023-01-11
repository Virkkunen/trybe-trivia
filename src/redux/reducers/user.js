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
    };
  default: return state;
  }
};

export default user;
