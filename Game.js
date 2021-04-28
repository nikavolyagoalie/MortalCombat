import { player1, player2 } from './players.js';
import { logs, ATTACKS, HIT } from './serverData.js';

class Game{
    start = () => {
        //функция рандомного числа
        const randomizer = num => Math.ceil(Math.random() * num);

        //определяем объект с действиями врага
        const enemyAttack = () => {
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
        
        //определяем объект с действиями игрока
        const userAttack = () => {
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

        //функция поиска элемента по селектору
        const querySelector = (identefication) => {
            const $identefication = document.querySelector(identefication);
            return $identefication;
        }

        //арена
        const $arenas = querySelector('.arenas');
        //область с кнопками на арене
        const $control = querySelector('.arenas .control');
        

        //устанавливаем время(c учетом нуля впепеди если вдруг меньше 10 значение)
        const getTime = () => {
            const date = new Date();
            const minutes = date.getMinutes();
            const hours = date.getHours();
            const seconds = date.getSeconds();

            // Hour
            const HH = ("0" + hours).slice(-2);
            // Minutes
            const mm = ("0" + minutes).slice(-2);
            // Seconds
            const ss = ("0" + seconds).slice(-2);

            return `${HH} : ${mm} : ${ss}`;
        }

        //функция создания нового элемента
        const createElement = (tag, className) => {
            const $tag = document.createElement(tag);
        
            //если передано название класса то создаем класс
            if (className){
                $tag.classList.add(className);
            }
        
            return $tag;
        }
        
        //функция создания игрока
        const createPlayer = (playerObj) => {
            const {name, hp, img, player} = playerObj;
        
            const $player = createElement('div', 'player' + player);
            const $progressbar = createElement('div', 'progressbar');
            const $life = createElement('div', 'life');
            const $name = createElement('div', 'name');
        
            $life.style.width = hp + '%';
        
            $name.innerText = name;
        
            $progressbar.appendChild($life);
            $progressbar.appendChild($name);
        
            const $character = createElement('div', 'character');
        
            const $img = createElement('img');
            $img.src = img;
            $character.appendChild($img);
        
            $player.appendChild($progressbar);
            $player.appendChild($character);
        
            return $player;
        }
        
        //создание кнопки рестарта
        const createReloadButton = () => {
            const $reloadWrap = createElement('div', 'reloadWrap');
            const $button = createElement('button', 'button');
            $button.innerText = 'Restart';
        
            $button.addEventListener('click', function(){
                window.location.reload();
            });
        
            $reloadWrap.appendChild($button);
            $arenas.appendChild($reloadWrap);
        }

        //отрисовка жизней
        const renderingLifes = (pl1, pl2) => {
            const {name: name1, hp: hp1 } = player1;
            const {name: name2, hp: hp2 } = player2;

            if (hp1 === 0 && hp1 < hp2){
                $arenas.appendChild(whoIsWin(name2));
                //лог когда player2 winner 
                generateLogs('end', pl1, pl2);
            } else if (hp2 === 0 && hp1 > hp2){
                $arenas.appendChild(whoIsWin(name1));
                //лог когда player1 winner
                generateLogs('end', pl2, pl1);
            } else if(hp1 === 0 && hp2 === 0){
                $arenas.appendChild(whoIsWin());
                //лог когда player1 draw
                generateLogs('draw', pl1, pl2);
            }
            
            if (hp1 === 0 || hp2 === 0){
                $control.style.display = 'none';
            } 
        }

        //отрисовка жизней
        const fightLife = (pl1, pl2) => {

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

        //область показа инфы о бое 
        const $chat = querySelector('.chat');

        //генерим логи для разных ситуаций
        const generateLogs = (type, player1, player2) => {
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

        //вывод сообщегния о победившем или ничье
        const whoIsWin = (name) => {
            const $winTitle = createElement('div', 'loseTitle');
            if (name){
                $winTitle.innerText = name + ' is WINNER!!!';
            } else {
                $winTitle.innerText = 'draw';
            }
            createReloadButton();
        
            return $winTitle;
        }

        //лог для начала игры
        generateLogs('start', player1, player2);

        //обработчик события на кнопу боя
        $control.addEventListener('submit', (e) => {
            e.preventDefault();
            fightLife(player1, player2);
            renderingLifes(player1, player2);
        });

        //добвлениее игроков в поле игровое
        $arenas.appendChild(createPlayer(player1));
        $arenas.appendChild(createPlayer(player2));
    }
}

export default Game;

