import { querySelector } from './workDOM.js';

export function elHP(){
    const $playerNumber = querySelector('.player' + this.player);
    const $playerLIfe = querySelector('.player' + this.player + ' .life');
    return $playerNumber, $playerLIfe;
};

