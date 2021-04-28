class Player{
    constructor(props){
        this.name = props.name;
        this.img = props.img;
        this.hp = props.hp;
        this.player = props.player;
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    elHP = () => {
        return document.querySelector(`.player${this.player} .life`);
    }

    changeHP = (count) => {
    
        this.hp -= count; 
    
        if (this.hp < 0){
            this.hp = 0;
        }
    }
}

export default Player;