import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(x, y, length, direction) {
    const shipObj = new Ship(length);
    if (direction === "vertical") {
      if (y + (length - 1) > 9) {
        for (let i = 0; i < length; i++) {
          this.grid[x][y--] = shipObj;
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.grid[x][y++] = shipObj;
        }
      }

      return;
    }

    if (direction === "horizontal") {
      if (x + (length - 1) > 9) {
        for (let i = 0; i < length; i++) {
          this.grid[x--][y] = shipObj;
        }
      } else {
        for (let i = 0; i < length; i++) {
          this.grid[x++][y] = shipObj;
        }
      }
      return;
    }
  }

  receiveAttack(x, y) {
    if (this.grid[x][y] !== null) {
      this.grid[x][y].hit();
      return;
    }

    return [x, y];
  }
}

export default Gameboard;
