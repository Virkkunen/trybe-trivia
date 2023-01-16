import React from "react";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from "react-dom/test-utils";
import Login from "../pages/Login";
import Game from "../pages/Game";
import mockData from './helpers/mockData';

const mockFetchToken = () => Promise.resolve({
  json: () => Promise.resolve(mockToken),
});
const mockFetchAPI = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});
describe('Testes do Login', () => {
  beforeEach(() => {
    // global.fetch = jest.fn(mockFetchAPI);
    // const initialState = {
    //   user: {
    //     username: 'alguem',
    //     email: 'alguem@alguem.com',
    //   },
    //   game: {
    //     questions: [],
    //     error: '',
    //     loading: false,
    //     isTokenValid: false,

    //     },

    //   }
    
  });


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
    act(()=>{
      userEvent.type(emailEl, 'teste@teste.com');
      userEvent.type(userEl, 'usuarioteste');
    })

    expect(loginBtn).toBeEnabled();

  });

  test('Se os campos funcionam corretamente', async () => {

 const {history} = renderWithRouterAndRedux(<App />);
   

    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', {
      name: /play!/i,
    });
    
   
    // const settingsBtn = screen.getByTestId('btn-settings');

   act(()=>{
    userEvent.type(userEl, 'asdfgsd');
    userEvent.type(emailEl, 'test@test.com');
    userEvent.click(button);
   }) 

    await waitFor(()=> expect(history.location.pathname).toBe('/game'));


  });

  test('Se o botão de configurações vai pro lugar correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const settingsBtn = screen.getByTestId('btn-settings');
    
    expect(settingsBtn).toBeInTheDocument();
    act(()=>{
      userEvent.click(settingsBtn);
    })
    const { pathname } = history.location;
    await waitFor(() => expect(pathname).toBe('/settings'));
  });
  test("Verifica se a função fetch é chamada 2 vezes ",async()=>{
   
      global.fetch = jest.fn(mockFetchAPI)

    

     renderWithRouterAndRedux(<App />);
   

    const userEl = screen.getByTestId('input-player-name');
    const emailEl = screen.getByTestId('input-gravatar-email');
    const button = screen.getByRole('button', {
      name: /play!/i,
    });
    
   
    act(()=>{    
      userEvent.type(userEl, 'asdfgsd');
      userEvent.type(emailEl, 'test@test.com');
      userEvent.click(button);

       
    })
    expect(global.fetch).toHaveBeenCalledTimes(2);

    
  

  


  })
});