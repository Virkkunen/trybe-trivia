import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerInfo, funcStopTime } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    seconds: 30,
    localTimerActive: false,
    localTimerDone: false,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { seconds, localTimerActive, localTimerDone } = this.state;
    this.timeStoper();
    if (seconds === 0 && !localTimerDone && localTimerActive) this.stopInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  timeStoper = async () => {
    const { dispatch, stopTime } = this.props;
    const { seconds } = this.state;
    if (stopTime) {
      this.stopInterval();
      await dispatch(funcStopTime(false, seconds));
    }
  };

  startTimer = () => {
    const { dispatch } = this.props;
    // this.setState({ timerActive: true, timerDone: false });
    const active = true;
    const done = false;
    dispatch(setTimerInfo(active, done));
    this.setState({ localTimerActive: true });

    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  };

  stopInterval = () => {
    const { dispatch } = this.props;
    clearInterval(this.intervalId);
    this.setState({ localTimerActive: false, localTimerDone: true });
    const active = false;
    const done = true;
    dispatch(setTimerInfo(active, done));
  };

  render() {
    const { seconds } = this.state;
    return (
      <div>
        <p>
          Tempo:
          {' '}
          {seconds}
        </p>
      </div>
    );
  }
}

// Timer.defaultProps = {
//   timerDone: false,
//   timerActive: false,
// };

Timer.propTypes = {
  // timerDone: PropTypes.bool,
  // timerActive: PropTypes.bool,
  stopTime: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.timer,
});

export default connect(mapStateToProps)(Timer);
