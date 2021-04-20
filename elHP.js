import { querySelector } from './workDOM.js';

function elHP() {
    const $playerNumber = querySelector('.player' + this.player);
    const $playerLIfe = querySelector('.player' + this.player + ' .life');
    return $playerNumber, $playerLIfe;
}

export default elHP;
