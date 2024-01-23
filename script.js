'use strict';

/**
 * ICS3UC Final Project S1 2023-24
 * 
 * Author: Sabine 
 * Description: Word Scammble Challange 
 * 
 */

const startButton = document.getElementById ('start-button') ;
const resetButton = document.getElementById ('reset-button') ;
const submitButton = document.getElementById ('submit-button') ; 
const timerDisplay = document.getElementById ('timer') ; 
const scoreDisplay = document.getElementById ('score') ; 
const userGuessInput = document.getElementById ('user-guess') ; 
const scrambledWordDisplay = document.getElementById ( 'scrambled-word');
const usernameInput = document.getElementById ( 'username') ; 
const welcomeScreen = document.getElementById ('welcome-screen') ; 
const gameScreen = document.getElementById ('game-screen') ; 

let timerInterval;
let currentWord;
let score = 0 ;
let timeLeft = 60 ; // 1 minute 

let words = [ 'rainbow', 'flower', 'computer', 'keyboard', 'coding', 'javascript', 'challange', 'puzzle', 'tree', 'matrix', 'method', 'property', 'addition', 'subtraction', 'cat', 'earth', 'car', 'gold', 'rice', 'energy', 'cold', 'mars', 'space', 'moon', 'plant', 'stars', 'racoon', 'bear', 'tag', 'stack', 'graph', 'promise', 'function', 'smile', 'node'];

function scrambleWord (word) {
  return word.split (''). sort (() => Math.random () - 0.5).join ('');
}

function pickWord () {
  return words [math.floor(Math.random() * words.length)] ;
}

function startGame() {
   const username = usernameInput.value.trim()
  if (username) {
    welcomeScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    currentWord = pickWord() ;
    scrambledWordDisplay.textContent = scrambleWord (currentWord) ; 
    timerInterval = setInterval (updateTimer, 1000);
    score = 0; // Reset score to 0 at the start of the game 
    scoreDisplay.textContent = score; // Update the score Display 
  } else {
    alert ('Please enter username to start game.');
     }
  }

function updateTimer () {
  timerDisplay.textContent = timeLeft; 
  if (timeLeft <= 10) {
    gameScreen.classList.add('urgent');
    }
  if (timeLeft > 0) {
    timeLeft--;
  }else{
    clearInterval(timerInterval);
    alert ('Time is up! Your final score is: ' + score);
    resetGame();
       }
    }

function resetGame() {
  clearInterval (timerInterval);
  timeLeft = 60;
  timerDisplay.textContent = timeLeft;
  gameScreen.classList.remove('urgent');
  score = 0;
  scoreDisplay.textContent = score ; 
  userGuessInput.value = '';
  usernameInput.value = '';
  welcomeScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
}

function checkGuess() {
  if (userGuessInput.value.toLowerCase() === currentWord.toLowerCase()) {
    score++;
    scoreDisplay.textContent = score;
    localStorage.setItem('wordScrambleScore', score) ; 
    currentWord = pickWord();
    scrambledWordDisplay.textContent = scrambleWord (currentWord);
    userGuessInput.value = '';
    timeLeft = 60;

    // Adding a class to trigger animation
    scrambledWordDisplay.classList.add ('correct-guess');

    // Remove the animation after a certain time 
    setTimeout(() => {
      scrambledWordDisplay.classList.remove('correct-guess');
      }, 100);
  }else{
    alert('Try again!');
    }
  }

// Load score from Local Storage , if one exists
window.onload = () => {
  let savedScore = localStorage.getItem('WordScrambleScore');
  if (savedScore){
    score = parseInt (savedScore);
    scoreDisplay.textContent = score;
  }
};

// Event Listeners 
startButton.addEventListener('click', startGame); 
resetButton.addEventListener('click' , resetGame);
submitButton.addEventListener('click', checkGuess);





