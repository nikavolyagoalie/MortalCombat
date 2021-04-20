import { querySelector} from './workDOM.js';
import { randomizer } from './randomizer.js';
import { ATTACKS, HIT } from './serverData.js';

const $control = querySelector('.arenas .control');

export const enemyAttack = () => {
    const enemyAttackObj = {};

    const hit = ATTACKS[randomizer(3) - 1];
    const defence = ATTACKS[randomizer(3) - 1];
    console.log('hit', hit);
    console.log('defence', defence);

    enemyAttackObj.value = randomizer(HIT[hit]);
    enemyAttackObj.hit = hit;
    enemyAttackObj.defence = defence;

    return enemyAttackObj;
}

export const userAttack = () => {
    const userAttackObj = {};

    for (let item of $control){
        if (item.name === 'hit' && item.checked){
            userAttackObj.value = randomizer(HIT[item.value]);
            userAttackObj.hit = item.value;
        }

        if (item.name === 'defence' && item.checked){
            userAttackObj.defence = item.value;
        }

        item.checked = false;
    }

    return userAttackObj;
}