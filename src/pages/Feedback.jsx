import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FeedBackMessage from '../component/FeedBackMessage';
import Header from '../component/Header';
import { resetGame, resetTimer } from '../redux/actions';

class Feedbacks extends Component {
  componentDidMount() {
    this.saveUserInfo();
  }

  buttonRedirect = ({ target: { name } }) => {
    const { history, dispatch } = this.props;
    if (name === 'ranking') return history.push('/ranking');
    if (name === 'play-again') {
      dispatch(resetGame(0));
      dispatch(resetTimer());
      return history.push('/');
    }
  };

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
      <div>
        <Header />
        <FeedBackMessage />
        <button
          type="button"
          name="ranking"
          data-testid="btn-ranking"
          onClick={ this.buttonRedirect }
        >
          Ranking
        </button>
        <button
          type="button"
          name="play-again"
          data-testid="btn-play-again"
          onClick={ this.buttonRedirect }
        >
          Jogar Novamente
        </button>
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
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Feedbacks);
