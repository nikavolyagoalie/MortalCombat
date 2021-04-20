import { whoIsWin } from './whoIsWin.js';
import { player1, player2 } from './players.js';
import { querySelector } from './workDOM.js';
import { generateLogs } from './generateLogs.js';

const $arenas = querySelector('.arenas');
const $control = querySelector('.arenas .control');

export const renderingLifes = (pl1, pl2) => {
    const {name: name1, hp: hp1 } = player1;
    const {name: name2, hp: hp2 } = player2;

    if (hp1 === 0 && hp1 < hp2){
        $arenas.appendChild(whoIsWin(name2));
        //лог когда player2 winner 
        generateLogs('end', pl1, pl2);
    } else if (hp2 === 0 && hp1 > hp2){
        $arenas.appendChild(whoIsWin(name1));
        //лог когда player1 winner
        generateLogs('end', pl2, pl1);
    } else if(hp1 === 0 && hp2 === 0){
        $arenas.appendChild(whoIsWin());
        //лог когда player1 draw
        generateLogs('draw', pl1, pl2);
    }
    
    if (hp1 === 0 || hp2 === 0){
        $control.style.display = 'none';
    } 
}