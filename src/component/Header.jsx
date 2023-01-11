import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Header extends Component {
  handleClick = ({ target: { name } }) => {
    const { history } = this.props;
    history.push(`/${name}`);
  };

  render() {
    return (
      <div>
        Header
        <div>
          <button
            type="button"
            data-testid="btn-settings"
            name="settings"
            onClick={ this.handleClick }
          >
            Configurações
          </button>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};
