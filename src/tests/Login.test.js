import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import user from "../redux/reducers/user";
import { act } from "react-dom/test-utils";

describe('Testes do Login', () => {

  test('Os elementos aparecem na página', () => {
    renderWithRouterAndRedux(<App />);

    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const loginBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    expect(userEl).toBeInTheDocument();
    expect(emailEl).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(settingsBtn).toBeInTheDocument();
  });

  test('Se o botão de login começa desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const loginBtn = screen.getByTestId('btn-play');
    expect(loginBtn).toBeDisabled();
  });

  test.only('Se o botão de login habilita', () => {
    renderWithRouterAndRedux(<App />);
    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const loginBtn = screen.getByTestId('btn-play');

    const user = 'username';
    const email = "email@domain.com";

    userEvent.type(userEl, user);
    userEvent.type(emailEl, email);
    expect(loginBtn).not.toBeDisabled();

  });

  xtest('Se os campos funcionam corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const loginBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    act(() => {
      userEvent.type(userEl, 'asdfgsd');
      userEvent.type(emailEl, 'asdfasd@asdfasdf.omc');
      userEvent.click(loginBtn);
    });
    
    // history.push('/game');
    const loading = screen.getByTestId('loading-login');
    
    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('/game'));

  });

  test('Se o botão de configurações vai pro lugar correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings');
    
    expect(settingsBtn).toBeInTheDocument();
    userEvent.click(settingsBtn);
    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('/settings'));
  });
});