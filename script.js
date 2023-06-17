const clearBtn = document.querySelector('#clearBtn-el');
const rockBtn = document.querySelector('#rock-el');
const paperBtn = document.querySelector ('#paper-el');
const scissorsBtn = document.querySelector ('#scissors-el');
const outputPl = document.querySelector('#output-pl');
const outputCom = document.querySelector('#output-com');
const outputRes = document.querySelector('#output-result');
const outputW = document.querySelector('#output-wins');
const outputL = document.querySelector('#output-losses');

let selectedBtn = "";
let gameOver = false;

rockBtn.addEventListener("click", function() {
  if (!gameOver) {
    selectedBtn = "rock";
    console.log("rock")
    game();
  }
});

paperBtn.addEventListener("click", function() {
  if (!gameOver) {
    selectedBtn = "paper";
    game();
  }
});

scissorsBtn.addEventListener("click", function() {
  if (!gameOver) {
    selectedBtn = "scissors";
    game();
  }
});

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const playRound = (playerSelection, computerSelection) => {
  let answer = "";

  if (playerSelection === "rock" && computerSelection === "scissors") {
    answer = "You Win! The rock breaks the scissors!";
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    answer = "You Win! Paper covers the rock!";
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    answer = "You Win! Scissors cut through paper!";
  } else if (playerSelection === "rock" && computerSelection === "paper") {
    answer = "You Lose! Paper covers the rock!";
  } else if (playerSelection === "paper" && computerSelection === "scissors") {
    answer = "You Lose! Scissors cut through paper!";
  } else if (playerSelection === "scissors" && computerSelection === "rock") {
    answer = "You Lose! The rock breaks the scissors!";
  } else {
    answer = "It's a tie!";
  }

  return answer;
};

const updateTally = (wins, losses) => {
  localStorage.setItem("tallyWins", wins);
  localStorage.setItem("tallyLosses", losses);
};

const clearTally = () => {
  localStorage.removeItem("tallyWins");
  localStorage.removeItem("tallyLosses");
};

const refreshDOM = () => {
  const tallyWins = parseInt(localStorage.getItem("tallyWins")) || 0;
  const tallyLosses = parseInt(localStorage.getItem("tallyLosses")) || 0;

  outputW.textContent = `Wins: ${tallyWins}`;
  outputL.textContent = `Losses: ${tallyLosses}`;
  outputRes.textContent = `Rock, Paper, Scissors... Shoot!`
  outputPl.textContent = `Player: `;
  outputCom.textContent = `Computer: `;
};

clearBtn.addEventListener("click", function() {
  clearTally();
  refreshDOM();
  gameOver = false; // Reset game over state
  enableButtons(); // Enable game buttons
});

const enableButtons = () => {
  rockBtn.disabled = false;
  paperBtn.disabled = false;
  scissorsBtn.disabled = false;
};

const disableButtons = () => {
  rockBtn.disabled = true;
  paperBtn.disabled = true;
  scissorsBtn.disabled = true;
  rockBtn.classList.add("muted");
  paperBtn.classList.add("muted");
  scissorsBtn.classList.add("muted");
  clearBtn.classList.add("goGreen");
};

const gameOverWin = () => {
  gameOver = true;
  disableButtons(); // Disable game buttons
  outputRes.textContent = "Game Over! You Win!";
};

const gameOverLose = () => {
  gameOver = true;
  disableButtons(); // Disable game buttons
  outputRes.textContent = "Game Over! You Lose!";
};

const game = () => {
  const playerSelection = selectedBtn;
  const computerSelection = getComputerChoice();

  console.log(`Player: ${playerSelection}`);
  console.log(`Computer: ${computerSelection}`);
  outputPl.textContent = `Player: ${playerSelection}`;
  outputCom.textContent = `Computer: ${computerSelection}`;

  const result = playRound(playerSelection, computerSelection);
  console.log(result);

  let tallyWins = parseInt(localStorage.getItem("tallyWins")) || 0;
  let tallyLosses = parseInt(localStorage.getItem("tallyLosses")) || 0;

  if (result.includes("Win")) {
    tallyWins++;
  } else if (result.includes("Lose")) {
    tallyLosses++;
  }

  if (tallyWins === 5)  {
    gameOverWin();
  } else if (tallyLosses === 5) {
    gameOverLose()
  }  else {
    outputRes.textContent = `${result}`;
  }

  updateTally(tallyWins, tallyLosses);
  outputW.textContent = `Wins: ${tallyWins}`;
  outputL.textContent = `Losses: ${tallyLosses}`;

  console.log(`Wins: ${tallyWins}`);
  console.log(`Losses: ${tallyLosses}`);
};

refreshDOM();
