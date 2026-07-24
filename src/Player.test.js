import Player from "./Player.js";
import Gameboard from "./Gameboard.js";

describe("attack method", () => {
  let player1;
  let enemyBoard;

  beforeEach(() => {
    player1 = new Player("human");
    enemyBoard = new Gameboard();
  });

  test("attack should hit and increase numberOfHits of (0,0) by 1", () => {
    enemyBoard.placeShip(0, 0, 3, "horizontal");
    player1.attack(0, 0, enemyBoard);
    expect(enemyBoard.grid[0][0].numberOfHits).toBe(1);
  });

  test("attack should hit and increase numberOfHits of (0,0) and (1, 0) by 2", () => {
    enemyBoard.placeShip(0, 0, 3, "horizontal");
    player1.attack(0, 0, enemyBoard);
    player1.attack(1, 0, enemyBoard);
    expect(enemyBoard.grid[0][0].numberOfHits).toBe(2);
  });
});
