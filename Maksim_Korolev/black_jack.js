const fs = require('fs');
const readWrite = require('console-read-write');

const cards = [6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isVin(user) {
    if (user.getResult() === 21) {
        readWrite.write(`Сongratulations ${user.name} you have Black Jack!!!`);
        return true;
    }
    if (user.getResult() > 21) {
        readWrite.write(`${player.name} you lost, your score: ${user.getResult()}`);
        return false
    }
    if (user.cards.every((item) => item === 'A')) {
        readWrite.write(`Сongratulations ${user.name} you have Black Jack!!!`);
        return true;
    }
}

const player = {

    name: 'User',

    cards: [this.getCard(), this.getCard()],

    getCard() {
        return cards[getRandomInRange(0, 8)];
    },

    addCard() {
        this.cards.push(this.getCard());
    },

    getResult() {
        this.cards.reduce( (sum, curr) => {
            if (curr === 'J' || 'Q' || 'K') return sum + 10;
            if (curr === 'A') return sum + 11;
            return sum + curr;
        });
    },

    resetPlayerCards() {
        return this.cards = [];
    },

};

const npc = {

    name: 'BlackJack Master',

    cards: [this.getCard(), this.getCard()],

    getCard() {
        return cards[getRandomInRange(0, 8)];
    },

    addCard() {
        this.cards.push(this.getCard());
    },

    getResult() {
        this.cards.reduce( (sum, curr) => {
            if (curr === 'J' || 'Q' || 'K') return sum + 10;
            if (curr === 'A') return sum + 11;
            return sum + curr;
        });
    },

    resetPlayerCards() {
        return this.cards = [];
    },
};

async function play() {
    let exit = false;
    while (!exit) {
        readWrite.write(`${player.name} your cards: ${player.cards[0]}, ${player.cards[1]}\n`);
        if(isVin(player)) {
            readWrite.write(`If you want play again input "yes" or input "no" to exit\n`);
            if (await readWrite.read().toLowerCase() === 'no') return;
            if (await readWrite.read().toLowerCase() ==='yes') return play();
            readWrite.write(`Undefined command! Game over :(\n`);
            return;
        }
        let answer = '';
        readWrite.write(`If you want get card input "more" or input "no" to opponent turn\n`);
        while (answer !== 'no') {

        }
    }
}


async function init() {
    readWrite.write('Welcome to Black Jack \n');
    readWrite.write('Enter your name: ');
    player.name = await readWrite.read();
    if (player.name === '') player.name = 'User';


}