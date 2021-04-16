

const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.arenas .control');
const $fight = document.querySelector('.buttonWrap');
const $chat = document.querySelector('.chat');

//объект первого игрока
const player1 = {
    player: 1,
    name: "Subzero",
    hp: 0,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        {name: 'ak47'}
    ],
    attacks: attacks,
    elHP: elHP,
    renderHP: renderHP,
    changeHP: changeHP
};

//объект второго игрока
const player2 = {
    player: 2,
    name: "Scorpion",
    hp: 0,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [
        {name: 'glock'}
    ],
    attacks: attacks,
    elHP: elHP,
    renderHP: renderHP,
    changeHP: changeHP
};



const ATTACKS = ['head', 'body', 'foot'];

const HIT = {
    head: 30,
    body: 23,
    foot: 45
};

const logs = {
    start: [
        'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.'
    ],
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: [
        'Ничья - это тоже победа!'
    ]
};

generateLogs('start', player1, player2);

function getTime(){
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



function generateLogs(type, player1, player2){
    let text = '';
    let time = '';
    let startTime = '';
    let player;
    let damage = '';
    let $el;

    switch (type) {
        case 'hit':
            player = player2.hp;
            text = logs[type][randomizer(type.length) - 1].replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
            damage = `[-${100 - player}] [${player}/100]`;
            time = getTime();
            break;

        case 'defence':
            text = logs[type][randomizer(type.length) - 1].replace('[playerKick]', player2.name).replace('[playerDefence]', player1.name);
            time = getTime();
            break;

        case 'end':
            if (player1.hp > player2.hp){
                text = logs[type][randomizer(type.length) - 1].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
            }else{
                text = logs[type][randomizer(type.length) - 1].replace('[playerWins]', player2.name).replace('[playerLose]', player1.name);
            }
            break;

        case 'draw':
            text = logs[type][randomizer(type.length)-1];
            break;

        case 'start':
            startTime = getTime();
            text = logs[type][randomizer(type.length) - 1].replace('[time]', startTime).replace('[player1]', player1.name).replace('[player2]', player2.name);
            break;
    }

    $el = `<p>${time} ${text} ${damage}</p>`;
    
    $chat.insertAdjacentHTML('afterbegin', $el);
}


function attacks(name) {
    console.log(`${name} fight...`);
}

function createElement(tag, className){
    const $tag = document.createElement(tag);

    //если передано название класса то создаем класс
    if (className){
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(playerObj) {
    const {name, hp, img, attacks} = playerObj;

    const $player = createElement('div', 'player' + playerObj.player);
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

    attacks(name);

    return $player;
}

function whoIsWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    if (name){
        $winTitle.innerText = name + ' is WINNER!!!';
    } else {
        $winTitle.innerText = 'draw';
    }
    createReloadButton();

    return $winTitle;
}

function changeHP(count){
    
    this.hp -= count; 

    if (this.hp < 0){
        this.hp = 0;
    }
}

function randomizer(num){
    return Math.ceil(Math.random() * num);
}

function enemyAttack(){
    const hit = ATTACKS[randomizer(3) - 1];
    const defence = ATTACKS[randomizer(3) - 1];
    console.log('hit', hit);
    console.log('defence', defence);

    return {
        value: randomizer(HIT[hit]),
        hit,
        defence
    };
}

function userAttack(){
    const userAttack = {};

    for (let item of $control){
        if (item.name === 'hit' && item.checked){
            userAttack.value = randomizer(HIT[item.value]);
            userAttack.hit = item.value;
        }

        if (item.name === 'defence' && item.checked){
            userAttack.defence = item.value;
        }

        item.checked = false;
    }

    return userAttack;
}

function fightLife(pl1, pl2){
    if (pl2.hit === pl1.defence){
        console.log('враг ответил тем же');
        player1.changeHP(randomizer(0));
        generateLogs('defence', player1, player2);
    }

    if (pl2.hit !== pl1.defence){
        player1.changeHP(randomizer(pl1.value));
        player1.renderHP();
        generateLogs('hit', player2, player1);
        // generateLogs('defence', player1, player2);
    }

    if (pl1.hit !== pl2.defence){
        player2.changeHP(randomizer(pl2.value));
        player2.renderHP();
        generateLogs('hit', player1, player2);
        // generateLogs('defence', player2, player1);
    }
}

function renderingLifes(pl1, pl2){
    if (pl1.hp === 0 && pl1.hp < pl2.hp){
        $arenas.appendChild(whoIsWin(pl2.name));
        generateLogs('end', pl1, pl2);
    } else if (pl2.hp === 0 && pl1.hp > pl2.hp){
        $arenas.appendChild(whoIsWin(pl1.name));
        generateLogs('end', pl2, pl1);
    } else if(pl1.hp === 0 && pl2.hp === 0){
        $arenas.appendChild(whoIsWin());
        generateLogs('draw', pl1, pl2);
    }
    
    if (pl1.hp === 0 || pl2.hp === 0){
        $control.style.display = 'none';
    } 
}

$control.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
    const user = userAttack();

    fightLife(user, enemy);          

    renderingLifes(player1, player2);

    console.log(enemy);
    console.log(user);
});


function elHP(){
    const $playerNumber = document.querySelector('.player' + this.player);
    const $playerLIfe = document.querySelector('.player' + this.player + ' .life');
    return $playerNumber, $playerLIfe;
}

function renderHP(){
    this.elHP().style.width = this.hp + '%';
}

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';

    $button.addEventListener('click', function(){
        window.location.reload();
    });

    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

