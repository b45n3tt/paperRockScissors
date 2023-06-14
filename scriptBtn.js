const clearBtn = document.getElementById("clearBtn-el");
const rockBtn = document.getElementById("rock-el");
const paperBtn = document.getElementById("paper-el");
const scissorsBtn = document.getElementById("scissors-el");
const outputPl = document.getElementById("output-pl");
const outputCom = document.getElementById("output-com");
const outputRes = document.getElementById("output-result");
const outputW = document.getElementById("output-wins");
const outputL = document.getElementById("output-losses");

let selectedBtn = "";

rockBtn.addEventListener("click", function() {
  selectedBtn = "rock";
  game();
});

paperBtn.addEventListener("click", function() {
  selectedBtn = "paper";
  game();
});

scissorsBtn.addEventListener("click", function() {
  selectedBtn = "scissors";
  game();
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
};

clearBtn.addEventListener("click", function() {
  clearTally();
  refreshDOM();
});

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

    const resetAtFive = () => {
    
    if (tallyWins === 5) {
      console.log("you win! gameover")
      clearTally();
  refreshDOM();
    outputRes.value
    } else {
      console.log("you lose! gameover")
      clearTally();
  refreshDOM();
    }
  } 
  
  if (tallyWins || tallyLosses === 5) {
    resetAtFive()
  }
  outputRes.textContent = `${result}`;

  updateTally(tallyWins, tallyLosses);
  outputW.textContent = `Wins: ${tallyWins}`;
  outputL.textContent = `Losses: ${tallyLosses}`;

  console.log(`Wins: ${tallyWins}`);
  console.log(`Losses: ${tallyLosses}`);
};