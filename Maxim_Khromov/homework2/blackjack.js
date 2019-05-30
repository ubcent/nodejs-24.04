const ansi = require("ansi");
const readline = require("readline");
const readlineSync = require("readline-sync");
const random = require("random");

cursor = ansi(process.stdout);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const settings = {
  cardDesk: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    Jack: 10,
    Queen: 10,
    King: 10,
    Ace: 11
  },
  pointsToWin: 21
};

function createDealer(name = "Maksim the dealer") {
  return (dealer = {
    name: name,
    cards: [],
    points: 0
  });
}

function createPlayer() {
  cursor
    .black()
    .bg.yellow()
    .write("May I have your name?")
    .reset()

    .write("\n");
  let userName = readlineSync.question("", { hideEchoBack: true });
  return (player = {
    name: userName,
    cards: [],
    points: 0
  });
}

function giveRandomCard(receiver) {
  getRandomCard();
  receiver.cards.push(randomCard.name);
  receiver.points += +randomCard.value;
  console.log(receiver.name, " takes a card...");
}

function getRandomCard() {
  let amoutOfPossibleCards = Object.keys(settings.cardDesk).length;
  let cardNumber = random.int((min = 0), (max = amoutOfPossibleCards - 1));
  return (randomCard = {
    name: Object.keys(settings.cardDesk)[cardNumber],
    value: Object.values(settings.cardDesk)[cardNumber]
  });
}

function dealerPlayNextRound() {
  if ((dealer.points >= 17) & (dealer.points > player.points)) {
    console.log(dealer.name, "don't want anymore cards...");
  } else {
    giveRandomCard(dealer);
  }
}

function initGame() {
  console.log("Loading...");
  createDealer();
  createPlayer();
  console.log("Game initialized!");
  waitForAnswer();
}

function showHelp() {
  console.log(`Here all the commands:\n
start - initialize the game
card - take a card
pass - skip a turn
exit - exit the game\n`);
}

function waitForAnswer() {
  cursor
    .black()
    .bg.yellow()
    .write("What should we do next? Type 'help' for more information.")
    .reset()

    .write("\n");
  answer = readlineSync.question("", { hideEchoBack: true });
  switch (answer) {
    case "help":
      showHelp();
      waitForAnswer();
      break;
    case "card":
      nextRound();
      waitForAnswer();
      break;
    case "pass":
      playerPass();
      break;
    case "start":
      initGame();
      break;
    case "exit":
      break;
    default:
      waitForAnswer();
      break;
  }
}

function playerPass() {
  dealerPlayNextRound();
  console.log("Statistic:");
  console.log(player);
  console.log(dealer);
  checkFor21();
  checkForWin();
}

function play() {
  initGame();
}

function nextRound() {
  giveRandomCard(player);
  dealerPlayNextRound();
  console.log("Statistic:");
  console.log(player);
  console.log(dealer);
  checkFor21();
}

function checkFor21() {
  if (player.points > 21) {
    console.log(
      `${player.name} went over 21. ${dealer.name} has won the game!`
    );
    process.exit();
  } else if (dealer.points > 21) {
    console.log(
      `${dealer.name} went over 21. ${player.name} has won the game!`
    );
    process.exit();
  }
}

function checkForWin() {
  if (dealer.points < player.points) {
    playerPass();
  } else if (dealer.points > player.points) {
    console.log(
      `${dealer.name} has more points then ${player.name}. ${dealer.points} > ${
        player.points
      }. ${dealer.name} has won the game!`
    );
    process.exit();
  } else if (player.points > dealer.points) {
    console.log(
      `${player.name} has more points then ${dealer.name}. ${player.points} > ${
        dealer.points
      }. ${player.name} has won the game!`
    );
    process.exit();
  } else {
    console.log(
      `I guess it's a tie! ${dealer.name} has ${dealer.points}. ${
        player.name
      } has ${player.points}.`
    );
    process.exit();
  }
}

function logger() {
  //TO DO
}

play();
