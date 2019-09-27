let cli = () => {
    const Word = require('./word');
    const Letter = require('./letter')              //requiring local as well as outside resources to make everything work.
    const inquirer = require('inquirer')



 
    let wordArr = []
    let word1 = new Word([
        new Letter("a"),
        new Letter("p"),
        new Letter("p"),
        new Letter("l"),                    //words being constructed. Each letter is a Letter object
        new Letter("e")
    ]);
    wordArr.push(word1)

    let word2 = new Word([
        new Letter("m"),
        new Letter("o"),
        new Letter("n"),
        new Letter("k"),
        new Letter("e"),
        new Letter("y"),
        new Letter("s")
    ]);
    wordArr.push(word2)

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
    wordArr.push(word3)


    
    let userGuess = null                //global variables that get populated throughout the course of the application
    let incorrectGuessesLeft = 9;
    let currentWord = wordArr[(Math.floor((Math.random() * 3)))]            //assigns the number of incorrect guesses users get and randomly chooses one of the words to be the objective.
    //console.log(currentWord)

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

    let logic = () => {         //the actual flow of the game goes in this function
        if (incorrectGuessesLeft > 0 && currentWord.stringedWord().includes("_")) {    //if there are still guesses left and the word isn't completely guessed then prompt the user
            inquirer
                .prompt([
                    {
                        name: "guess",
                        message: "Guess a letter that might be in the word"
                    }]).then(function (response) {
                        userGuess = response.guess;
                        if (guessRightOrWrong(userGuess)) {     //if the guess is a letter that is contained w/in the objective
                            currentWord.guesses(userGuess)      //update the letters letter's guessed value and console log that they got the correct answer.
                            console.log(`
Correct! You have ${incorrectGuessesLeft} incorrect guesses left! 
${currentWord.stringedWord()}
      
        `);
                            logic();                    //run the logic flow over again after a correct answer
                            return;
                        } else if (!guessRightOrWrong(userGuess)) {         //if the guessed letter is not w/in the objective word decrease the number of guesses they have left
                            incorrectGuessesLeft--
                            if (incorrectGuessesLeft > 0) {             //consolelog that they were incorrect and rerun the logic flow
                                console.log(
                                    `
Incorrect! You have ${incorrectGuessesLeft} incorrect guesses left! 
${currentWord.stringedWord()}
        
        `)
                                logic()
                                return;
                            } else if (incorrectGuessesLeft === 0) {        //after an incorrect answer is made if the guesses left total reaches zero the game tells the user they've lost and resets
                                console.log(`Oops! You lost this round, how about you try again.`)
                                reset()
                                return;
                            }
                        } return;
                    })
            //console.log(guessRightOrWrong(userGuess))                                    
        } else if (incorrectGuessesLeft > 0 && !currentWord.stringedWord().includes("_")) {         //if when the initial logic flow starts the user still has guesses left, but the word's letters have all been guessed, the user wins and the game resets.
            console.log(`Congratulations! You correctly guessed ${currentWord.stringedWord().replace(/ /g, "")}`)
            reset()
            return;
        }
        return;
    }
    logic()        //initial start up of logic flow.
    return;
}
cli()               //initial app start


