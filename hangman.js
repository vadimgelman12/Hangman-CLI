var inquirer = require('inquirer')
var Word = require('./word.js')
var Game = require('./game.js');

var hangmanWords = [];
var randomIndex = 0;
var currentWord = "";


var guessesRemaining = 12;
var wrongGuesses = [];
var newWord = {};


function startGame(){

  guessesRemaining = 12;

  hangmanWords = Game.newWord.wordList;
  randomIndex = Math.floor(Math.random() * hangmanWords.length);
  currentWord = hangmanWords[randomIndex];  

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
     // show the masked word
     console.log(newWord.wordDisplay);
     console.log(guessesRemaining + " guesses remaining");
     guessWord();
    } else {
      console.log("Ok, bye");
    }
  });
}

function guessWord() {
  inquirer.prompt([
    {
     name: "guess",
     type: "input",
     message: "Pick a letter a-z" 
    }
    ]).then(function(response){ 
      if(currentWord.indexOf(response.guess)!== -1 && guessesRemaining > 0){
        for (index in newWord.letterArray) {
          if(response.guess === newWord.letterArray[index].guess) {
            var newLetter = newWord.letterArray[index];
            newLetter.letterGuessed = true;
            newLetter.letterCheck();
            console.log("Yes!  There is a/an " + response.guess + "!");
          }
        }
        newWord.displayWord();
        console.log(newWord.wordDisplay);
        guessesRemaining--;
        console.log(guessesRemaining + " guesses remaining!");

        if (!newWord.wordDisplay.includes("_")) {
          // if there are no unguessed letters then the word was guessed
          console.log("you win!!");
          startGame();
          return;
        }        
        guessWord();


      } else if (response.guess.indexOf(currentWord) < 0 && guessesRemaining > 0) {
        console.log("No, Sorry!  There is no " + response.guess + "!");
        wrongGuesses.push(response.guess);
        console.log(newWord.wordDisplay);
        guessesRemaining--;
        console.log(guessesRemaining + " guesses remaining!");

        guessWord();

      } else{        
        console.log("game over!");
        startGame();
        return;
      }
    })
  }


startGame();
