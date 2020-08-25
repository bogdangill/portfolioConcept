import './style2.css';
// import './img';

//проверка работы вебпака и бабеля
var moment = require('moment');
console.log(moment().startOf('day').fromNow());
var name = "Bogdan",
    time = "todayy";
console.log(`Hello ${name}, how are you ${time}?`);
//проверка работы вебпака и бабеля

const keyLetters = document.querySelectorAll('.keyletter');
const conceptLogo = document.querySelector('.concept-logo');
const heading = document.querySelector('.heading');
const conceptWrapper = document.querySelector('.concept-wrapper');
const closeblocks = document.querySelectorAll('.closeblock');
let left = document.querySelector('.closeblock-left');
let right = document.querySelector('.closeblock-right');

function animateObject(objectName, animationName, duration) {

    objectName.style.animationName = animationName;
    objectName.style.animationDuration = duration;
    objectName.style.animationFillMode = 'forwards'; //чтобы позиция фиксировалась в конце анимации

}

function deleteObject(objectName) {
    objectName.classList.add('d-none');
}

function restoreObject(objectName) {
    objectName.classList.remove('d-none');
}

function removeAnimation(objectName) {

    objectName.style.animationName = null;
    objectName.style.animationDuration = null;
    objectName.style.animationFillMode = null;

}

function showHiddenConcepts(keyLetterSpecificClassName, conceptClassName, regExpMask) {

    let specialClasses = document.querySelectorAll(conceptClassName);

    for (let specialClass of specialClasses) {

        let conceptSpecificClassName = specialClass.className.match(regExpMask);

        if (String(keyLetterSpecificClassName) === String(conceptSpecificClassName)) {

            restoreObject(specialClass);

            if (conceptClassName === '.clipped') {
                animateObject(specialClass, 'unclipping', '1s');
            }
            else if (conceptClassName === '.concept') {
                animateObject(specialClass, 'fontDance', '1s');
            }

        } else {
            deleteObject(specialClass);
        }
    }
}

function hideShownObjects(classToHide) {

    let specialObjects = document.querySelectorAll(classToHide);
    for (let specialObject of specialObjects) {
        deleteObject(specialObject);
    }
}

function closeConcepts(whatToShrink, animOne, animTwo) {

    animateObject(whatToShrink, 'shrinkConcepts', '1s');
    animateObject(animOne, 'moveLeftBlock', '1s');
    animateObject(animTwo, 'moveRightBlock', '1s');

    hideShownObjects('.clipped');
}

for (let keyLetter of keyLetters) {

    keyLetter.onclick = function() {

        animateObject(conceptLogo, 'toLeft', '1s');
        animateObject(conceptWrapper, 'testing', '1s');

        for (let closeblock of closeblocks) {

            restoreObject(closeblock);

            if (closeblock.classList.contains('closeblock-left')) {
                animateObject(closeblock, 'showLeftBlock', '1s');
            } else {
                animateObject(closeblock, 'showRightBlock', '1s');
            }
        };

        // heading.classList.add('d-none');
        deleteObject(heading);

        let kLClassName = keyLetter.className.match(/\bconcept-\w+\b/);
        let kLClassName2 = keyLetter.className.match(/\bkl-\w+\b/);
        //------
        showHiddenConcepts(kLClassName, '.concept', /\bconcept-\w+\b/);
        showHiddenConcepts(kLClassName2, '.clipped', /\bkl-\w+\b/);

    }
}

function bombThis() {
    left.classList.add('d-none');
    right.classList.add('d-none');
}

for (let closeblock of closeblocks) {

    closeblock.onclick = function() {
        closeConcepts(conceptWrapper, left, right);
        setTimeout(bombThis, 1000);
        setTimeout(hideShownObjects, 500, '.concept');
        setTimeout(removeAnimation, 500, conceptLogo);
        setTimeout(restoreObject, 500, heading);
    }

}


// "build": "webpack --config webpack.config.js --mode=development"