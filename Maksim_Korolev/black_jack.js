'use strict';
const fs = require("fs");
const readWrite = require('console-read-write');

const cards = [6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];

function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCard() {
    return cards[getRandomInRange(0, 8)];
}

function getEndGameStatus() {
    readWrite.write(`У Вас ${player.name} на руках: ${player.cards} карт, что составляет: ${getResult(player.cards)} очков.\n`);
    readWrite.write(`У Вашего соперника ${npc.name} на руках: ${npc.cards} карт, что составляет: ${getResult(npc.cards)} очков.\n`);

    if (getResult(player.cards) > getResult(npc.cards) && getResult(player.cards) <= 21) {
        readWrite.write(`Игрок ${player.name} победил!!!\n`);
        player.vinCount++;
    } else if (getResult(player.cards) === getResult(npc.cards)) {
        readWrite.write(`У вас равное количество очков, ничья!\n`);
    } else if (getResult(npc.cards) > getResult(player.cards) && getResult(npc.cards) <= 21) {
        readWrite.write(`Игрок ${npc.name} победил!!!\n`);
        npc.vinCount++;
    } else if (getResult(player.cards) > 21){
        readWrite.write(`Игрок ${npc.name} победил!!!\n`);
        npc.vinCount++;
    }
}

function getCurrStatus(user) {
    readWrite.write(`У Вас ${user.name} на руках: ${user.cards} карт, что составляет: ${getResult(user.cards)} очков.\n`);
}

function getResult(userCards) {
    return userCards.reduce((sum, current) => {
        if (sum === 'J' ||sum === 'Q' || sum === 'K') sum = 10;
        if (sum === 'A') sum = 11;
        if (current === 'J' || current === 'Q' || current === 'K') return sum + 10;
        if (current === 'A' && sum >= 11) return sum + 1;
        if (current === 'A') return sum + 11;
        return sum + current;
    });
}

const player = {

    name: 'User',

    vinCount: 0,

    cards: [],

    turn: true,

    addCard(card) {
        this.cards.push(card);
    },

    resetPlayer() {
        this.name = 'User';
        this.vinCount = 0;
        this.cards = [];
        this.turn = true;
    }
};

const npc = {

    name: 'BlackJack Master',

    cards: [],

    vinCount: 0,

    turn: false,

    addCard(card) {
        this.cards.push(card);
    },

    resetNpc() {
        this.cards = [];
        this.vinCount = 0;
        this.turn = false;
    }
};

async function play() {
    let exit = false;
    let answer = '';

    player.cards = [getCard(), getCard()];
    npc.cards = [getCard(), getCard()];
    getCurrStatus(player);
    if (getResult(player.cards) === 21) {
        readWrite.write(`Поздравляем у Вас Black Jack!!! Вы выиграли!\n`);
        exit = true;
    }
    while (!exit) {
        readWrite.write(`Если хотите взять еще карту ввидите "+", если Вам достаточно введите "-"\n`);
            answer = await readWrite.read();
            if (answer !== '+' || answer !== '-') readWrite.write(`Ошибка ввода.\n`);

        if (answer === '+') {
            player.addCard(getCard());
            getCurrStatus(player);
            if (getResult(player.cards) > 21) {
                readWrite.write(`У вас перебор! Вы проиграли\n`);
                exit = true;
            }
        }
        if (answer === '-') {
            while(getResult(npc.cards) < getResult(player.cards)) {
                npc.addCard(getCard());
            }
            exit = true;
        }
    }
    getEndGameStatus();
    readWrite.write(`Если хотите сыграть еще партию введиде "more"`);
    if (await readWrite.read() === 'more') await play();
    else {
        readWrite.write(`Игра закончена!`);
    }
}


async function init() {
    readWrite.write('Добро пожаловать в игру "Black Jack" \n');
    readWrite.write('Введите свое имя (Ваше имя по умолчанию "User"): ');
    player.name = await readWrite.read();
    if (player.name === '') player.name = 'User';
    await play();
    readWrite.write(`Количество побед ${player.name} составляет: ${player.vinCount}, Количество побед ${npc.name} составляет: ${npc.vinCount}\n`);
    let date = new Date();
    fs.appendFile('log.txt',`${date} Количество побед ${player.name} составляет: ${player.vinCount}, Количество побед ${npc.name} составляет: ${npc.vinCount}\n`, function(error){
        if(error) throw error;
        console.log("Запись завершена.");
    });
    player.resetPlayer();
    npc.resetNpc();
}

init();