// import { elHP } from './elHP.js';
// import { changeHP } from './changeHP.js';
// import { renderHP}  from './renderHP.js';
import Player from './Player.js';

//объект первого игрока
export const player1 = new Player({
    player: 1,
    name: "Subzero",
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    elHP,
    elHPNum,
    renderHP,
    changeHP
});

console.log(player1);

//объект второго игрока
export const player2 = new Player({
    player: 2,
    name: "Scorpion",
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    elHP,
    elHPNum,
    renderHP,
    changeHP 
});

console.log(player2);
