class DOMControl {
  constructor() {
    this.boardOne = document.querySelector(".board-one");
    this.boardTwo = document.querySelector(".board-two");
    this.playButton = document.querySelector(".play-btn");
    this.placeButton = document.querySelector(".place-btn");
    this.innerContainers = document.querySelectorAll(".inner-container");
    this.spanOptions = document.querySelectorAll(".span-option");
    this.alreadyClickedContainers = [];
    this.alreadyClickedSpans = [];
    this.selectedOrientation = null;
    this.selectedLength = null;

    this.gameboardOne = null;
    this.gameboardTwo = null;

    this.onCellClicked = null;
    this.onShipPlace = null;
    this.onPlayClicked = null;

    this.spanOptions.forEach((spanOption) => {
      spanOption.addEventListener("click", () => {
        if (this.alreadyClickedSpans.length > 0) {
          this.alreadyClickedSpans.forEach((clickedSpan) => {
            clickedSpan.classList.remove("clicked");
          });
        }

        spanOption.classList.add("clicked");
        if (spanOption.classList.contains("horizontal")) {
          this.selectedOrientation = "horizontal";
        } else if (spanOption.classList.contains("vertical")) {
          this.selectedOrientation = "vertical";
        }

        this.alreadyClickedSpans.push(spanOption);
      });
    });

    this.innerContainers.forEach((innerContainer) => {
      innerContainer.addEventListener("click", () => {
        if (this.alreadyClickedContainers.length > 0) {
          this.alreadyClickedContainers.forEach((clickedContainer) => {
            clickedContainer.classList.remove("clicked");
          });
        }

        innerContainer.classList.add("clicked");
        if (innerContainer.classList.contains("4")) this.selectedLength = 4;
        else if (innerContainer.classList.contains("3"))
          this.selectedLength = 3;
        else if (innerContainer.classList.contains("2"))
          this.selectedLength = 2;
        else if (innerContainer.classList.contains("1"))
          this.selectedLength = 1;
        this.alreadyClickedContainers.push(innerContainer);
      });
    });

    this.playButton.addEventListener("click", () => {
      if (this.gameboardOne && this.gameboardTwo) {
        if (this.onPlayClicked) this.onPlayClicked();
      }
    });

    this.boardTwo.addEventListener("click", (e) => {
      if (e.target.classList.contains("board-cell")) {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;

        if (this.onCellClicked) {
          this.onCellClicked(x, y, "player-1");
        }
      }
    });

    this.boardOne.addEventListener("click", (e) => {
      if (e.target.classList.contains("board-cell")) {
        const x = e.target.dataset.x;
        const y = e.target.dataset.y;

        if (this.onCellClicked) {
          this.onCellClicked(x, y, "player-2");
        }

        if (this.onShipPlace) {
          this.onShipPlace(this.selectedLength, this.selectedOrientation, x, y);
        }
      }
    });
  }

  firstRender(board) {
    board.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("nes-pointer", "board-cell");

      const x = i % 10;
      const y = 9 - Math.floor(i / 10);

      cell.dataset.x = x;
      cell.dataset.y = y;

      board.appendChild(cell);
    }
  }

  renderBoard(board, gameBoard) {
    board.innerHTML = "";
    for (let i = 0; i < 100; i++) {
      const cell = document.createElement("div");
      cell.classList.add("nes-pointer", "board-cell");

      const x = i % 10;
      const y = 9 - Math.floor(i / 10);

      cell.dataset.x = x;
      cell.dataset.y = y;

      const cellData = gameBoard.grid[x][y];

      if (cellData && cellData.hit) {
        cell.classList.add("ship");
      } else if (cellData === "miss") {
        cell.classList.add("miss");
        cell.textContent = "X";
      } else if (cellData === "attacked") {
        cell.classList.add("sunk");
      }
      board.appendChild(cell);
    }
  }

  initializeGameUI(gameboardOne, gameboardTwo) {
    this.gameboardOne = gameboardOne;
    this.gameboardTwo = gameboardTwo;
    this.firstRender(this.boardOne);
    this.firstRender(this.boardTwo);
  }

  setHandoff(callback) {
    this.onCellClicked = callback;
  }

  setShipPlaceHandoff(callback) {
    this.onShipPlace = callback;
  }

  setPlayFlagHandoff(callback) {
    this.onPlayClicked = callback;
  }
}

export default DOMControl;
