import Ship from "./Ship.js";

class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
  }

  placeShip(x, y, length) {}
}
