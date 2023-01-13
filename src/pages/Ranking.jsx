import React, { Component } from 'react';
import PlayAgainButton from '../component/PlayAgainButton';
import Players from '../component/Players';

export default class Ranking extends Component {
  state = {
    players: [],
  };

  componentDidMount() {
    this.loadPlayers();
  }

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
        <PlayAgainButton testId="btn-go-home" />
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
