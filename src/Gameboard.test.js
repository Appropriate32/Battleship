import Gameboard from "./Gameboard.js";
import Ship from "./Ship.js";

test("By default, there should be null ship at coordinates", () => {
  const board = new Gameboard();

  expect(board.grid[0][0]).toBe(null);
});

test("There should be a ship present at 0,0 coordinates", () => {
  const board = new Gameboard();

  board.placeShip(0, 0, 1);

  expect(board.grid[0][0]).toBeInstanceOf(Ship);
});

test("There should be a ship present at 3,2 coordinates", () => {
  const board = new Gameboard();

  board.placeShip(3, 2, 1);

  expect(board.grid[3][2]).toBeInstanceOf(Ship);
});

test("There should be a ship present of length 3 at 0,0 coordinates that takes up 1,0 and 2,0 aswell ", () => {
  const board = new Gameboard();

  board.placeShip(0, 0, 3);

  expect(board.grid[0][0]).toBeInstanceOf(Ship);
  expect(board.grid[1][0]).toBeInstanceOf(Ship);
  expect(board.grid[2][0]).toBeInstanceOf(Ship);
});

test("There should be a ship present of length 3 at 0,0 coordinates that takes up 1,0 and 2,0 aswell, but it should not take up 3,0 ", () => {
  const board = new Gameboard();

  board.placeShip(0, 0, 3);

  expect(board.grid[0][0]).toBeInstanceOf(Ship);
  expect(board.grid[1][0]).toBeInstanceOf(Ship);
  expect(board.grid[2][0]).toBeInstanceOf(Ship);
  expect(board.grid[3][0]).toBeNull();
});
