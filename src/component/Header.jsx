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
    return (
      <div>
        Header
        <div>
          <img
            alt="user.name"
            src={ this.getAvatar() }
          />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.user,
});

export default connect(mapStateToProps)(Header);
