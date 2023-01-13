import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Players extends Component {
  render() {
    const { index, playerName, score, avatar } = this.props;
    return (
      <li>
        <p data-testid={ `player-name-${index}` }>
          {playerName}
        </p>
        <p data-testid={ `player-score-${index}` }>
          {score}
        </p>
        <img
          src={ avatar }
          alt={ playerName }
        />
      </li>
    );
  }
}

Players.propTypes = {
  index: PropTypes.number.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};
