export function changeHP(count){
    
    this.hp -= count; 

    if (this.hp < 0){
        this.hp = 0;
    }
};
