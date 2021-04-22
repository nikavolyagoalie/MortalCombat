
export const createElement = (tag, className) => {
    const $tag = document.createElement(tag);

    //если передано название класса то создаем класс
    if (className){
        $tag.classList.add(className);
    }

    return $tag;
}

export const querySelector = (identefication) => {
    const $identefication = document.querySelector(identefication);
    return $identefication;
}

const $arenas = querySelector('.arenas');

export const createPlayer = (playerObj) => {
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

export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $button = createElement('button', 'button');
    $button.innerText = 'Restart';

    $button.addEventListener('click', function(){
        window.location.reload();
    });

    $reloadWrap.appendChild($button);
    $arenas.appendChild($reloadWrap);
}
