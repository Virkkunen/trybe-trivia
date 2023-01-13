import React, { Component } from 'react';
import FeedBackMessage from '../component/FeedBackMessage';
import Header from '../component/Header';
import PlayAgainButton from '../component/PlayAgainButton';
import RankingButton from '../component/RankingButton';

class Feedbacks extends Component {
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

export default Feedbacks;
