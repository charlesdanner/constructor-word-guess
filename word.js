const Letter = require('./letter');         //getting the constructor function from letter.js for functionality

let Word = function (mysteryWord) {
    this.mysteryWord = mysteryWord          //mysteryWord contains the array of corresponding Letter objects for each Word object
    this.guesses = function (X) {
        for(var i = 0; i < mysteryWord.length; i++){
            this.mysteryWord[i].checkedIfGuessed(X)  //for each object in the mysteryWord array, it runs the checkedIfGuessed method in the Letter object and updates the checked boolean if necessary.
        }
    }
    this.stringedWord = function () {
        var word = [];
        for (var i = 0; i < this.mysteryWord.length; i++) {
            word.push(this.mysteryWord[i].returnValue(this.mysteryWord[i])) //for each object in the mysteryWord array, the object is running the returnValue method and returning a character based on 
                                                                                //whether the letter has been guessed yet or not
        }
        console.log(word.join(" "))
    }
}

let apple = new Word([
    new Letter("a"),
    new Letter("p"),
    new Letter("p"),
    new Letter("l"),
    new Letter("e")
]);

let monkeys = new Word([
    new Letter("m"),
    new Letter("o"),
    new Letter("n"),
    new Letter("k"),
    new Letter("e"),
    new Letter("y"),
    new Letter("s")
]);

var guess = process.argv[2]

var test = (X) =>{
    apple.guesses(X) 
    apple.stringedWord()
}    
test(guess)  

