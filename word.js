const Letter = require('./letter');

let Word = function (mysteryWord) {
    this.mysteryWord = mysteryWord
    this.guesses = function (X) {
        for(var i = 0; i < mysteryWord.length; i++){
            this.mysteryWord[i].checkedIfGuessed(X)  //changes the guess value of each letter
        }
    }
    this.stringedWord = function () {
        var word = [];
        for (var i = 0; i < this.mysteryWord.length; i++) {
            word.push(this.mysteryWord[i].returnValue(this.mysteryWord[i])) //prints the letters out on the screen

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

