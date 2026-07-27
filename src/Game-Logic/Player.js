import Gameboard from "./Gameboard.js";

class Player {
  constructor(playerType) {
    this.board = new Gameboard();
    this.playerType = playerType;
  }

  attack(x, y, enemyBoard) {
    // For real player
    let result = enemyBoard.receiveAttack(x, y);
    return result;
  }

  randomAttack(enemyBoard) {
    // For computer player
    let duplicate = "duplicate";

    while (duplicate === "duplicate") {
      let randomOne = Math.floor(Math.random() * 10);
      let randomTwo = Math.floor(Math.random() * 10);

      duplicate = enemyBoard.receiveAttack(randomOne, randomTwo);
    }
  }
}

export default Player;
