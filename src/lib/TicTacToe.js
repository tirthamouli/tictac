/**
 * Defines all the Tic Tac Toe Rules
 */
class TicTacToe {
  /**
   * Defines the current player element
   */
  currentPlayer = 1;

  /**
   * Defines a tic tac toe board
   */
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  /**
   * Get the flattened board
   *
   * @returns {string}
   */
  getFlattenedBoard = () => JSON.stringify(this.board);

  /**
   * Check if the board has been completely filled up
   *
   * @returns {boolean}
   */
  checkIfCompleted = () => {
    let totalFilled = 0;
    for (let i = 0; i < this.board.length; i += 1) {
      for (let j = 0; j < this.board.length; j += 1) {
        totalFilled += this.board[i][j] ? 1 : 0;
      }
    }
    return totalFilled === 9;
  };

  /**
   * Given the row and col of the inserted position, check if won
   *
   * @param {number} row
   * @param {number} col
   * @returns {bool}
   */
  checkIfWon = (row, col) => {
    // Row check
    if (
      this.board[row][0]
      && this.board[row][0] === this.board[row][1]
      && this.board[row][1] === this.board[row][2]
    ) {
      return true;
    }

    // Col check
    if (
      this.board[0][col]
      && this.board[0][col] === this.board[1][col]
      && this.board[1][col] === this.board[2][col]
    ) {
      return true;
    }

    // Check diagonals straight
    if (
      this.board[0][0]
      && this.board[0][0] === this.board[1][1]
      && this.board[1][1] === this.board[2][2]
    ) {
      return true;
    }

    // Check diagonal reverse
    if (
      this.board[0][2]
      && this.board[0][2] === this.board[1][1]
      && this.board[1][1] === this.board[2][0]
    ) {
      return true;
    }

    // Default
    return false;
  };

  /**
   * Set the row and column with X or O.
   * If set, update the current player
   *
   * @param {number} row
   * @param {number} col
   * @returns {bool}
   */
  set = (row, col) => {
    // Set the value in the board
    this.board[row][col] = this.currentPlayer === 1 ? 'X' : 'O';
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  };

  /**
   * Unset the current element from the board
   * If unset, update the current player
   *
   * @param {number} row
   * @param {number} col
   */
  unset = (row, col) => {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
    this.board[row][col] = '';
  };
}

export default TicTacToe;
