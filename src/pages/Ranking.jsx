import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Players from '../component/Players';
import { resetGame, resetTimer } from '../redux/actions';

class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.loadPlayers();
  }

  startNewGame = () => {
    const { history, dispatch } = this.props;
    dispatch(resetGame(0));
    dispatch(resetTimer());
    return history.push('/');
  };

  loadPlayers = () => {
    const savedPlayers = JSON.parse(localStorage.players);
    this.setState({
      players: savedPlayers,
    }, this.sortPlayers);
  };

  sortPlayers = () => {
    const { players } = this.state;
    this.setState({
      players: players.sort((a, b) => b.score - a.score),
    });
  };

  render() {
    const { players } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          onClick={ this.startNewGame }
          data-testid="btn-go-home"
        >
          Jogar Novamente

        </button>
        { players.map((player, index) => (
          <Players
            index={ index }
            key={ player.username }
            playerName={ player.username }
            score={ player.score }
            avatar={ player.avatar }
          />
        )) }
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Ranking);
