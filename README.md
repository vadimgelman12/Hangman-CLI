# Hangman-CLI
Node Hangman

This is a console variation of the hangman game.  It leverages the npm inquirer package for prompting and response.  The following components make up the game:

hangman.js is the main file and entry point
letter.js has a function that checks the letter and either returns the letter for display or a _
game.js contains the word list that is picked from
word.js leverages letter.js and does the display/search functionality for the word.

To start the game enter the following command
in Git Bash: node hangman.js

the player will get 12 chances to solve the puzzle

The game ends when the player either solves word or runs out of chances.
