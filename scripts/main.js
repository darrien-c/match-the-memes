const cards = document.querySelectorAll('.card');

//Game overlays
const overlays = document.getElementsByClassName('overlay-text');
const gameoverOverlay = document.getElementsByClassName('gameover-text');
const win = document.getElementsByClassName('victory-text');
const btn = document.getElementById('start-game');
const btnRestart = document.getElementById('restart-game');
const btnAgain = document.getElementById('play-again');



//Moves
let counter = document.querySelector('.moves');
let moves = 0;


//Matched Cards
let total = document.getElementById('totalMatched');
totalMatched = [];



// -- Start Game --

function startGame() {
    btn.addEventListener('click', function(){
        overlays[0].style.display = "none";  
    });

};

startGame();


// --- Victory screen to display ---
function victory() {
    win[0].style.display = "block";
}; 


// --- Play again ---
btnAgain.addEventListener('click', function(){
    win[0].style.display = "none";
    correct = 0;
    numberOfMoves = [];
    totalMatched = [];
    counter.innerHTML = numberOfMoves;
    total.innerHTML = totalMatched;
    location.reload();
});



//-- Restart Game ---

btnRestart.addEventListener('click', function(){
        // gameoverOverlay[0].style.display = "none";
        correct = 0;
        numberOfMoves = [];
        totalMatched = [];
        counter.innerHTML = numberOfMoves;
        total.innerHTML = totalMatched;
        location.reload();
});
    



//---Matching Cards ----
//Matching variables

let hasFlipped = false;
let lockGameboard = false;
let firstChoice, secondChoice;


//--- Flip card action----

function flipCard() {

    //if the first card is clicked then this variable will hold the first card
    if(lockGameboard) return;
    if(this === firstChoice) return;

    this.classList.toggle('flipped');

    if(!hasFlipped) {
        hasFlipped = true;
        firstChoice = this;
        moveCounter();
        return;
    }
        hasFlipped = false;
        secondChoice = this;
        checkMatch();
}




// --- Check if cards match function---
let correct = 0;
totalMatched = [];


function checkMatch(){
    if(firstChoice.dataset.image === secondChoice.dataset.image) {
        correct++    
        totalMatched.push(correct);
        total.innerHTML = correct;
        if(totalMatched.length == 6){           
            victory();
        };
        disableCards();
        
    } else {   
        unflip();
    }
}

// --- If the cards match then disable click event on the matched cards ---
function disableCards(){
    firstChoice.removeEventListener('click', flipCard);
    secondChoice.removeEventListener('click', flipCard);

    resetGameboard();
}

// --- If cards do not match then unflip cards ----
function unflip(){
    lockGameboard = true;
    setTimeout(() => {
        firstChoice.classList.remove('flipped');
        secondChoice.classList.remove('flipped');

        resetGameboard()
    }, 1000);
};


// After each round - set first and second card to null
function resetGameboard() {
    [hasFlipped, lockGameboard] = [false, false];
    [firstChoice, secondChoice] = [null, null];
}


// --Shuffle function --

(function shuffle() {
    cards.forEach(card => {
       let randomPosition = Math.floor(Math.random() * 12);

       card.style.order = randomPosition;
     });
})(); 



//---- Moves -----
let numberOfMoves = [];
totalMoves = [];
function moveCounter(){    
   numberOfMoves++;
   totalMoves.push(numberOfMoves);
   counter.innerHTML = numberOfMoves;
   
};


cards.forEach(card => card.addEventListener('click', flipCard));


//------Music------

var audio = new Audio("audio/nintendo-wii .mp3");
audio.loop = true;
audio.play();

const musicSlider = document.getElementById('musicSlide');
const music = document.getElementById('audio');


musicSlider.addEventListener('click', function(){
    if(!musicSlider.checked == false){
        audio.play();
    }
    
    if(!musicSlider.checked == true) {
        audio.pause();
    }
});






