# constructor-word-guess

## Description

This application is run through the terminal by utilizing javascript and node.js. The objective is for users to play a simple game of "Hang Man" against the computer. The computer selects a word from a list in the words.txt file and the user needs to guess letters one at a time until they either complete the word or run out of guesses. The game uses several different node modules and object constructors in order to achieve the goal. There are much simpler ways to build a word guess game. For a more simple version you can look at the wordguessgame repository on my GitHub repository list; however, this was mainly created as a learning exercise to become more adept at constructing and utilizing objects.

## Prerequisites

There are a few prerequisites to using this application. First, you will need to install the NPM inquirer as well as the NPM colors. Inquirer is necessary, because it is what allows the user to input their guesses into the terminal. Colors is needed, because it the terminal more interesting from a visual perspective. If the user does not install colors, they will receive error messages saying that several lines of text that are logged into the terminal are not functions and the application will be unusable. 

## Under the Hood

The objective for this project was to use object constructors and practice using them in a realistic way. To do this, the first thing that was needed was to create the object constructors. Inside the letter.js and word.js files are their relative object constructors, functions that are altering the object's prototype and the function that is exporting the constructors. The .gitignore file is keeping the node modules and package-lock.json files from being uploaded to GitHub, because the files are fairly large, or not necessary for this application. Words.txt is the file that contains all the words that the computer can draw from in order to ask the user to guess letters for. 

The game is reading the words from the words.txt file by acquiring the file system and reading the value of the word.txt file. It is then splitting each word into its own index inside of an array. In order to make these words into a constructor object, I needed to create a for loop inside of a for loop. Essentially, for each entry into the data array that the words in words.txt populate inside the newly created array, a new Word object is created inside of the array that the computer will be drawing the objects from to populate the game. For each of the Word objects, another for loop is run to get the values of the letters within each word that is in the corresponding index number from the data array that is created when reading the word.txt file. For each letter the value of that letter is put into the argument of a new Letter object that is being pushed into the array that inside of the housing Word object. So, for each word in the words.txt file, there is a corresponding Word object, that contains a Letter object for each letter that the word has in it. So for the word "Rabbit" the Word object would have a letter object for the "r", "a", "b" and so on.

Once the words and letter objects have been created, the computer initializes the actual game. There are a few variables inside the function that controls the flow of the game that need to be reset to their default values every time the game is won or lost. These values are: which word is randomly selected, how many guesses the user has left before they lose and the array that contains the guesses that the user has already made. 

The game's logic is initially split in half. Either the user has letters in the word that need to be guessed still or they don't. If the word doesn't have any more blank spaces, then the user wins. Otherwise, the prompt appears and asks the user to guess. When the user makes a guess, the value of the letter is referenced to each letter object in the Word object that has been chosen and looks for a match. If there is a match, then the boolean value of the .guessed key is inside that letter is changed from false to true. When the value is true, the letter will return a value equal to the value of the .value property. In other words the "t" Letter object will return a "t". If the value is false, then it will return an underscore. When the user's guess is not a word in the word they're guessing they lose a remaining guess. A nested conditional statement says that if the user's guesses go to 0, then log the message that states they've lost and reset the game. If the user gets the guess right, then the app simply reruns the logic for the game and if the word doesn't contain any underscores they win, otherwise they keep guessing.

## Built With

* JavaScript
* Node.JS
* Inquirer NPM
* Colors NPM

### Authors

* Charles Danner - https://github.com/charlesdanner

### Link

Since this application runs in the terminal and requires the user to download a couple different node modules, a working version can't be linked to; however, below is a link to a screen recording of the application working.

https://github.com/charlesdanner/constructor-word-guess/blob/master/recording/screen-recording.wmv
