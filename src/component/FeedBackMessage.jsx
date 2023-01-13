import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
// import player from '../redux/reducers/player';

class FeedBackMessage extends Component {
  state = {
    message: '',
    // loading: true,
  };

  componentDidMount() {
    this.messageChooser();
  }

  messageChooser = () => {
    const TRHEE = 3;
    const { assertions } = this.props;
    if (assertions < TRHEE) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  };

  render() {
    const { message } = this.state;
    const { assertions, score } = this.props;
    return (
      <div>

        <p data-testid="feedback-text">{ message }</p>
        <p data-testid="feedback-total-question">
          { assertions }

        </p>
        <p data-testid="feedback-total-score">{ score }</p>
      </div>
    );
  }
}

FeedBackMessage.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.player,
});

export default connect(mapStateToProps)(FeedBackMessage);
