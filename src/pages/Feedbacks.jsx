import React, { Component } from 'react';
import Header from '../component/Header';

export default class Feedbacks extends Component {
  render() {
    return (
      <div data-testid="feedback-text">
        <Header />
        Feedbacks
      </div>
    );
  }
}
