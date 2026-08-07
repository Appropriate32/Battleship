import "./styles.css";
import "nes.css/css/nes.min.css";
import Player from "./Game-Logic/Player.js";
import DOMControl from "./DOMControl.js";

class GameController {
  constructor() {
    this.playerOne = new Player("human");
    this.playerTwo = new Player("computer");
    this.ui = new DOMControl();
    this.currentTurn = "player-1";
    this.gameStartFlag = false;
    this.shipCountFour = { count: 0 };
    this.shipCountThree = { count: 0 };
    this.shipCountTwo = { count: 0 };
    this.shipCountOne = { count: 0 };

    this.ui.setHandoff((x, y, currentTurn) => {
      this.playMove(x, y, currentTurn);
    });

    this.ui.setShipPlaceHandoff(
      (length, orientation, x, y, board, displayBoard) => {
        this.setPlacement(length, orientation, x, y, board, displayBoard);
      },
    );

    this.ui.setPlayFlagHandoff(() => {
      this.setGameFlag();
    });

    this.ui.setShuffleHandoff((board, displayBoard) => {
      this.shufflePlacement(board, displayBoard);
    });
  }

  setGameFlag() {
    if (
      this.shipCountFour.count >= 2 &&
      this.shipCountThree.count >= 2 &&
      this.shipCountTwo.count >= 2 &&
      this.shipCountOne.count >= 2
    ) {
      this.gameStartFlag = true;
      this.ui.removeContainer();
      this.shufflePlacement(this.playerTwo.board);
      this.ui.removeButtons();

      if (this.ui.tabEnemy) this.ui.tabEnemy.click();
    }
  }

  startGame() {
    this.ui.initializeGameUI(this.playerOne.board, this.playerTwo.board);
  }

  setPlacement(length, orientation, x, y, board, displayBoard) {
    let result;
    try {
      if (length === 4) {
        result = this.shipPlace(
          this.shipCountFour,
          x,
          y,
          length,
          orientation,
          board,
          displayBoard,
        );
      } else if (length === 3) {
        result = this.shipPlace(
          this.shipCountThree,
          x,
          y,
          length,
          orientation,
          board,
          displayBoard,
        );
      } else if (length === 2) {
        result = this.shipPlace(
          this.shipCountTwo,
          x,
          y,
          length,
          orientation,
          board,
          displayBoard,
        );
      } else if (length === 1) {
        result = this.shipPlace(
          this.shipCountOne,
          x,
          y,
          length,
          orientation,
          board,
          displayBoard,
        );
      }

      return result;
    } catch (er) {
      console.log(er);
    }
  }

  shipPlace(shipCount, x, y, length, orientation, board, displayBoard) {
    let result = "";
    if (shipCount.count < 2) {
      result = board.placeShip(x, y, length, orientation);

      if (result !== "Ship already present") {
        if (displayBoard !== null) {
          this.ui.renderBoard(displayBoard, board);
        }

        shipCount.count++;
      }
    }

    return result;
  }

  playMove(x, y, currentTurn) {
    if (
      currentTurn === "player-1" &&
      currentTurn === this.currentTurn &&
      this.gameStartFlag
    ) {
      let result = this.playerOne.attack(x, y, this.playerTwo.board);
      if (result === "duplicate") return;
      this.ui.renderBoard(this.ui.boardTwo, this.playerTwo.board, true);
      this.checkWinner(this.playerOne, this.playerTwo);
      this.switchTurn();
      if (this.playerTwo.playerType === "computer") {
        setTimeout(() => {
          this.computerAttack();
          this.checkWinner(this.playerTwo, this.playerOne);
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
      this.checkWinner(this.playerTwo, this.playerOne);
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

  shufflePlacement(board, displayBoard = null) {
    board.resetBoard();

    this.shipCountFour.count = 0;
    this.shipCountThree.count = 0;
    this.shipCountTwo.count = 0;
    this.shipCountOne.count = 0;

    for (let shipNum = 4; shipNum > 0; shipNum--) {
      for (let i = 0; i < 2; i++) {
        let randomX = Math.floor(Math.random() * 10);
        let randomY = Math.floor(Math.random() * 10);
        let orientation;
        let orientationDecider = Math.round(Math.random());
        if (orientationDecider === 0) {
          orientation = "horizontal";
        } else if (orientationDecider === 1) {
          orientation = "vertical";
        }

        let result = this.setPlacement(
          shipNum,
          orientation,
          randomX,
          randomY,
          board,
          displayBoard,
        );
        while (result === "Ship already present") {
          randomX = Math.floor(Math.random() * 10);
          randomY = Math.floor(Math.random() * 10);
          orientationDecider = Math.round(Math.random());
          if (orientationDecider === 0) {
            orientation = "horizontal";
          } else if (orientationDecider === 1) {
            orientation = "vertical";
          }
          result = this.setPlacement(
            shipNum,
            orientation,
            randomX,
            randomY,
            board,
            displayBoard,
          );
        }
      }
    }
  }

  checkWinner(attacker, receiver) {
    console.log("Just entered checkWinner");
    if (receiver.board.checkAllSunk()) {
      console.log("All sunk is true!");
      this.ui.displayWinner(attacker.playerType);
    }
  }
}

const game = new GameController();
game.startGame();
