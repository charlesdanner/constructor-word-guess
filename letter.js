let Letter = function(value) {
    this.value = value;         //value of the letter. (is a string)
    this.guessed = false;       //boolean stating whether the letter has been guessed yet or not. starts at false
    this.returnValue = function(){
        if(this.guessed === true){          //when this is called returns the value of the letter in string form if the letter has been guessed or an underscore if it hasn't been guessed
            return this.value;
        } else return "_"
    }
    this.checkedIfGuessed = function(x){    //if the incoming argument equals the value of this letter, then it changes the guessed boolean to true.
        if(x === this.value){
            this.guessed = true
        }
    }
}



module.exports = Letter         //exporting the constructor function so word.js has access to this functionality