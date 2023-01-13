import React, { Component } from 'react';
import PlayAgainButton from '../component/PlayAgainButton';

export default class Ranking extends Component {
  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <PlayAgainButton testId="btn-go-home" />
      </div>
    );
  }
}
