var inquirer = require('inquirer')
var Word = require('./word.js')
var Game = require('./game.js');

var hangmanWords = Game.newWord.wordList;

var randomIndex = Math.floor(Math.random() * hangmanWords.length);


var currentWord = hangmanWords[randomIndex];

console.log(currentWord);

var guessesRemaining = 12;

var wrongGuesses = [];

var newWord = {};

function startGame(){
  inquirer.prompt([
  {
    name:"playgame",
    type:"confirm",
    message:"Do you Want to play Hangman?",
    default: true
  }    
  ]).then(function(response){
    if (response.playgame === true) {
     newWord = new Word(currentWord);
     console.log("Let's Play!!!!!!") ;
     console.log("*****************") ;    
     console.log(newWord.currentword);
     console.log(newWord.wordDisplay);
     console.log(guessesRemaining + " guesses remaining");
     guessWord();
    } else {
      console.log("Ok, bye");
    }
  });
}

function chooseWord() {
  return hangmanWords[(Math.floor(Math.random) * hangmanWords.length)];
};

function guessWord() {
  inquirer.prompt([
    {
     name: "guess",
     type: "input",
     message: "Guess a letter" 
    }
    ]).then(function(response){ 
      if(currentWord.indexOf(response.guess)!== -1 && guessesRemaining > 0){
        // var newLetter = new Letter(response.guess);
        for (index in newWord.letterArray) {
          if(response.guess === newWord.letterArray[index].guess) {
            var newLetter = newWord.letterArray[index];
            newLetter.letterGuessed = true;
            newLetter.letterCheck();
            console.log(newLetter);
          }
        }
        newWord.displayWord();
        console.log(newWord.wordDisplay);
        guessesRemaining--;
        console.log(guessesRemaining + " guesses remaining!");
        guessWord();
      } else if (response.guess.indexOf(currentWord) < 0 && guessesRemaining > 0) {
        console.log("Wrong Answer!");
        wrongGuesses.push(response.guess);
        guessesRemaining--;
        guessWord();

      } else{
        return;
        console.log("game over!");
        startGame();
      }
    })
  }


startGame();
