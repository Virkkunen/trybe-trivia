import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setTimerInfo } from '../redux/actions';

const ONE_SECOND = 1000;

class Timer extends Component {
  state = {
    seconds: 30,
    // timerActive: false,
    // timerDone: false,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { timerActive, timerDone } = this.props;
    if (seconds === 0 && !timerDone && timerActive) this.stopInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  startTimer = () => {
    const { dispatch } = this.props;
    // this.setState({ timerActive: true, timerDone: false });
    const active = true;
    const done = false;
    dispatch(setTimerInfo(active, done));

    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  };

  stopInterval = () => {
    const { dispatch } = this.props;
    clearInterval(this.intervalId);
    // this.setState({ timerActive: false, timerDone: true });
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

Timer.defaultProps = {
  timerDone: false,
  timerActive: false,
};

Timer.propTypes = {
  timerDone: PropTypes.bool,
  timerActive: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.timer,
});

export default connect(mapStateToProps)(Timer);
