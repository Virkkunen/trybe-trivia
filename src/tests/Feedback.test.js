import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import Feedback from "../pages/Feedback";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import App from "../App";





describe('Testando o componente Feedbacks', () => {



  test('Verificar se os elementos são renderizados', () => {
    renderWithRouterAndRedux(<Feedback/>);
    const buttonRank = screen.getByTestId("btn-ranking");
    const btnPlay = screen.getByTestId("btn-play-again");
    const textFeedback = screen.getByTestId("feedback-text");
    const totalQuestion = screen.getByTestId("feedback-total-question");
    const totalScore = screen.getByTestId("feedback-total-score");



    expect(btnPlay).toBeInTheDocument();
    expect(buttonRank).toBeInTheDocument();
    expect(textFeedback).toBeInTheDocument();
    expect(totalQuestion).toBeInTheDocument();
    expect(totalScore).toBeInTheDocument();

  }); 
  test('Verificar se renderiza a página corespondente de ranking',async () => {
    const initialState = {
      player: {
          score: 100,
          assertions: 3,
      }
    } 
    const initialEntries = '/feedback';
    const {history} = renderWithRouterAndRedux(<App/>,initialState,initialEntries);
    const buttonRank = await screen.findByTestId("btn-ranking");

    act(()=>{
     userEvent.click(buttonRank)
    })
 

    const {pathname} = history.location 
  
    await waitFor(()=>{
      expect(pathname).toBe('/ranking')
    })
  
  });
  test('Verificar se renderiza a página corespondente de feedbacks',async () => {
    const initialState = {
      player: {
          score: 100,
          assertions: 3,
      }
    } 
    const initialEntries = '/feedback'
   const {history} = renderWithRouterAndRedux(<App/>,initialState,initialEntries);
    const btnPlayAgain = await screen.findByTestId("btn-play-again");

 
     userEvent.click(btnPlayAgain)
     screen.debug()



    
    await waitFor(()=>{
      expect(history.location.pathname).toBe('/');
    })
  
  });


  test('Será verificado se a mensagem correta é exibida', () => {
    const initialState = {
      player: {
          score: 0,
          assertions: 3,
      }
    }
    renderWithRouterAndRedux(<Feedback/>, initialState)
    const feedbackMessage = screen.getByTestId('feedback-text')
    expect(feedbackMessage).toBeInTheDocument();
    expect(feedbackMessage).toHaveTextContent('Well Done!')
  });
  
  test('Será verificado se a mensagem correta é exibida', () => {
    const initialState = {
      player: {
        score: 0,
        assertions: 2,
      }
    }
    renderWithRouterAndRedux(<Feedback/>, initialState)
    const feedbackMessage = screen.getByTestId('feedback-text')
    expect(feedbackMessage).toBeInTheDocument();
    expect(feedbackMessage).toHaveTextContent('Could be better...')

  });
});