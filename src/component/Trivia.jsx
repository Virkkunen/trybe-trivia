import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './Timer';

class Trivia extends Component {
  state = {
    index: 0,
    correct: '',
    incorrect: '',
    shuffeBut: [],
    loading: false,
  };

  componentDidMount() {
    const { isTokenValid } = this.props;
    if (isTokenValid) {
      this.setState({
        loading: true,
      });
      const shuffledButtons = this.shuffleButtons();
      this.setState({
        shuffeBut: shuffledButtons,
        loading: false,

      });
    }
  }

  onChooseCorrect = () => {
    this.setState({
      correct: true,
      incorrect: true,

    });
  };

  onChooseIncorrect = () => {
    this.setState({
      incorrect: true,
      correct: true,

    });
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
    return shuffledArray;
  };

  render() {
    const { questions, isTokenValid } = this.props;
    const { index, shuffeBut, loading, correct, incorrect } = this.state;

    return (
      <div>
        { !loading && <Timer />}
        {
          (isTokenValid) ? (
            <div>
              <h2 data-testid="question-category">
                {questions[index].category }
                {' '}
              </h2>
              <h3 data-testid="question-text">{questions[index].question}</h3>

              {
                !loading
                  && (
                    <div data-testid="answer-options">
                      {

                        shuffeBut.map((e) => {
                          if (e.type === 'correct_answer') {
                            return (
                              <button
                                onClick={ this.onChooseCorrect }
                                className={ correct && 'correct-answer' }
                                key={ e.type }
                                type="button"
                                data-testid="correct-answer"
                              >
                                {e.answer}
                              </button>
                            );
                          }
                          return (
                            <button
                              onClick={ this.onChooseIncorrect }
                              key={ e.Index }
                              type="button"
                              data-testid={ `wrong-answer-${e.Index}` }
                              className={ incorrect && 'incorrect-answer' }
                            >
                              {e.answer}
                            </button>
                          );
                        })
                      }

                    </div>
                  )
              }
            </div>
          ) : <Redirect to="/" />
        }
      </div>

    );
  }
}
Trivia.defaultProps = {
  questions: [],
  category: '',
};

Trivia.propTypes = {
  questions: PropTypes.oneOfType([PropTypes.arrayOf]),
  category: PropTypes.string,
  isTokenValid: PropTypes.bool.isRequired,
  // timerDone: PropTypes.bool.isRequired,
  // timerActive: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.game,
  ...state.timer,
});

export default connect(mapStateToProps)(Trivia);
