import React, { Component } from 'react';

const ONE_SECOND = 1000;

export default class Timer extends Component {
  state = {
    seconds: 30,
    timerActive: false,
    timerDone: false,
  };

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate() {
    const { seconds, timerDone, timerActive } = this.state;
    if (seconds === 0 && !timerDone && timerActive) this.stopInterval();
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  startTimer = () => {
    this.setState({ timerActive: true, timerDone: false });
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  };

  stopInterval = () => {
    clearInterval(this.intervalId);
    this.setState({ timerActive: false, timerDone: true });
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
