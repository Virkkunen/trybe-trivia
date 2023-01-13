import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Timer from './Timer';
import { addPlayerInfo, funcStartTime, funcStopTime } from '../redux/actions';
import shuffle from '../services/shuffle';
import triviaState from './states/triviaState';
import triviaPropTypes from './propTypes/triviaPropTypes';

const ONE_SECOND = 1000;

class Trivia extends Component {
  state = { ...triviaState }; // XGH

  componentDidMount() {
    const { isTokenValid } = this.props;
    if (isTokenValid) {
      this.setState({
        loading: true,
      });
      this.changeQuestion();
    }
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

  changeQuestion = () => {
    const shuffledButtons = this.shuffleButtons();
    this.setState({
      shuffeBut: shuffledButtons,
      loading: false,
    }, () => {
      this.setInitialInterval();
      this.changeDifficulty();
    });
  };

  nextQuestion = () => {
    const { questions, dispatch } = this.props;
    const { index } = this.state;
    const totalQ = questions.length;
    if (index < totalQ - 1) {
      this.setState((prevState) => ({
        index: prevState.index + 1,
        correct: false,
        incorrect: false,
        buttonsDisabled: false,
      }), () => {
        this.changeQuestion();
        dispatch(funcStartTime(true));
      });
      return;
    }
    this.setState({ index: 0, redirect: true });
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

  calculateScore = () => {
    const TEN = 10;
    const { secondsLeft } = this.props;
    const { difficultyPoints } = this.state;
    const score = TEN + (secondsLeft * difficultyPoints);
    return score;
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
    const shuffledArray = shuffle(totalAnswers);
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
      redirect,
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
              { correct && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ this.nextQuestion }
                >
                  Próxima
                </button>) }
            </div>
          ) : <Redirect to="/" />
        }
        { redirect && <Redirect to="/feedbacks" />}
      </div>
    );
  }
}
Trivia.propTypes = { ...triviaPropTypes };
const mapStateToProps = (state) => ({
  ...state.game,
  ...state.timer,
});
export default connect(mapStateToProps)(Trivia);
