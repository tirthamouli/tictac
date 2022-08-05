import TicTacToe from './TicTacToe';

/**
 * Defines a Tic Tac Toe AI
 */
class TicTacToeAI extends TicTacToe {
  /**
   * Allowed set of moves
   *
   * @type {Map< string, Map< string, Set<string> > >}
   */
  allowedMoves = new Map();

  /**
   * Set the allowed move for the given board with the status + row & column
   *
   * @param {number} row
   * @param {number} col
   * @param {'WON' | 'LOST' | 'DRAW'} status
   */
  setAllowedMove = (row, col, status) => {
    const flattenedBoard = this.getFlattenedBoard();
    const key = `${row}-${col}`;

    const allowedMovesForCurrentBoard = this.allowedMoves.get(flattenedBoard) || new Map();
    const allowedMovesForCurrentBoardWithStatus = allowedMovesForCurrentBoard.get(status)
      || new Set();
    allowedMovesForCurrentBoardWithStatus.add(key);

    allowedMovesForCurrentBoard.set(status, allowedMovesForCurrentBoardWithStatus);
    this.allowedMoves.set(flattenedBoard, allowedMovesForCurrentBoard);
  };

  /**
   * Train the ai for the current board
   * And find the next possible set of moves for this configuration
   *
   * @returns {'WON' | 'LOST' | 'DRAW'}
   */
  trainWithCurrentBoard = () => {
    // Status set for keeping track of all the status
    // that has been encountered for the current board configuration
    const statusSet = new Set();

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        if (!this.board[i][j]) {
          // Play the current move
          this.set(i, j);

          // Check if user can win with the current move
          const status = this.checkIfWon(i, j);
          if (status) {
            this.unset(i, j);
            this.setAllowedMove(i, j, 'WON');
            return 'WON';
          }

          // Check the status of the next player with the current move
          const nextStatus = this.trainWithCurrentBoard();
          this.unset(i, j);

          if (nextStatus === 'WON') {
            // Incorrect move
            this.setAllowedMove(i, j, 'LOST');
            statusSet.add('LOST');
          } else if (nextStatus === 'LOST') {
            // One of the correct moves
            this.setAllowedMove(i, j, 'WON');
            statusSet.add('WON');
          } else {
            // Draw
            this.setAllowedMove(i, j, 'DRAW');
            statusSet.add('DRAW');
          }
        }
      }
    }

    // Check if the player is able to win any game with the current board configuration
    // If the player is able to win any game, we can say that player wins from this configuration
    if (statusSet.has('WON')) {
      return 'WON';
    }

    // If the player is not able to win, check if the player is able to reach draw.
    // Draw means either did not lose or all moves were exhausted
    if (!statusSet.has('LOST') || statusSet.has('DRAW')) {
      return 'DRAW';
    }

    // Default return lost if not able to win or draw
    return 'LOST';
  };
}

export default TicTacToeAI;
