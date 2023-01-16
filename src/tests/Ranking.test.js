import { screen, waitFor } from "@testing-library/react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";

import userEvent from "@testing-library/user-event";

import Ranking from "../pages/Ranking";
import App from "../App";


const player= [{
avatar: "https://www.gravatar.com/avatar/de5d900acad584235e22373bbbae4c86",
email: "danielmoraisdeoliveira1993@gmail.com",
score: 0,
username: "Neymar",

},
{
  avatar: "https://www.gravatar.com/avatar/de5d900acad584235e22373bbbae4c86",
email: "danielmoraisdeoliveira1993@gmail.com",
score: 128,
username: "peixe-pangolim",
} 
]

localStorage.setItem('players', JSON.stringify(player))



describe('Testando o componente Feedbacks', () => {



  test('Verificar se os elementos são renderizados', () => {
renderWithRouterAndRedux(<Ranking/>);
const ranking = screen.getByRole('heading', {
  name: /ranking/i
})
expect(ranking).toBeInTheDocument();
const playAgain = screen.getByRole('button', {
  name: /jogar novamente/i
})
expect(playAgain).toBeInTheDocument();
const score1 = screen.getByTestId("player-score-0");
const score2 = screen.getByTestId("player-score-1");
expect(score1).toBeInTheDocument();
expect(score2).toBeInTheDocument()
const name1 = screen.getByTestId('player-name-0');
const name2 = screen.getByTestId('player-score-1');
expect(name1).toBeInTheDocument();
expect(name2).toBeInTheDocument();
const image1 = screen.getByAltText("Neymar");
const image2 = screen.getByAltText("peixe-pangolim");
expect(image1).toBeInTheDocument();
expect(image2).toBeInTheDocument();

  }); 

it('botao redireciona para a tela inicial',()=>{
  const initialState = {
    player: {
        score: 100,
        assertions: 3,
    }
  } 

  const { history } = renderWithRouterAndRedux(<App />,initialState,'/ranking');
  const playAgain = screen.getByRole('button', {  name: /jogar novamente/i});
  userEvent.click(playAgain);
  const{pathname}= history.location;
  expect(pathname).toBe('/');
})



});