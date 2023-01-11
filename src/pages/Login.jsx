import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addUserInfo } from '../redux/actions';
import fetchToken from '../services/TriviaAPI';

class Login extends Component {
  state = {
    loginDisabled: true,
    email: '',
    username: '',
    loading: false,
  };

  validateButton = () => {
    const { username, email } = this.state;
    const emailValidation = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const emailValid = emailValidation.test(email);
    const userValid = username.length > 0;

    const valid = emailValid && userValid;
    this.setState({ loginDisabled: !valid });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.validateButton);
  };

  sendUserInfo = () => {
    const { username, email } = this.state;

    const { dispatch } = this.props;
    dispatch(addUserInfo(username, email));
  };

  startGame = () => {
    const { history } = this.props;
    history.push('/game');
  };

  getToken = async () => {
    this.setState({ loading: true });
    const token = await fetchToken();
    localStorage.setItem('token', token);
    this.setState({ loading: false }, this.startGame);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.sendUserInfo();
    this.getToken();
  };

  render() {
    const { loginDisabled, username, email, loading } = this.state;

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
        >
          <label htmlFor="username-input">
            Usuário:
            <input
              type="text"
              id="username-input"
              name="username"
              data-testid="input-player-name"
              value={ username }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="username-input">
            Email:
            <input
              type="email"
              id="email-input"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ loginDisabled }
          >
            Play!
          </button>
        </form>
        { loading && <p>Carregando</p>}
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(Login);