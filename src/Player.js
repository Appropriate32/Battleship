import Gameboard from "./Gameboard.js";

class Player {
  constructor(playerType) {
    this.board = new Gameboard();
    this.playerType = playerType;
  }
}

export default Player;
