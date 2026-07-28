import "./styles.css";
import "nes.css/css/nes.min.css";
import Gameboard from "./Game-Logic/Gameboard.js";
import Player from "./Game-Logic/Player.js";

class DOMControl {
  constructor() {
    this.boardOne = document.querySelector(".board-one");
    this.boardTwo = document.querySelector(".board-two");
  }

  renderBoard(board) {
    board.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("nes-pointer", "board-cell");

      const x = i % 10;
      const y = Math.floor(i / 10);

      cell.dataset.x = x;
      cell.dataset.y = y;

      board.appendChild(cell);
    }
  }

  initializeGameUI() {
    this.renderBoard(this.boardOne);
    this.renderBoard(this.boardTwo);
  }
}

const dom = new DOMControl();
dom.initializeGameUI();
