import "./styles.css";
import "nes.css/css/nes.min.css";

const boardOne = document.querySelector(".board-one");
const boardTwo = document.querySelector(".board-two");

for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("nes-pointer");
  cell.classList.add("board-cell");
  boardOne.appendChild(cell);
}

for (let i = 0; i < 100; i++) {
  const cell = document.createElement("div");
  cell.classList.add("nes-pointer");
  cell.classList.add("board-cell");
  boardTwo.appendChild(cell);
}
