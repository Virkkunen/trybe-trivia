import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class RankingButton extends Component {
  render() {
    return (
      <Link to="/ranking">
        <button
          type="button"
          data-testid="btn-ranking"
        >
          Ranking
        </button>
      </Link>
    );
  }
}
