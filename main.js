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
const $arenas = document.querySelector('.arenas');
const $control = document.querySelector('.arenas .control');
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
        $random.disabled = true;
    }
}

function randomizer(num){
    return Math.ceil(Math.random() * num);
}

$random.addEventListener('click', function(){
    player1.changeHP(randomizer(20));
    player2.changeHP(randomizer(25));

    if (player1.hp === 0 && player1.hp < player2.hp){
        $arenas.appendChild(whoIsWin(player2.name));
    } else if (player2.hp === 0 && player1.hp > player2.hp){
        $arenas.appendChild(whoIsWin(player1.name));
    } else if(player1.hp === 0 && player2.hp === 0){
        $arenas.appendChild(whoIsWin());
    }
    
    player1.renderHP();
    player2.renderHP();
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));


function elHP(){
    return document.querySelector('.player' + this.player);
}

function renderHP(){
    const $playerLIfe = document.querySelector('.player' + this.player + ' .life');
    $playerLIfe.style.width = this.hp + '%';
}

function createReloadButton(){
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';
    $reloadWrap.appendChild($button);
    $control.appendChild($reloadWrap);
    document.querySelector('.control> button').style.display = 'none';

    $button.addEventListener('click', function(){
        window.location.reload();
    });
}

