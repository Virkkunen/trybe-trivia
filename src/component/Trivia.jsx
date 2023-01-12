import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Trivia extends Component {
  state = {
    index: 0,

  };

  shuffle = (array) => {
    let currentIndex = array.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  shuffleButtons = () => {
    const { questions } = this.props;
    const { index } = this.state;

    const correctAnswer = {
      type: 'correct_answer',
      answer: questions[index].correct_answer,
    };
    const arrayOfIncorrect = questions[index].incorrect_answers;
    const incorrectAnswers = (arrayOfIncorrect).map((element, índice) => {
      const elementIncorrect = {
        type: 'incorrect_answer',
        answer: element,
        Index: índice,
      };
      return elementIncorrect;
    });
    const totalAnswers = [...incorrectAnswers, correctAnswer];
    const shuffledArray = this.shuffle(totalAnswers);
    return (
      <div data-testid="answer-options">
        {

          shuffledArray.map((e) => {
            if (e.type === 'correct_answer') {
              return (
                <button type="button" data-testid="correct-answer">
                  {e.answer}
                </button>
              );
            }
            return (
              <button
                key={ e.Index }
                type="button"
                data-testid={ `wrong-answer-${e.Index}` }
              >
                {e.answer}
              </button>
            );
          })
        }

      </div>
    );
  };

  render() {
    const { questions } = this.props;
    const { index } = this.state;

    return (
      <div>
        {
          (questions.length === 0) ? <Redirect to="/" />
            : (
              <div>
                <h2 data-testid="question-category">
                  {questions[index].category }
                  {' '}
                </h2>
                <h3 data-testid="question-text">{questions[index].question}</h3>

                {
                  this.shuffleButtons()
                }
              </div>
            )
        }
      </div>

    );
  }
}
Trivia.propTypes = {
  questions: PropTypes.arrayOf.isRequired,
  category: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.game,
});

export default connect(mapStateToProps)(Trivia);
