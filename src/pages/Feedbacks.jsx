import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBackMessage from '../component/FeedBackMessage';
import Header from '../component/Header';
import PlayAgainButton from '../component/PlayAgainButton';
import RankingButton from '../component/RankingButton';

class Feedbacks extends Component {
  componentDidMount() {
    this.saveUserInfo();
  }

  saveUserInfo = () => {
    const { username, email, avatar, score } = this.props;
    const player = {
      username,
      email,
      avatar,
      score,
    };
    const playerArray = [player];
    const playerString = JSON.stringify(playerArray);

    if (!localStorage.players) {
      localStorage.setItem('players', playerString);
      return;
    }

    const savedPlayers = JSON.parse(localStorage.players);
    console.log(savedPlayers);
    savedPlayers.push(player);
    localStorage.setItem('players', JSON.stringify(savedPlayers));
  };

  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <FeedBackMessage />
        <PlayAgainButton testId="btn-play-again" />
        <RankingButton />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.player,
});

Feedbacks.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
