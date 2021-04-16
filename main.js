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
    if (pl2.hit == pl1.defence){
        console.log('враг ответил тем же');
        player1.changeHP(randomizer(0));
    }
    if (pl1.hit == pl2.defence){
        console.log('я ответил тем же');
        player1.changeHP(randomizer(0));
    }

    if (pl2.hit != pl1.defence){
        player1.changeHP(randomizer(pl1.value));
    }

    if (pl1.hit != pl2.defence){
        player2.changeHP(randomizer(pl2.value));
    }
}

function renderingLifes(pl1, pl2){
    if (pl1.hp === 0 && pl1.hp < pl2.hp){
        $arenas.appendChild(whoIsWin(pl2.name));
    } else if (pl2.hp === 0 && pl1.hp > pl2.hp){
        $arenas.appendChild(whoIsWin(pl1.name));
    } else if(pl1.hp === 0 && pl2.hp === 0){
        $arenas.appendChild(whoIsWin());
    }
    
    if (pl1.hp === 0 || pl2.hp === 0){
        $control.disabled = true;
    }
    
    pl1.renderHP();
    pl2.renderHP(); 
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

