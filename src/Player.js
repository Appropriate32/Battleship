import Gameboard from "./Gameboard.js";

class Player {
  constructor(playerType) {
    this.board = new Gameboard();
    this.playerType = playerType;
  }

  attack(x, y, enemyBoard) {
    // For real player
    enemyBoard.receiveAttack(x, y);
  }

  randomAttack(enemyBoard) {} // For computer player
}

export default Player;
