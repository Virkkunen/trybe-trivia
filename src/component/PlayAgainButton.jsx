import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class PlayAgainButton extends Component {
  // handleClick = () => {
  //   const { history } = this.props;
  //   history.push(null, '/');
  // };

  render() {
    const { testId } = this.props;

    return (
      <Link to="/">
        <button
          type="button"
          data-testid={ testId }
        // onClick={ this.handleClick }
        >
          Jogar novamente
        </button>
      </Link>
    );
  }
}

PlayAgainButton.propTypes = {
  testId: PropTypes.string.isRequired,
  // history: PropTypes.instanceOf(Object).isRequired,
};
