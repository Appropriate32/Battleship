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
    this.gameStartFlag = false;

    this.ui.setHandoff((x, y, currentTurn) => {
      this.playMove(x, y, currentTurn);
    });

    this.ui.setShipPlaceHandoff((length, orientation, x, y) => {
      this.setPlacement(length, orientation, x, y);
    });

    this.ui.setPlayFlagHandoff(() => {
      this.setGameFlag();
    });
  }

  setGameFlag() {
    this.gameStartFlag = true;
  }

  startGame() {
    this.ui.initializeGameUI(this.playerOne.board, this.playerTwo.board);
  }

  setPlacement(length, orientation, x, y) {
    try {
      this.playerOne.board.placeShip(x, y, length, orientation);
      this.ui.renderBoard(this.ui.boardOne, this.playerOne.board);
    } catch (er) {
      console.log(er);
    }
  }

  playMove(x, y, currentTurn) {
    if (
      currentTurn === "player-1" &&
      currentTurn === this.currentTurn &&
      this.gameStartFlag
    ) {
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
