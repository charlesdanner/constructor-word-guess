let container = () => {
    const fs = require('fs')                                 //container function to keep all variables off global scope
    const Word = require('./word');
    const Letter = require('./letter');              //requiring local as well as outside resources to make everything work.
    const inquirer = require('inquirer');
    const colors = require('colors');
    
    let wins = 0;
    let losses = 0;         //win and loss variables get updated after each time the user either wins or loses
    let wordArr = []        //this gets populated only once with the words in the words.txt file becoming Word objects with Letter objects inside an array within the Word object.

    let initializeGame = () => {    //function that populates the array of words the computer can choose from and initializes the game afterwards.
        fs.readFile("words.txt", "utf-8", (error, data) =>{
            wordArr;
            
            if(error) {
                console.log(error)          //if there's an error, console log it
            } else{
                let dataArr = []                //creates an empty array that gets populated by the different animals in the words.txt file by splitting them from the comma.
                dataArr = data.split(",")
                for(let i = 0; i < dataArr.length; i++){    //for each animal in the data array create a new Word object
                    wordArr[i] = new Word ([])
                    for(let j = 0; j < dataArr[i].length; j++){     //for each letter in the animal string, create a Letter object and push it into the corresponding word object in the word array
                        let letter = new Letter(dataArr[i][j])
                        wordArr[i].mysteryWord.push(letter)         //after the Letter and Word objects have been successfully pushed into the correct spot, start the game
                    }
                } 
            }
            cli();               
        })
    }
    let cli = () => {       //function that controls the gameplay
        let userGuess = null                //variables that get populated throughout the course of the application and need to be changed when the user wins or loses
        let incorrectGuessesLeft = 9;
        let currentWord = wordArr[(Math.floor((Math.random() * 6)))];            //assigns the number of incorrect guesses users get and randomly chooses one of the words to be the objective.
        let guessesMade = [];

        let guessRightOrWrong = (userGuess) => {
            let rightOrWrong = false;
            for (let i = 0; i < currentWord.mysteryWord.length; i++) {                          //function checking to make sure the result matches one of the letters in the word 
                if (userGuess === currentWord.mysteryWord[i].value) {
                    rightOrWrong = true
                }
            } return rightOrWrong
        }

        let reset = () => {         //when a user has won or lost, this game resets the values of the current Word object's Letter objects in the array to have a value of false for guessed
            for (let letter in currentWord.mysteryWord) {  
                currentWord.mysteryWord[letter].guessed = false     //also reruns the function that runs the game's logic
            }           
            cli()
        }

        let userGuessAndCheck = () => {
            inquirer
                .prompt([
                    {
                        name: "guess",
                        message: `${currentWord.stringedWord()}`.green + `                           Previous Guesses: ${guessesMade.join(", ")}

Guess a single letter that might be in the word`.yellow,
                        validate: function (value) {            //validation checking the user input for the desired input parameters.
                            let letters = /^[A-Za-z]+$/;
                            if (value.match(letters) && (value.length === 1) && (!guessesMade.includes(value.toUpperCase()))) {
                                return true;
                            }
                            return false;
                        }
                    }
                ]).then(function (response) {
                    userGuess = response.guess.toLowerCase();   //saves user input as userGuess variable, but makes it lower case if caps lock is on
                    guessesMade.push(userGuess.toUpperCase())
                    if (guessRightOrWrong(userGuess)) {     //if the guess is a letter that is contained w/in the objective
                        currentWord.guesses(userGuess)      //update the letters letter's guessed value and console log that they got the correct answer.
                        console.log(`-------------------------------------------------------

` + "Correct!".green + ` You have ` + `${incorrectGuessesLeft}`.yellow +  ` incorrect guesses left! 
      
-------------------------------------------------------        `);
                        logic();                    //run the logic flow over again after a correct answer
                        return;
                    } else if (!guessRightOrWrong(userGuess)) {         //if the guessed letter is not w/in the objective word decrease the number of guesses they have left
                        incorrectGuessesLeft--
                        if (incorrectGuessesLeft > 0) {             //consolelog that they were incorrect and rerun the logic flow
                            console.log(
                                `-------------------------------------------------------

` + `Incorrect!`.red +  ` You have ` + `${incorrectGuessesLeft}`.yellow + ` incorrect guesses left! 
        
-------------------------------------------------------        `)
                            logic()
                            return;
                        } else if (incorrectGuessesLeft === 0) {        //after an incorrect answer is made if the guesses left total reaches zero the game tells the user they've lost and resets
                            losses++
                            console.log(`-------------------------------------------------------
                            ` + ` 
                            Oops! You lost this round, how about you try again!`.america + `             Current Record: ` + `${wins}`.green + ` - ` + `${losses}`.red + `

-------------------------------------------------------`)
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
                console.log(`-------------------------------------------------------
                ` + ` 
                Congratulations! You correctly guessed `.rainbow + `"` + `${currentWord.stringedWord().replace(/ /g, "")}`.brightGreen + `"            Current Record: ` + `${wins}`.green + ` - ` + `${losses}`.red + `

-------------------------------------------------------                `)
                reset();
                return;
            }
            return;
        }
        logic();        //initial start up of logic flow.
        return;
     }
     initializeGame()
 }
container();