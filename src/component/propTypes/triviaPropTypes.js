import PropTypes from 'prop-types';

const triviaPropTypes = {
  questions: PropTypes.oneOfType([PropTypes.array]).isRequired,
  category: PropTypes.string.isRequired,
  isTokenValid: PropTypes.bool.isRequired,
  timerDone: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  secondsLeft: PropTypes.number.isRequired,
};

export default triviaPropTypes;
