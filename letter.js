var Letter = function(letter){
  this.guess = letter;
  this.letterGuessed = false;
  
  this.letterCheck = function(){
    if(!this.letterGuessed){
     return this.guess
    } else {
      return "_"
    }
  };
  
};



module.exports = Letter;