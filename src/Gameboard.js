import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.pastAttacks = [];
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
    if (this.pastAttacks.includes(`${x},${y}`)) return;

    if (this.grid[x][y] !== null) {
      this.grid[x][y].hit();
      this.pastAttacks.push(`${x},${y}`);
      return;
    }

    this.grid[x][y] = "miss";
    this.pastAttacks.push(`${x},${y}`);
  }
}

export default Gameboard;
