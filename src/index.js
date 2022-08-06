import TicTacToeGame from './components/TicTacToeGame';
import './styles/index.css';

window.onload = () => {
  // Add the table and start the game
  const ticTacToeGame = new TicTacToeGame();
  const table = ticTacToeGame.render();
  document.querySelector('#app').appendChild(table);
  ticTacToeGame.start();

  // Add listeners to buttons
  document.querySelector('#reset-btn').addEventListener('click', ticTacToeGame.resetAndStart);
  document.querySelector('#switch-btn').addEventListener('click', ticTacToeGame.switchPlayer);
};
