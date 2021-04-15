const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.arenas .control');
// const $random = document.querySelector('.arenas .button');

//объект первого игрока
const player1 = {
    player: 1,
    name: "Subzero",
    hp: 100,
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
    hp: 100,
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

$control.addEventListener('submit', function(e){
    e.preventDefault();
    const enemy = enemyAttack();
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

    // $random.addEventListener('click', function(){
        
    // });
    player1.changeHP(randomizer(userAttack.value));
    player2.changeHP(randomizer(enemy.value));
    
    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(whoIsWin(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp){
        $arenas.appendChild(whoIsWin(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(whoIsWin());
    }
    
    if (player1.hp === 0 || player2.hp === 0){
        $control.disabled = true;
    }
    
    player1.renderHP();
    player2.renderHP();           

    console.log(enemy);
    console.log(userAttack);
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

