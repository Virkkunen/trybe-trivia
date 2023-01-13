import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class PlayAgainButton extends Component {
  render() {
    const { testId } = this.props;

    return (
      <Link to="/">
        <button
          type="button"
          data-testid={ testId }
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

PlayAgainButton.propTypes = {
  testId: PropTypes.string.isRequired,
};
