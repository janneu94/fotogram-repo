let GLOBAL_INDEX = -1;

let IMG_LIST = [
    "bamboo.jpg",
    "five_bonsai_trees.jpg",
    "japanese_tea_set.jpg",
    "maple_leaves.jpg",
    "matcha_bowls.jpg",
    "pink_blossom.jpg",
    "red_and_blue_blossom.jpg",
    "single_bonsai_tree.jpg",
    "stonebeach.jpg",
    "stones_and_bamboo.jpg",
    "stone_lotus.jpg",
    "white_blossom_on_water.jpg",
];

function render() {
    let contentRef = document.getElementById("content");
    for (let index = 0; index < IMG_LIST.length; index++) {
        contentRef.innerHTML += getNoteTemplate(index);
    }
}

function getNoteTemplate(index) {
    return `
        <div class="single_element" tabindex="0" onkeydown="openWithEnter(event, ${index})" role="button" aria-pressed="false">
            <img src="./img/${IMG_LIST[index]}" alt="${IMG_LIST[index]}" onclick="openPhoto(${index})">
        </div>`;
}

function openPhoto(i) {
    if (GLOBAL_INDEX == -1) {
        toggleOverlay();
    }
    GLOBAL_INDEX = i;
    let choosenPhoto = document.getElementById("overlay_photo");
    choosenPhoto.innerHTML = showPhotoTemplate(GLOBAL_INDEX);
}

function showPhotoTemplate(index) {
    return `
    
        <section class="overlay_header">
            <h2>${IMG_LIST[index].substring(0,IMG_LIST[index].length-4)}</h2>
            <a class="close_button" onclick="toggleOverlay()">X</a>
        </section>
    
        <div class="single_picture">     
            <img src="./img/${IMG_LIST[index]}" alt="${IMG_LIST[index]}">     
        </div>`;

}

function toggleOverlay() {
    let overlayRef = document.getElementById("overlay")
    overlayRef.classList.toggle("d_none")
    overlayRef.focus();
    GLOBAL_INDEX = -1;
}

function nextPhoto() {
    GLOBAL_INDEX++;
    if (GLOBAL_INDEX == IMG_LIST.length) {
        GLOBAL_INDEX = 0;
    }
    openPhoto(GLOBAL_INDEX);
}

function previousPhoto() {
    GLOBAL_INDEX--;
    if (GLOBAL_INDEX < 0) {
        GLOBAL_INDEX = (IMG_LIST.length - 1);
    }
    openPhoto(GLOBAL_INDEX);
}

function BubblingPrevention(event) {
    event.stopPropagation();
}

function openWithEnter(event, index) {
    if (event.key === 'Enter') {
        openPhoto(index);
    }
}

function escapePressed(event) {
    if (event.key === "Escape") {
        let overlayRef = document.getElementById("overlay");
        if (!overlayRef.classList.contains("d_none")) {
            toggleOverlay();
        }
    }
}

document.addEventListener("keydown", escapePressed);