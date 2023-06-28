const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
    let options = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (
        (playerSelection === "rock" && computerSelection === "scissors") ||
        (playerSelection === "paper" && computerSelection === "rock") ||
        (playerSelection === "scissors" && computerSelection === "paper")
    ) {
        return "You win! " + playerSelection + " beats " + computerSelection;
    } else {
        return "You lose! " + computerSelection + " beats " + playerSelection;
    }
}

function askQuestion(question) {
    return new Promise((resolve) => {
        readline.question(question, (answer) => {
            resolve(answer);
        });
    });
}

async function game() {
    let playAgain = true;
    while (playAgain) {
        let playerSelection = await askQuestion("Rock, paper, or scissors? ");
        let computerSelection = computerPlay();
        console.log(playRound(playerSelection, computerSelection));
        if (playRound(playerSelection, computerSelection).includes("win")) {
            playerScore++;
        } else if (playRound(playerSelection, computerSelection).includes("lose")) {
            computerScore++;
        }
        console.log("Player score: " + playerScore);
        console.log("Computer score: " + computerScore);
        if (playerScore === 5) {
            console.log("You win!");
            playAgain = false;
        } else if (computerScore === 5) {
            console.log("You lose!");
            playAgain = false;
        }
        // let answer = await askQuestion("Play again? (y/n) ");
        // //playagain is true if answer is lowercase y and trimed
        // playAgain = answer.toLowerCase().trim() === "y";
    }
    readline.close();
}

game();