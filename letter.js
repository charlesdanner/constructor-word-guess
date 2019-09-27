let Letter = function(value) {
    this.value = value;         //value of the letter. (is a string)
    this.guessed = false;       //boolean stating whether the letter has been guessed yet or not. starts at false
}

Letter.prototype.returnValue = function () {
    if (this.guessed === true) {          //when this is called returns the value of the letter in string form if the letter has been guessed or an underscore if it hasn't been guessed
        return this.value.toUpperCase()
    } else return "_"
}

Letter.prototype.checkedIfGuessed = function(x){
    if(x === this.value){
        this.guessed = true
    }
}



module.exports = Letter         //exporting the constructor function so word.js has access to this functionality