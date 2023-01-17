import React from "react";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { act } from "react-dom/test-utils";
import Login from "../pages/Login";
import Game from "../pages/Game";
import mockData from './helpers/mockData';
import Trivia from "../component/Trivia";
import Header from "../component/Header";
import { toBeEnabled } from "@testing-library/jest-dom/dist/matchers";






const mockFetchAPI = () => Promise.resolve({
  json: () => Promise.resolve(mockData),
});
describe('Testes do Game', () => {
  beforeEach(() => {
    const json = jest.spyOn(global,'fetch');

    // jest.resetAllMocks()
    //  global.fetch = jest.fn(mockFetchAPI);



      })
      

    


    




  test('Os elementos aparecem do componente Header devem aparecer na página', async() => {
    const initialState = {
      user: {
        username: 'alguem',
        email: 'alguem@alguem.com',
        avatar: '',
      },
      player:{
        score: 0,
        assertions: 0,
      },
      game: {
        questions:mockData.results,
        error: '',
        loading: false,
        isTokenValid: true,

        },
     
        timer:{
          secondsLeft: 0,
          stopTime: false,
          startTime: false,
          timerActive: false,
          timerDone: false,
        }
      }
    const initialEntries = '/game';
     renderWithRouterAndRedux(<App />,  initialState, initialEntries);


    const imageElement =await screen.findByTestId('header-profile-picture')
    const nameElement = await screen.findByTestId('header-player-name')
    const scoreElement = await screen.findByTestId('header-score')
    expect(nameElement).toHaveTextContent('alguem')
    expect(nameElement).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(scoreElement).toBeInTheDocument()
    

  });
  test('Os elementos aparecem do componente Trivia devem aparecer na página', async () => {
    const initialState = {
      user: {
        username: 'alguem',
        email: 'alguem@alguem.com',
        avatar: '',
      },
      player:{
        score: 0,
        assertions: 0,
      },
      game: {
        questions:mockData.results,
        error: '',
        loading: false,
        isTokenValid: true,

        },
     
        timer:{
          secondsLeft: 0,
          stopTime: false,
          startTime: false,
          timerActive: false,
          timerDone: false,
        }
      }
    const initialEntries = '/game';
     renderWithRouterAndRedux(<App />,  initialState, initialEntries);

    const category = await screen.findByTestId("question-category");
    const question = await screen.findByTestId("question-text");
    const answer = await screen.findByTestId("answer-options");
    const answerCorrects = await screen.findByTestId("correct-answer")
    const answer1 =  screen.getByTestId("wrong-answer-0")
    const answer2 =  screen.getByTestId("wrong-answer-1")
    const answer3 =  screen.getByTestId("wrong-answer-2")


    expect(category).toBeInTheDocument()
    expect(question).toBeInTheDocument()
    expect(answer).toBeInTheDocument()
    expect(answerCorrects).toBeInTheDocument()
    expect(answer1).toBeInTheDocument()
    expect(answer2).toBeInTheDocument()
    expect(answer3).toBeInTheDocument()
    expect(answer1).toBeDisabled();
    expect(answer2).toBeDisabled();
    expect(answer3).toBeDisabled();
    expect(answerCorrects).toBeDisabled()

  });
 jest.setTimeout(40000)
  it('As respostas devem ser habilitadas, contador aparecer e o botao "Proxima questao" deverá aparecer', async() => {
    const initialState = {
      user: {
        username: 'alguem',
        email: 'alguem@alguem.com',
        avatar: '',
      },
      player:{
        score: 0,
        assertions: 0,
      },
      game: {
        questions:mockData.results,
        error: '',
        loading: false,
        isTokenValid: true,

        },
     
        timer:{
          secondsLeft: 0,
          stopTime: false,
          startTime: false,
          timerActive: false,
          timerDone: false,
        }
      }
    const initialEntries = '/game';
    const {history} = renderWithRouterAndRedux(<App />,  initialState, initialEntries);

    await new Promise((r) => setTimeout(r, 6000));
    await waitFor( () => screen.getByText("Tempo: 30"));
    await waitFor( () => screen.getByText("Tempo: 29"));

   await waitFor(async ()=> expect( await screen.findByTestId("correct-answer")).toBeEnabled())
    userEvent.click(await screen.findByTestId("correct-answer"));
    await waitFor(async () =>expect( await screen.findByTestId("btn-next")).toBeInTheDocument());
    userEvent.click( await screen.findByTestId("btn-next"))
   userEvent.click( await screen.findByTestId("wrong-answer-0"))
   userEvent.click( await screen.findByTestId("btn-next"))
   userEvent.click( await screen.findByTestId("wrong-answer-0"))
   userEvent.click( await screen.findByTestId("btn-next"))
   userEvent.click( await screen.findByTestId("wrong-answer-0"))
   userEvent.click( await screen.findByTestId("btn-next"))
   userEvent.click( await screen.findByTestId("wrong-answer-0"))
   userEvent.click( await screen.findByTestId("btn-next"))
   const {pathname} = history.location;
   await waitFor(()=>expect(pathname).toBe('/feedback'));



  })
  it('Verificar se o timer está funcionando...', async() => {
    const initialState = {
      user: {
        username: 'alguem',
        email: 'alguem@alguem.com',
        avatar: '',
      },
      player:{
        score: 0,
        assertions: 0,
      },
      game: {
        questions:mockData.results,
        error: '',
        loading: false,
        isTokenValid: true,

        },
     
        timer:{
          secondsLeft: 0,
          stopTime: false,
          startTime: false,
          timerActive: false,
          timerDone: false,
        }
      }
    const initialEntries = '/game';
    renderWithRouterAndRedux(<App />,  initialState, initialEntries);
    await new Promise((r) => setTimeout(r, 36500));
    expect( await screen.findByTestId("correct-answer")).toBeDisabled()




    



  })
});
