`use strict`;

// SELECTING ELEMENTS
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const name0El = document.querySelector(`.name--0`);
const name1El = document.querySelector(`.name--1`);
const scoreLabel0El = document.querySelector(".score-label--0");
const scoreLabel1El = document.querySelector(".score-label--1");
const score0El = document.getElementById("score--0");
const score1El = document.getElementById("score--1");

const diceEl = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const lettersEl = document.querySelector(".letters");
const inputContainerEl = document.querySelector(".input-container");
const inputEl = document.querySelector(".input");
const letterEl = document.querySelectorAll(".letter");

// STARTING CONDITION
let scores = [0, 0];
let activePlayer = 0;
let randomWord = "";
let guessedLetters = [];
let displayedLetters = [];

diceEl.classList.add("hidden");
lettersEl.classList.add("hidden");
inputContainerEl.classList.add("hidden");
score0El.textContent = scores[0];
score1El.textContent = scores[1];
player0El.classList.add("player--active");
player1El.classList.remove("player--active");
for (let i = 0; i < letterEl.length; i++) {
  letterEl[i].textContent = "?";
}

const words = [
  "table",
  "chair",
  "light",
  "plant",
  "apple",
  "bread",
  "clock",
  "phone",
  "mouse",
  "brush",
  "spoon",
  "plate",
  "frame",
  "radio",
  "cable",
  "truck",
  "train",
  "snake",
  "tiger",
  "zebra",
  "eagle",
  "shark",
  "whale",
  "horse",
  "sheep",
  "camel",
  "berry",
  "mango",
  "lemon",
  "grape",
  "peach",
  "wheat",
  "sugar",
  "honey",
  "curry",
  "sauce",
  "cloth",
  "dress",
  "shirt",
  "shoes",
  "boots",
  "straw",
  "bloom",
  "tulip",
  "daisy",
  "lotus",
  "olive",
  "basil",
  "minty",
  "onion",
  "bagel",
  "toast",
  "pizza",
  "steak",
  "torch",
  "house",
  "towel",
  "basin",
  "soapy",
  "glass",
  "metal",
  "brick",
  "paint",
  "ruler",
  "knife",
  "blade",
  "arrow",
  "sweet",
  "spice",
  "syrup",
  "cocoa",
  "pasta",
  "donut",
  "latte",
  "crown",
  "heart",
  "music",
  "notes",
  "sound",
  "laser",
  "motor",
  "screw",
  "drill",
  "wheel",
  "chain",
  "beach",
  "river",
  "world",
  "flame",
  "stone",
  "paper",
  "lemon",
  "candy",
  "plant",
  "earth",
  "flora",
  "fruit",
  "veins",
  "cloud",
  "grass",
];

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

const getRandomWord = function () {
  return words[Math.trunc(Math.random() * 100)];
};

const enterGameState = function () {
  btnRoll.classList.add("hidden");
  diceEl.classList.add("hidden");
  inputContainerEl.classList.remove("hidden");
  lettersEl.classList.remove("hidden");
  randomWord = getRandomWord();
  console.log(randomWord);
  scores = [0, 0];
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
};

const finishDicePhase = function () {
  btnRoll.classList.add("hidden");
  setTimeout(() => {
    enterGameState();
  }, 1500);
};

// DICE-BASED TURN SELECTION
btnRoll.addEventListener("click", function () {
  let randomNum = Math.trunc(Math.random() * 6) + 1;

  scores[activePlayer] = randomNum;
  document.getElementById(`score--${activePlayer}`).textContent = randomNum;
  diceEl.src = `./images/dice-${randomNum}.png`;

  diceEl.classList.remove("hidden");
  switchPlayer();

  if (scores[0] !== 0 && scores[1] !== 0) {
    if (scores[0] > scores[1]) {
      activePlayer = 0;
      player0El.classList.add("player--active");
      player1El.classList.remove("player--active");
      finishDicePhase();
    } else if (scores[0] < scores[1]) {
      activePlayer = 1;
      player0El.classList.remove("player--active");
      player1El.classList.add("player--active");
      finishDicePhase();
    } else {
      scores[0] = 0;
      scores[1] = 0;
    }
  }
});

// GAME LOGIC
inputEl.addEventListener("keydown", function (e) {
  let correctAnswers = 0;

  if (e.key === "Enter") {
    for (let i = 0; i < randomWord.length; i++) {
      //CHECK GUESSED LETTER
      if (
        randomWord[i] === inputEl.value.toLowerCase() &&
        guessedLetters.indexOf(inputEl.value.toLowerCase()) === -1
      ) {
        // SHOW LETTER AND UPDATE SCORE
        document.querySelector(`.letter--${i}`).textContent = randomWord[i];
        document.querySelector(`.letter--${i}`).style.backgroundColor =
          "#2ECC71";
        scores[activePlayer] += 5;
        document.getElementById(`score--${activePlayer}`).textContent =
          `${scores[activePlayer]}`;
        correctAnswers += 1;
        displayedLetters.push(inputEl.value.toLowerCase());
      }
    }

    guessedLetters.push(inputEl.value.toLowerCase());

    if (!correctAnswers) switchPlayer();
    inputEl.value = "";

    // RESET FOR NEW WORD
    if (displayedLetters.length === randomWord.length) {
      randomWord = getRandomWord();
      for (let i = 0; i < letterEl.length; i++) {
        letterEl[i].textContent = "?";
        letterEl[i].style.backgroundColor = "#f7f7f7";
        guessedLetters = [];
        displayedLetters = [];
      }
      console.log(randomWord);
    }

    // CHECK AND DISPLAY WINNER
    if (scores[0] === 100 || scores[1] === 100) {
      inputContainerEl.classList.add("hidden");
      lettersEl.classList.add("hidden");
      if (scores[0] === 100) {
        player0El.classList.remove("player--active");
        player0El.classList.add("winner");
        scoreLabel0El.textContent = "You win 🥳🎉";
        scoreLabel0El.style.fontSize = `2.4rem`;
      } else {
        player1El.classList.remove("player--active");
        player1El.classList.add("winner");
        scoreLabel1El.textContent = "You win 🥳🎉";
        scoreLabel1El.style.fontSize = `2.4rem`;
      }
    }
  }
});
