import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.pastAttacks = [];
    this.shipList = [];
  }

  placeShip(x, y, length, direction) {
    const shipObj = new Ship(length);
    let tempY = y;
    let tempX = x;

    if (direction === "vertical") {
      if (y + (length - 1) > 9) {
        for (let i = 0; i < length; i++) {
          if (this.grid[x][tempY--] !== null)
            throw new Error("Ship already present");
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (this.grid[x][tempY++] !== null)
            throw new Error("Ship already present");
        }
      }
    }

    if (direction === "horizontal") {
      if (x + (length - 1) > 9) {
        for (let i = 0; i < length; i++) {
          if (this.grid[tempX--][y] !== null)
            throw new Error("Ship already present");
        }
      } else {
        for (let i = 0; i < length; i++) {
          if (this.grid[tempX++][y] !== null)
            throw new Error("Ship already present");
        }
      }
    }

    if (direction === null) {
      throw new Error("no direction provided");
    }

    this.shipList.push(shipObj);
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
    if (this.pastAttacks.includes(`${x},${y}`)) return "duplicate";

    if (this.grid[x][y] !== null) {
      this.grid[x][y].hit();
      this.pastAttacks.push(`${x},${y}`);
      this.grid[x][y] = "attacked";
      return;
    }

    this.grid[x][y] = "miss";
    this.pastAttacks.push(`${x},${y}`);
  }

  checkAllSunk() {
    let tempList = this.shipList;

    if (tempList.length <= 0) throw new Error("No ships");

    for (const ship of tempList) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}

let board = new Gameboard();

export default Gameboard;
