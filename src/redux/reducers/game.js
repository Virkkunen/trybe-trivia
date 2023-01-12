import { REQUEST_FAILED, REQUEST_STARTED, REQUEST_SUCCESSFUL } from '../actions';

const INITIAL_STATE = {
  questions: [],
  error: '',
  loading: false,
  isTokenValid: false,

};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_FAILED:
    return {
      ...state,
      error: action.payload.error,
      loading: false,
    };
  case REQUEST_STARTED:
    return {
      ...state,
      loading: true,
    };
  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      questions: action.payload,
      loading: false,
      isTokenValid: action.token,
    };
  default: return state;
  }
};

export default game;
