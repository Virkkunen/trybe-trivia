import React, { Component } from 'react';
import FeedBackMessage from '../component/FeedBackMessage';
import Header from '../component/Header';

class Feedbacks extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        <FeedBackMessage />
      </div>
    );
  }
}

export default Feedbacks;
