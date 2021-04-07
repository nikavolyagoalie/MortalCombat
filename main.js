//объект первого игрока
const player1 = {
    name: "Subzero",
    hp: 300,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: [
        {name: 'ak47'}
    ],
    attacks: attacks
};

//объект второго игрока
const player2 = {
    name: "Scorpion",
    hp: 350,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: [
        {name: 'glock'}
    ],
    attacks: attacks
};

//
function attacks(name) {
    console.log(`${name} fight...`);
}

function createPlayer(className, playerObj) {
    const {name, hp, img, attacks} = playerObj;

    const $player = document.createElement('div');
    $player.classList.add(className);
    
    const $progressbar = document.createElement('div');
    $progressbar.classList.add('progressbar');

    const $life = document.createElement('div');
    const $name = document.createElement('div');

    $life.classList.add('life');
    $name.classList.add('name');

    $life.innerHTML = hp;
    $life.style.width = '100%';

    $name.innerHTML = name;

    $progressbar.appendChild($life);
    $progressbar.appendChild($name);

    const $character = document.createElement('div');
    $character.classList.add('character');
    const $img = document.createElement('img');
    $img.src = img;
    $character.appendChild($img);


    $player.appendChild($progressbar);
    $player.appendChild($character);

    attacks(name);

    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player);
}

createPlayer('player1', player1);
createPlayer('player2', player2);