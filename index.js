let container = () => {      //container function to keep all variables off global scope
    const Word = require('./word');
    const Letter = require('./letter');              //requiring local as well as outside resources to make everything work.
    const inquirer = require('inquirer');

    let wins = 0;
    let losses = 0;
    let wordArr = [];
    let word1 = new Word([
        new Letter("a"),
        new Letter("p"),
        new Letter("p"),
        new Letter("l"),                    //words being constructed. Each letter is a Letter object
        new Letter("e")
    ]);
    wordArr.push(word1);

    let word2 = new Word([
        new Letter("m"),
        new Letter("o"),
        new Letter("n"),
        new Letter("k"),
        new Letter("e"),
        new Letter("y"),
        new Letter("s")
    ]);
    wordArr.push(word2);

    let word3 = new Word([
        new Letter("a"),
        new Letter("l"),
        new Letter("l"),
        new Letter("i"),
        new Letter("g"),
        new Letter("a"),
        new Letter("t"),
        new Letter("o"),
        new Letter("r")
    ]);
    wordArr.push(word3);

    let cli = () => {
        let userGuess = null                //variables that get populated throughout the course of the application and need to be changed when the user wins or loses
        let incorrectGuessesLeft = 9;
        let currentWord = wordArr[(Math.floor((Math.random() * 3)))];            //assigns the number of incorrect guesses users get and randomly chooses one of the words to be the objective.


        let guessRightOrWrong = (userGuess) => {
            var rightOrWrong = false;
            for (var i = 0; i < currentWord.mysteryWord.length; i++) {                          //function checking to make sure the result matches one of the letters in the word 
                if (userGuess === currentWord.mysteryWord[i].value) {
                    rightOrWrong = true
                }
            } return rightOrWrong
        }

        let reset = () => {
            for (var i = 0; i < currentWord.mysteryWord.length; i++) {              //function that resets the game by resetting all boolean values measuring whether the letter has been guessed or not to false
                currentWord.mysteryWord[i].guessed = false;                         //makes the game play again
            }
            cli()
        }

        let userGuessAndCheck = () => {
            inquirer
                .prompt([
                    {
                        name: "guess",
                        message: ` ${currentWord.stringedWord()}

Guess a single letter that might be in the word`,
                        validate: function (value) {            //validation checking the user input for the desired input parameters.
                            var letters = /^[A-Za-z]+$/;
                            if (value.match(letters) && value.length === 1) {
                                return true;
                            }
                            return false;
                        }
                    }
                ]).then(function (response) {
                    userGuess = response.guess.toLowerCase();   //saves user input as userGuess variable, but makes it lower case if caps lock is on
                    if (guessRightOrWrong(userGuess)) {     //if the guess is a letter that is contained w/in the objective
                        currentWord.guesses(userGuess)      //update the letters letter's guessed value and console log that they got the correct answer.
                        console.log(`-------------------------------------------------------

Correct! You have ${incorrectGuessesLeft} incorrect guesses left! 
      
-------------------------------------------------------        `);
                        logic();                    //run the logic flow over again after a correct answer
                        return;
                    } else if (!guessRightOrWrong(userGuess)) {         //if the guessed letter is not w/in the objective word decrease the number of guesses they have left
                        incorrectGuessesLeft--
                        if (incorrectGuessesLeft > 0) {             //consolelog that they were incorrect and rerun the logic flow
                            console.log(
                                `-------------------------------------------------------

Incorrect! You have ${incorrectGuessesLeft} incorrect guesses left! 
        
-------------------------------------------------------        `)
                            logic()
                            return;
                        } else if (incorrectGuessesLeft === 0) {        //after an incorrect answer is made if the guesses left total reaches zero the game tells the user they've lost and resets
                            losses++
                            console.log(`Oops! You lost this round, how about you try again!            Current Record: ${wins} - ${losses}`)
                            reset()
                            return;
                        }
                    } return;
                })
        }

        let logic = () => {         //the actual flow of the game goes in this function

            if (currentWord.stringedWord().includes("_")) {    //if the word isn't completely guessed, then run the guessAndCheck function 

                userGuessAndCheck();       //meat and potatoes of the application. Check this function out!

            } else if (!currentWord.stringedWord().includes("_")) {         //if when the initial logic flow starts the word's letters have all been guessed, the user wins and the game resets.
                wins++
                console.log(`Congratulations! You correctly guessed "${currentWord.stringedWord().replace(/ /g, "")}"            Current Record: ${wins} - ${losses}`)
                reset();
                return;
            }
            return;
        }
        logic();        //initial start up of logic flow.
        return;
    }
    cli();               //initial app start
}
container();