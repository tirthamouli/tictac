import TicTacToeGame from './components/TicTacToeGame';
import './styles/index.css';

window.onload = () => {
  // Render the tic tac toe board
  const ticTacToeGame = new TicTacToeGame();
  const board = ticTacToeGame.render();
  document.querySelector('#app').append(board);

  // Handle end events
  const status = document.querySelector('#status');
  ticTacToeGame.onEndState((message) => {
    status.innerHTML = message;
    status.classList.add('status-show');
    status.classList.add(`status-${message.toLowerCase()}`);
  });

  // Add listeners to buttons
  document.querySelector('#reset-btn').addEventListener('click', () => {
    ticTacToeGame.resetAndStart();
    status.className = 'status';
  });
  document.querySelector('#switch-btn').addEventListener('click', () => {
    ticTacToeGame.switchPlayer();
    status.className = 'status';
  });

  // Start game
  ticTacToeGame.start();
};
