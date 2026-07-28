class DOMControl {
  constructor() {
    this.boardOne = document.querySelector(".board-one");
    this.boardTwo = document.querySelector(".board-two");
    this.playButton = document.querySelector(".play-btn");

    this.gameboardOne = null;
    this.gameboardTwo = null;

    this.onCellClicked = null;

    this.playButton.addEventListener("click", () => {
      if (this.gameboardOne && this.gameboardTwo) {
        this.renderBoard(this.boardOne, this.gameboardOne);
        this.renderBoard(this.boardTwo, this.gameboardTwo);
      }
    });

    this.boardTwo.addEventListener("click", (e) => {
      if (e.target.classList.contains("board-cell")) {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;

        if (this.onCellClicked) {
          this.onCellClicked(x, y);
        }
      }
    });
  }

  renderBoard(board, gameBoard) {
    board.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("nes-pointer", "board-cell");

      const x = i % 10;
      const y = Math.floor(i / 10);

      cell.dataset.x = x;
      cell.dataset.y = y;

      const cellData = gameBoard.grid[x][y];

      if (cellData && cellData.hit) {
        cell.classList.add("ship");
      } else if (cellData === "miss") {
        cell.classList.add("miss");
        cell.textContent = "X";
      }
      board.appendChild(cell);
    }
  }

  initializeGameUI(gameboardOne, gameboardTwo) {
    this.gameboardOne = gameboardOne;
    this.gameboardTwo = gameboardTwo;
  }

  setHandoff(callback) {
    this.onCellClicked = callback;
  }
}

export default DOMControl;
