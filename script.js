const letters = "AABBCCDDEEFFGGHH".split("").sort(() => Math.random() - 0.5);
const grid = document.getElementById("gameGrid");
let firstCell = null;
let secondCell = null;
let lockBoard = false;
let matchedPairs = 0;

function createBoard() {
  grid.innerHTML = "";
  letters.forEach((letter) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.letter = letter;
    cell.addEventListener("click", handleClick);
    grid.appendChild(cell);
  });
}

function handleClick() {
  if (lockBoard || this === firstCell) return;

  this.style.backgroundColor = "yellow";
  this.textContent = this.dataset.letter;
  this.style.color = "black";

  if (!firstCell) {
    firstCell = this;
    return;
  }

  secondCell = this;
  lockBoard = true;

  if (firstCell.dataset.letter === secondCell.dataset.letter) {
    setTimeout(() => {
      firstCell.style.backgroundColor = "green";
      secondCell.style.backgroundColor = "green";
      setTimeout(() => {
        firstCell.style.backgroundColor = "gray";
        secondCell.style.backgroundColor = "gray";
        resetSelection();
        matchedPairs++;
        if (matchedPairs === letters.length / 2) {
          setTimeout(() => {
            alert("Поздравляем! Вы выиграли!");
            createBoard();
            matchedPairs = 0;
          }, 500);
        }
      }, 500);
    }, 500);
  } else {
    setTimeout(() => {
      firstCell.style.backgroundColor = "red";
      secondCell.style.backgroundColor = "red";
      setTimeout(() => {
        firstCell.style.backgroundColor = "blue";
        firstCell.textContent = "";
        secondCell.style.backgroundColor = "blue";
        secondCell.textContent = "";
        resetSelection();
      }, 500);
    }, 500);
  }
}

function resetSelection() {
  firstCell = null;
  secondCell = null;
  lockBoard = false;
}

createBoard();
