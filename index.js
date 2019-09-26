const Word = require('./word');
const Letter = require('./letter')
const prompt = require('prompt')

let wordArr = []
let word1 = new Word([
    new Letter("a"),
    new Letter("p"),
    new Letter("p"),
    new Letter("l"),
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

let cli = () => {
    let incorrectGuessesLeft = 9;
    let currentWord = wordArr[(Math.floor((Math.random() * 3)))]
    //console.log(currentWord)

    let guessRightOrWrong = (userGuess) => {
        var rightOrWrong = false;
        for (var i = 0; i < currentWord.mysteryWord.length; i++) {                          //function checking to make sure the result matches one of the 
            if (userGuess === currentWord.mysteryWord[i].value) {
                rightOrWrong = true
            }
        } return rightOrWrong
    }

    let reset = () => {
        incorrectGuessesLeft = 9;
        for (var i = 0; i < currentWord.length; i++) {
            currentWord[i].guessed = false;
        }
        currentWord = wordArr[(Math.floor((Math.random() * 3)))]
        userGuesses()
    }


    prompt.start();

    let userGuesses = () => {


        if (incorrectGuessesLeft > 0 && currentWord.stringedWord().includes("_")) {    //if there are still guesses left and the word doesn't contain any underscores
            prompt.get(['guess'], (err, result) => {
                let userGuess = result.guess;
                console.log(guessRightOrWrong(userGuess))                                    //get a prompt

                if (guessRightOrWrong(userGuess)) {
                    currentWord.guesses(userGuess)
                    console.log(`
Correct! You have ${incorrectGuessesLeft} incorrect guesses left! 
${currentWord.stringedWord()}

`);
                    userGuesses()
                    return;

                } else if (!guessRightOrWrong(userGuess)) {
                    incorrectGuessesLeft--
                    if (incorrectGuessesLeft > 0) {
                        console.log(
                            `
Incorrect! You have ${incorrectGuessesLeft} incorrect guesses left! 
${currentWord.stringedWord()}

`)
                        userGuesses()
                        return;
                    } else if (incorrectGuessesLeft === 0) {
                        console.log(`Oops! You lost this round, how about you try again.`)
                        reset()
                        return;
                    }
                }

            })
        } else if (incorrectGuessesLeft > 0 && !currentWord.stringedWord().includes("_")) {
            console.log(`Congratulations! You correctly guessed ${currentWord.stringedWord().replace(/ /g, "")}`)
            reset()
            return;
        }
    }

    userGuesses()

}

cli()


