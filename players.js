import Player from './Player.js';

//объект первого игрока
export const player1 = new Player({
    player: 1,
    name: "Subzero",
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
});

console.dir(player1);

//объект второго игрока
export const player2 = new Player({
    player: 2,
    name: "Scorpion",
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
});

console.dir(player2);
