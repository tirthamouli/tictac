import TicTacToe from '../lib/TicTacToe';
import TicTacToeAI from '../lib/TicTacToeAI';
import { getRandomItemFromSet } from '../util';

class TicTacToeGame extends TicTacToe {
  /**
   * Defines the table UI
   *
   * @type {HTMLDivElement}
   */
  $el;

  /**
   * The tic tac toe AI which will be used in the game
   */
  ticTacToeAI = new TicTacToeAI();

  /**
   * The player that the user selected
   *
   * @type {1 | 2}
   */
  userPlayer;

  /**
   * The current games status
   *
   * @type {'WIN' | 'LOST' | 'DRAW' | undefined}
   */
  gameStatus;

  /**
   * An end state callback
   *
   * @type {(message: 'Won' | 'Lost' | 'Draw') => void}
   */
  endStateCB;

  /**
   * Construct a new Tic Tac Toe Game
   *
   * @param {1 | 2} userPlayer
   */
  constructor() {
    super();
    this.userPlayer = 1;
    this.ticTacToeAI.trainWithCurrentBoard();
  }

  /**
   * Set the text as X inside the button
   *
   * @param {Element} btn
   */
  static setX = (btn) => {
    btn.classList.add('first');
    btn.innerHTML = 'X';
  };

  /**
   * Set the text as X inside the button
   *
   * @param {Element} btn
   */
  static setO = (btn) => {
    btn.classList.add('second');
    btn.innerHTML = 'O';
  };

  /**
   * Set the text inside as empty
   *
   * @param {Element} btn
   */
  static setEmpty = (btn) => {
    btn.className = '';
    btn.innerHTML = '';
  };

  /**
   * Check the board and set
   *
   * @param {number} row
   * @param {number} col
   * @returns {boolean} Weather successfully able to set
   */
  checkAndSet = (row, col) => {
    if (this.board[row][col]) {
      return false; // Already filled
    }

    // Update the UI
    const btn = this.$el.querySelector(`#btn-${row}-${col}`);
    if (this.currentPlayer === 1) {
      TicTacToeGame.setX(btn);
    } else {
      TicTacToeGame.setO(btn);
    }

    // Update the board
    this.set(row, col);

    // Played
    return true;
  };

  /**
   * Check if an end state of the game has been reached
   *
   * @param {number} row
   * @param {number} col
   * @returns {boolean}
   */
  checkReachedEndState = (row, col) => {
    // Check if won
    const won = this.checkIfWon(row, col);
    if (won) {
      if (this.currentPlayer === this.userPlayer) {
        this.endStateCB?.('Lost');
      } else {
        // Should never reach here :P
        this.endStateCB?.('Won');
      }
      return true;
    }

    // Check if draw
    const draw = this.checkIfCompleted();
    if (draw) {
      this.endStateCB?.('Draw');
      return true;
    }

    // Hasn't reached end state
    return false;
  };

  /**
   * Resets the current game and start a new game
   */
  resetAndStart = () => {
    // Reset board and UI
    for (let i = 0; i < this.board.length; i += 1) {
      for (let j = 0; j < this.board[i].length; j += 1) {
        // Unset from board
        this.board[i][j] = '';

        // Unset from button
        const btn = this.$el.querySelector(`#btn-${i}-${j}`);
        TicTacToeGame.setEmpty(btn);

        // Reset current player
        this.currentPlayer = 1;
      }
    }

    // Start the new game
    this.start();
  };

  /**
   * Switch the user player
   */
  switchPlayer = () => {
    this.userPlayer = this.userPlayer === 1 ? 2 : 1;
    this.resetAndStart();
  };

  /**
   * Handle user input for the given row, col and button
   *
   * @param {number} row
   * @param {number} col
   */
  handleInput = (row, col) => {
    // Handle input and check if was able to play
    const played = this.checkAndSet(row, col);
    if (!played) {
      return;
    }

    // Check if an end state has been reached
    const endStateReached = this.checkReachedEndState(row, col);
    if (endStateReached) {
      return;
    }

    // Play AI turn
    this.playAITurn();
  };

  /**
   * Register a callback for when the end state is reached
   *
   * @param {(message: 'Won' | 'Lost' | 'Draw') => void} endStateCB
   */
  onEndState = (endStateCB) => {
    this.endStateCB = endStateCB;
  };

  /**
   * Render the table with required event handlers
   */
  render = () => {
    const table = document.createElement('div');
    table.className = 'tictac';

    for (let i = 0; i < 3; i += 1) {
      const row = document.createElement('div');
      row.className = 'row';

      for (let j = 0; j < 3; j += 1) {
        // Create cell
        const cell = document.createElement('div');
        cell.className = `cell cell-${i}-${j}`;

        // Create button and add event listener
        const btn = document.createElement('button');
        btn.id = `btn-${i}-${j}`;

        btn.addEventListener('click', () => this.handleInput(i, j, btn));

        // Append button and cell
        cell.appendChild(btn);
        row.appendChild(cell);
      }

      table.appendChild(row);
    }

    this.$el = table;
    return table;
  };

  /**
   * Choose 1 move from the allowed set of moves
   *
   * @param {Set<string>} allowedMoves
   */
  chooseMove(allowedMoves) {
    // Get a random move
    const [row, col] = getRandomItemFromSet(allowedMoves).split('-');

    // Check and set
    this.checkAndSet(row, col);

    // Check if end state has been reached
    this.checkReachedEndState(row, col);
  }

  /**
   * Play the AI turn
   */
  playAITurn = () => {
    const flattenedBoard = this.getFlattenedBoard();
    const allowedMovesForCurrentBoard = this.ticTacToeAI.allowedMoves.get(
      flattenedBoard,
    );

    // Shouldn't reach here. Check if allowed moves exists
    if (!allowedMovesForCurrentBoard) {
      throw new Error('AI not trained for this move');
    }

    // Check if ai can win
    if (allowedMovesForCurrentBoard.has('WON')) {
      // Choose from winning move
      this.chooseMove(allowedMovesForCurrentBoard.get('WON'));
      return;
    }

    // Check if ai can draw
    if (allowedMovesForCurrentBoard.has('DRAW')) {
      // Choose move from draw
      this.chooseMove(allowedMovesForCurrentBoard.get('DRAW'));
      return;
    }

    // Shouldn't reach here
    throw new Error('AI not trained for this move');
  };

  /**
   * Start the current game
   */
  start = () => {
    if (this.userPlayer === 2) {
      this.playAITurn();
    }
  };
}

export default TicTacToeGame;
