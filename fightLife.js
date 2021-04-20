import { userAttack, enemyAttack} from './attacks.js';
import { generateLogs } from './generateLogs.js';
import { randomizer } from './randomizer.js';

export function fightLife(pl1, pl2){

    const { hit: hit1, defence: defence1, value: value1 } = userAttack();
    const { hit: hit2, defence: defence2, value: value2 } = enemyAttack();


    if (hit2 !== defence1){
        pl1.changeHP(randomizer(value1));
        pl1.renderHP();
        //лог когда атака первого игрока
        generateLogs('hit', pl2, pl1);
    } else {
        console.log('враг ответил тем же');
        pl1.changeHP(randomizer(0));
        //лог когда защита отработала
        generateLogs('defence', pl1, pl2);
    }

    if (hit1 !== defence2){
        pl2.changeHP(randomizer(value2));
        pl2.renderHP();
        //лог когда атака второго игрока
        generateLogs('hit', pl1, pl2);
    }
}