import { player1, player2 } from './players.js';
import { querySelector, createPlayer} from './workDOM.js';
import { renderingLifes } from './renderingLifes.js';
import { fightLife } from './fightLife.js';
import { generateLogs } from './generateLogs.js';

const $control = querySelector('.arenas .control');
const $arenas = querySelector('.arenas');

//лог для начала игры
generateLogs('start', player1, player2);

$control.addEventListener('submit', (e) => {
    e.preventDefault();
    fightLife(player1, player2);
    renderingLifes(player1, player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

