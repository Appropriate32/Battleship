import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

test("By default, there should be null ship at coordinates", () => {
  const board = new Gameboard();

  expect(board.grid[0][0]).toBe(null);
});

describe("placeShip method", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("There should be a ship present at 0,0 coordinates", () => {
    board.placeShip(0, 0, 1, "horizontal");

    expect(board.grid[0][0]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present at 3,2 coordinates", () => {
    board.placeShip(3, 2, 1, "horizontal");

    expect(board.grid[3][2]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 0,0 coordinates that takes up 1,0 and 2,0 aswell ", () => {
    board.placeShip(0, 0, 3, "horizontal");

    expect(board.grid[0][0]).toBeInstanceOf(Ship);
    expect(board.grid[1][0]).toBeInstanceOf(Ship);
    expect(board.grid[2][0]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 0,0 coordinates that takes up 1,0 and 2,0 aswell, but it should not take up 3,0 ", () => {
    board.placeShip(0, 0, 3, "horizontal");

    expect(board.grid[0][0]).toBeInstanceOf(Ship);
    expect(board.grid[1][0]).toBeInstanceOf(Ship);
    expect(board.grid[2][0]).toBeInstanceOf(Ship);
    expect(board.grid[3][0]).toBeNull();
  });

  test("There should be a ship present of length 3 at 0,0 coordinates that takes up 0,1 and 0,2 aswell ", () => {
    board.placeShip(0, 0, 3, "vertical");

    expect(board.grid[0][0]).toBeInstanceOf(Ship);
    expect(board.grid[0][1]).toBeInstanceOf(Ship);
    expect(board.grid[0][2]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 0,0 coordinates that takes up 0,1 and 0,2 aswell, but not at 0,3 ", () => {
    board.placeShip(0, 0, 3, "vertical");

    expect(board.grid[0][0]).toBeInstanceOf(Ship);
    expect(board.grid[0][1]).toBeInstanceOf(Ship);
    expect(board.grid[0][2]).toBeInstanceOf(Ship);
    expect(board.grid[0][3]).toBeNull();
  });

  test("There should be a ship present of length 3 at 9,0 coordinates that takes up 8,0 and 7,0 aswell", () => {
    board.placeShip(9, 0, 3, "horizontal");

    expect(board.grid[9][0]).toBeInstanceOf(Ship);
    expect(board.grid[8][0]).toBeInstanceOf(Ship);
    expect(board.grid[7][0]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 8,0 coordinates that takes up 7,0 and 6,0 aswell", () => {
    board.placeShip(8, 0, 3, "horizontal");

    expect(board.grid[8][0]).toBeInstanceOf(Ship);
    expect(board.grid[7][0]).toBeInstanceOf(Ship);
    expect(board.grid[6][0]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 0,9 coordinates that takes up 0,8 and 0,7 aswell", () => {
    board.placeShip(0, 9, 3, "vertical");

    expect(board.grid[0][9]).toBeInstanceOf(Ship);
    expect(board.grid[0][8]).toBeInstanceOf(Ship);
    expect(board.grid[0][7]).toBeInstanceOf(Ship);
  });

  test("There should be a ship present of length 3 at 0,8 coordinates that takes up 0,7 and 0,6 aswell", () => {
    board.placeShip(0, 8, 3, "vertical");

    expect(board.grid[0][8]).toBeInstanceOf(Ship);
    expect(board.grid[0][7]).toBeInstanceOf(Ship);
    expect(board.grid[0][6]).toBeInstanceOf(Ship);
  });

  test("Ship should not be able to be placed on an already occupied coordinate (horizontal)", () => {
    board.placeShip(0, 3, 3, "horizontal");
    expect(() => board.placeShip(1, 3, 3, "horizontal")).toThrow();
  });

  test("Ship should not be able to be placed on an already occupied coordinate (vertical)", () => {
    board.placeShip(0, 3, 3, "vertical");
    expect(() => board.placeShip(0, 4, 3, "vertical")).toThrow();
  });
});

describe("receiveAttack method", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
    board.placeShip(0, 0, 3, "horizontal");
  });

  test("ship should be hit and its number of hits should increase by 1", () => {
    board.receiveAttack(0, 0);

    expect(board.grid[0][0].numberOfHits).toBe(1);
  });

  test("ship should be hit twice in the same place and its number of hits should only increase by 1", () => {
    board.receiveAttack(0, 0);
    board.receiveAttack(0, 0);

    expect(board.grid[0][0].numberOfHits).toBe(1);
  });

  test("same ship should be hit twice in two different coordinates and its number of hits should increase by 2", () => {
    board.receiveAttack(0, 0);
    board.receiveAttack(1, 0);

    expect(board.grid[0][0].numberOfHits).toBe(2);
  });

  test("attack should miss on 5, 4 and missed coordinates recorded 5, 4", () => {
    board.receiveAttack(5, 4);

    expect(board.grid[5][4]).toBe("miss");
  });
});

describe("checkAllSunk method", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  test("no ship has sunk, should return false", () => {
    board.placeShip(0, 1, 3, "horizontal");
    expect(board.checkAllSunk()).toBe(false);
  });

  test("one ship on the board which has sunk, should return true", () => {
    board.placeShip(0, 2, 3, "horizontal");
    board.receiveAttack(0, 2);
    board.receiveAttack(1, 2);
    board.receiveAttack(2, 2);

    expect(board.checkAllSunk()).toBe(true);
  });

  test("no ships, should throw an error", () => {
    expect(() => board.checkAllSunk()).toThrow();
  });
});
