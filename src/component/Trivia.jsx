import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './Timer';
import { addPlayerInfo, funcStopTime } from '../redux/actions';

const ONE_SECOND = 1000;

class Trivia extends Component {
  state = {
    index: 0,
    correct: '',
    incorrect: '',
    shuffeBut: [],
    loading: false,
    initialInterval: 5,
    intervalDone: false,
    buttonsDisabled: true,
    difficulty: '',
    difficultyPoints: 0,
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
      }, this.setInitialInterval);
    }
    this.changeDifficulty();
  }

  componentDidUpdate() {
    const { initialInterval, intervalDone } = this.state;
    const { timerDone } = this.props;
    if (initialInterval === 0 && !intervalDone) {
      this.stopInterval();
      this.setState({ intervalDone: true, buttonsDisabled: false });
    }
    if (timerDone && initialInterval === 0) {
      this.setState({ buttonsDisabled: true, initialInterval: 5 });
    }
  }

  componentWillUnmount() {
    this.stopInterval();
  }

  changeDifficulty = () => {
    const { index } = this.state;
    const { questions } = this.props;
    this.setState({
      difficulty: questions[index].difficulty,
    }, this.convertDifficulty);
  };

  convertDifficulty = () => {
    const { difficulty } = this.state;
    if (difficulty === 'hard') {
      this.setState({
        difficultyPoints: 3,
      });
    }
    if (difficulty === 'medium') {
      this.setState({
        difficultyPoints: 2,
      });
    }
    if (difficulty === 'easy') {
      this.setState({
        difficultyPoints: 1,
      });
    }
  };

  stopInterval = () => {
    clearInterval(this.intervalId);
  };

  setInitialInterval = () => {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ initialInterval: prevState.initialInterval - 1,
      }));
    }, ONE_SECOND);
  };

  onChooseCorrect = async () => {
    const { dispatch } = this.props;

    this.setState({
      correct: true,
      incorrect: true,
    });
    await dispatch(funcStopTime(true));
    await dispatch(addPlayerInfo(this.calculateScore()));
  };

  onChooseIncorrect = async () => {
    const { dispatch } = this.props;

    this.setState({
      incorrect: true,
      correct: true,
    });
    await dispatch(funcStopTime(true));
    // await dispatch(addPlayerInfo(this.calculateScore()));
  };

  calculateScore = () => {
    const TEN = 10;
    const { secondsLeft } = this.props;
    const { difficultyPoints } = this.state;
    const score = TEN + (secondsLeft * difficultyPoints);
    return score;
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
    const {
      index,
      shuffeBut,
      loading,
      correct,
      incorrect,
      intervalDone,
      buttonsDisabled,
    } = this.state;

    return (
      <div>
        { intervalDone && <Timer />}
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
                                disabled={ buttonsDisabled }
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
                              disabled={ buttonsDisabled }
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
  questions: PropTypes.oneOfType([PropTypes.array]),
  category: PropTypes.string,
  isTokenValid: PropTypes.bool.isRequired,
  timerDone: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  secondsLeft: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.game,
  ...state.timer,
});
export default connect(mapStateToProps)(Trivia);
