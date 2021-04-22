import { elHP } from './elHP.js';
import { changeHP } from './changeHP.js';
import { renderHP}  from './renderHP.js';

//объект первого игрока
export const player1 = {
    player: 1,
    name: "Subzero",
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        {name: 'ak47'}
    ],
    elHP: elHP,
    renderHP: renderHP,
    changeHP: changeHP
};

//объект второго игрока
export const player2 = {
    player: 2,
    name: "Scorpion",
    hp: 10,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [
        {name: 'glock'}
    ],
    elHP: elHP,
    renderHP: renderHP,
    changeHP: changeHP
};
