import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
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

  test('Se o botão de login habilita', () => {
    renderWithRouterAndRedux(<App />);
    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const loginBtn = screen.getByTestId('btn-play');

    expect(loginBtn).toBeDisabled();
    userEvent.type(emailEl, 'teste@teste.com');
    userEvent.type(userEl, 'usuarioteste');
    expect(loginBtn).toBeEnabled();

  });

  test.only('Se os campos funcionam corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const loginBtn = screen.getByTestId('btn-play');
    const settingsBtn = screen.getByTestId('btn-settings');

    
    userEvent.type(userEl, 'asdfgsd');
    userEvent.type(emailEl, 'asdfasd@asdfasdf.omc');
    userEvent.click(loginBtn);
    
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