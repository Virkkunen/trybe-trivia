import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../component/Header';
import Trivia from '../component/Trivia';

class Game extends Component {
  render() {
    const { loading } = this.props;
    return (
      <div>
        <Header />
        {
          !loading && <Trivia />
        }

      </div>
    );
  }
}
Game.propTypes = {
  loading: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  ...state.game,
});

export default connect(mapStateToProps)(Game);
