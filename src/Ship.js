class Ship {
  constructor() {
    this.length = 0;
    this.numberOfHits = 0;
    this.hasSunk = false;
  }

  hit() {
    this.numberOfHits++;
  }

  isSunk() {
    if (this.numberOfHits >= this.length) {
      this.hasSunk = true;
    }
  }
}

export default Ship;
