import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  getAvatar = () => {
    const { email } = this.props;
    const address = String(email).trim().toLowerCase();
    const hash = md5(address);
    return `https://www.gravatar.com/avatar/${hash}`;
  };

  render() {
    const { username, score } = this.props;
    return (
      <div>
        Header
        <div>
          <img
            alt="user.name"
            src={ this.getAvatar() }
            data-testid="header-profile-picture"
          />
          <span
            data-testid="header-player-name"
          >
            { username }
          </span>
        </div>
        <div>
          <span data-testid="header-score">{ score }</span>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
  ...state.player,
});

export default connect(mapStateToProps)(Header);
