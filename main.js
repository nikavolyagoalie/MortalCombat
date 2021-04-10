//объект первого игрока
const player1 = {
    player: 1,
    name: "Subzero",
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        {name: 'ak47'}
    ],
    attacks: attacks
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
    attacks: attacks
};
const $arenas = document.querySelector('.arenas');
const $random = document.querySelector('.arenas .button');

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

function changeHP(player, count){
    const $playerLIfe = document.querySelector('.player' + player.player + ' .life');
    player.hp -= count; 

    if (player.hp < 0){
        player.hp = 0;
        $random.disabled = true;
    }

    $playerLIfe.style.width = player.hp + '%';
    
    if (player == player1 && player.hp == 0){
        console.log(whoIsWin(player2.name));
    } else if (player == player2 && player.hp == 0){
        console.log(whoIsWin(player1.name));
    }
    
}

function whoIsWin(name){
    const $winTitle = createElement('div', 'loseTitle');
    $winTitle.innerText = name + ' is WINNER!!!';

    return $arenas.appendChild($winTitle);
}

function randomizer(num){
    return Math.ceil(Math.random() * num);
}

$random.addEventListener('click', function(){
    changeHP(player1, randomizer(20));
    changeHP(player2, randomizer(25));
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));