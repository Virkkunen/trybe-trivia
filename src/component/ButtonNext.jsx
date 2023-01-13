import React, { Component } from 'react';

export default class ButtonNext extends Component {
  nextQuestion = () => {
    
  };

  render() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.nextQuestion }
      >
        Próxima
      </button>
    );
  }
}
