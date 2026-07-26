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

  test("attack should hit and increase numberOfHits of (0,0) and (1, 0) and (2, 0) by 3", () => {
    enemyBoard.placeShip(0, 0, 3, "horizontal");
    player1.attack(0, 0, enemyBoard);
    player1.attack(1, 0, enemyBoard);
    player1.attack(2, 0, enemyBoard);
    expect(enemyBoard.grid[0][0].numberOfHits).toBe(3);
  });

  test("attack should hit empty coordinates of (3,4) and that value should become 'miss' ", () => {
    player1.attack(3, 4, enemyBoard);
    expect(enemyBoard.grid[3][4]).toBe("miss");
  });

  test("attack should not repeat on (3,4)", () => {
    enemyBoard.placeShip(3, 4, 3, "horizontal");
    player1.attack(3, 4, enemyBoard);
    expect(player1.attack(3, 4, enemyBoard)).toBe("duplicate");
  });
});

describe("randomAttack method", () => {
  let player1;
  let enemyBoard;

  beforeEach(() => {
    player1 = new Player("human");
    enemyBoard = new Gameboard();
  });

  test("attack should randomly hit a single coordinate", () => {
    enemyBoard.placeShip(3, 5, 3, "horizontal");
    player1.randomAttack(enemyBoard);

    expect(enemyBoard.pastAttacks.length).toBe(1);
  });

  test("attack should randomly hit two coordinates", () => {
    player1.randomAttack(enemyBoard);
    player1.randomAttack(enemyBoard);

    expect(enemyBoard.pastAttacks.length).toBe(2);
  });

  test("computer should handle duplicate random attacks", () => {
    enemyBoard.placeShip(3, 5, 3, "horizontal");
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.1)
      .mockReturnValueOnce(0.1);

    player1.randomAttack(enemyBoard);
    player1.randomAttack(enemyBoard);

    expect(enemyBoard.pastAttacks.length).toBe(2);
  });
});
