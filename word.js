const Letter = require('./letter');         //getting the constructor function from letter.js for functionality

let Word = function (mysteryWord) {
    this.mysteryWord = mysteryWord          //mysteryWord contains the array of corresponding Letter objects for each Word object
}

Word.prototype.guesses = function (incomingArgument) {
    for (var i = 0; i < this.mysteryWord.length; i++) {
        this.mysteryWord[i].checkedIfGuessed(incomingArgument)  //for each object in the mysteryWord array, it runs the checkedIfGuessed method in the Letter object and updates the checked boolean if necessary.
    }
}

Word.prototype.stringedWord = function () {
    var word = [];
    for (var i = 0; i < this.mysteryWord.length; i++) {
        word.push(this.mysteryWord[i].returnValue()) //for each object in the mysteryWord array, the object is running the returnValue method and returning a character based on 
        //whether the letter has been guessed yet or not
    }
    return word.join(" ")
}

module.exports = Word;

