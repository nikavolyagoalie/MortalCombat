import { randomizer } from './randomizer.js';
import { getTime } from './getTime.js';
import { logs } from './serverData.js';
import { querySelector } from './workDOM.js';

const $chat = querySelector('.chat');

//генерим логи для разных ситуаций
export const generateLogs = (type, player1, player2) => {
    let text = '';
    let time = '';
    let startTime = '';
    let player;
    let damage = '';
    let $el;

    const {name: name1, hp: hp1 } = player1;
    const {name: name2, hp: hp2 } = player2;

    switch (type) {
        case 'start':
            startTime = getTime();
            text = logs[type][randomizer(type.length) - 1].replace('[time]', startTime).replace('[player1]', name1).replace('[player2]', name2);
            break;

        case 'draw':
            text = logs[type][randomizer(type.length)-1];
            break;

        case 'hit':
            player = hp2;
            text = logs[type][randomizer(type.length) - 1].replace('[playerKick]', name1).replace('[playerDefence]', name2);
            damage = `[-${100 - player}] [${player}/100]`;
            time = getTime();
            break;

        case 'defence':
            text = logs[type][randomizer(type.length) - 1].replace('[playerKick]', name2).replace('[playerDefence]', name1);
            time = getTime();
            break;

        case 'end':
            if (hp1 > hp2){
                text = logs[type][randomizer(type.length) - 1].replace('[playerWins]', name1).replace('[playerLose]', name2);
            }else{
                text = logs[type][randomizer(type.length) - 1].replace('[playerWins]', name2).replace('[playerLose]', name1);
            }
            break;
    }

    $el = `<p>${time} ${text} ${damage}</p>`;
    
    $chat.insertAdjacentHTML('afterbegin', $el);
}