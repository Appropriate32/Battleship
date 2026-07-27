import Ship from "./Ship.js";

test("number of hits should be 1 after calling it", () => {
  const shipObj = new Ship(3);

  shipObj.hit();

  expect(shipObj.numberOfHits).toBe(1);
});

test("isSunk should be true after ship of length 3 is hit 3 times", () => {
  const shipObj = new Ship(3);

  shipObj.hit();
  shipObj.hit();
  shipObj.hit();

  expect(shipObj.isSunk()).toBe(true);
});
