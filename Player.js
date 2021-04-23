import { querySelector } from './workDOM.js';

class Selectors {
    constructor(player){
        this.elHPNum = () => querySelector(`.player${player}`);
        this.elHP = () => querySelector(`.player${player} life`);
    }
}

class Player extends Selectors{
    constructor({player, name, hp, img, selectors}){
        super(selectors)

        this.name = name;
        this.player = player;
        this.hp = hp;
        this.img = img;
    }

    renderHP = () => {
        elHP.style.width = this.hp + '%';
    }

    // elHP = () => {
    //     const $playerNumber = querySelector(`.player${this.player}`);
    //     const $playerLIfe = querySelector(`.player${this.player} life`);
    //     return $playerNumber, $playerLIfe;
    // }

    changeHP = (count) => {
    
        this.hp -= count; 
    
        if (this.hp < 0){
            this.hp = 0;
        }

        this.renderHP();
    }
}

export default Player;