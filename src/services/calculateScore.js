const calculateScore = (difficultyPoints, secondsLeft) => {
  const TEN = 10;
  // const { secondsLeft } = this.props;
  // const { difficultyPoints } = this.state;
  const score = TEN + (secondsLeft * difficultyPoints);
  return score;
};

export default calculateScore;
