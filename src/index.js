import "./styles.css";
import "nes.css/css/nes.min.css";
import Gameboard from "./Game-Logic/Gameboard.js";
import Player from "./Game-Logic/Player.js";
import DOMControl from "./DOMControl.js";

class GameController {
  constructor() {
    this.playerOne = new Player("human");
    this.playerTwo = new Player("computer");
    this.ui = new DOMControl();

    this.ui.setHandoff((x, y) => {
      this.playMove(x, y);
    });
  }

  startGame() {
    this.playerOne.board.placeShip(4, 5, 3, "horizontal");
    this.playerOne.board.placeShip(0, 5, 3, "horizontal");
    this.playerOne.board.placeShip(6, 0, 3, "vertical");
    this.playerOne.board.placeShip(7, 0, 3, "vertical");
    this.playerOne.board.placeShip(2, 7, 3, "horizontal");

    this.playerTwo.board.placeShip(4, 5, 3, "horizontal");
    this.playerTwo.board.placeShip(0, 5, 3, "horizontal");
    this.playerTwo.board.placeShip(6, 0, 3, "vertical");
    this.playerTwo.board.placeShip(7, 0, 3, "vertical");
    this.playerTwo.board.placeShip(2, 7, 3, "horizontal");

    this.playerOne.attack(6, 6, this.playerTwo.board);

    this.ui.initializeGameUI(this.playerOne.board, this.playerTwo.board);
  }

  playMove(x, y) {
    this.playerTwo.board.grid[x][y] = "miss";
    this.ui.renderBoard(this.ui.boardTwo, this.playerTwo.board);
  }
}

const game = new GameController();
game.startGame();
