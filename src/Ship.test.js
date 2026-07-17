import Ship from "./Ship";

test("number of hits should be 1 after calling it", () => {
  const shipObj = new Ship(3);

  shipObj.hit();

  expect(shipObj.numberOfHits).toBe(1);
});
