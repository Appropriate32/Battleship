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
    this.currentTurn = "player-1";

    this.ui.setHandoff((x, y, currentTurn) => {
      this.playMove(x, y, currentTurn);
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

    this.ui.initializeGameUI(this.playerOne.board, this.playerTwo.board);
  }

  playMove(x, y, currentTurn) {
    if (currentTurn === "player-1" && currentTurn === this.currentTurn) {
      this.playerOne.attack(x, y, this.playerTwo.board);
      this.ui.renderBoard(this.ui.boardTwo, this.playerTwo.board);
      this.switchTurn();
      if (this.playerTwo.playerType === "computer") {
        setTimeout(() => {
          this.computerAttack();
        }, 1500);
        return;
      }
    } else if (
      currentTurn === "player-2" &&
      currentTurn === this.currentTurn &&
      this.playerTwo.playerType === "human"
    ) {
      this.playerTwo.attack(x, y, this.playerOne.board);
      this.ui.renderBoard(this.ui.boardOne, this.playerOne.board);
      this.switchTurn();
    }
  }

  switchTurn() {
    if (this.currentTurn === "player-1") this.currentTurn = "player-2";
    else this.currentTurn = "player-1";
  }

  computerAttack() {
    this.playerTwo.randomAttack(this.playerOne.board);
    this.ui.renderBoard(this.ui.boardOne, this.playerOne.board);
    this.switchTurn();
  }
}

const game = new GameController();
game.startGame();
