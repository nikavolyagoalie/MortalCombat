import { createElement, createReloadButton} from './workDOM.js';

export const whoIsWin = (name) => {
    const $winTitle = createElement('div', 'loseTitle');
    if (name){
        $winTitle.innerText = name + ' is WINNER!!!';
    } else {
        $winTitle.innerText = 'draw';
    }
    createReloadButton();

    return $winTitle;
}