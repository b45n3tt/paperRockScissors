

const getComputerChoice = () => {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
};

const playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toLowerCase();
  let answer = "";

  if (playerSelection === "rock" && computerSelection === "scissors") {
    answer = "You Win! The rock breaks the scissors!";
  } else if (playerSelection === "paper" && computerSelection === "rock") {
    answer = "You Win! Paper covers the rock!";
  } else if (playerSelection === "scissors" && computerSelection === "paper") {
    answer = "You Win! Scissors cut through paper!";
  } else if (playerSelection === computerSelection) {
    answer = "It's a tie!";
  } else {
    const substring = "Win";
    const containsSubstring = answer.includes(substring);
    if (containsSubstring) {
      answer = "You Win!";
    } else {
      answer = "You Lose!";
    }
  }

  return answer;
};

const checkSubstring = (string, substring) => {
  const containsSubstring = string.includes(substring);
  let result = "";

  if (containsSubstring) {
    result = "You Win!";
  } else {
    result = "You Lose!";
  }

  return result;
};

const updateTally = (wins, losses) => {
  localStorage.setItem("tallyWins", wins);
  localStorage.setItem("tallyLosses", losses);
};

const game = () => {
  const playerSelection = prompt("Enter your choice: Rock, Paper, or Scissors").toLowerCase();
  const computerSelection = getComputerChoice();

  console.log(`Player: ${playerSelection}`);
  console.log(`Computer: ${computerSelection}`);

  const result = playRound(playerSelection, computerSelection);
  console.log(result);

  let tallyWins = parseInt(localStorage.getItem("tallyWins")) || 0;
  let tallyLosses = parseInt(localStorage.getItem("tallyLosses")) || 0;

  const substring = "Win";
  const roundResult = checkSubstring(result, substring);

  if (roundResult === "You Win!") {
    tallyWins++;
  } else {
    tallyLosses++;
  }

  updateTally(tallyWins, tallyLosses);

  console.log(`Wins: ${tallyWins}`);
  console.log(`Losses: ${tallyLosses}`);
};


// Start the game
game();



