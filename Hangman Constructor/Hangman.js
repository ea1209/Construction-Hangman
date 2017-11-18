var inquirer = require("inquirer");
var prompt = require("prompt");
var letter = function(show) {
		this.value = show;
		this.appear = false;
		this.letterRender = function() {
			if (this.appear == '') {
				return "_"

			}
		};
	}	

console.log("Welcome to Coding Hangman!");
console.log("-----------------------------");
prompt.start();


function Word(target) {
	this.target = target;
	this.let = [];
	this.found = false;
	this.getLet = function() {
		for (var i=0; i < this.target.length; i++) {
			this.let.push( new letter(this.target[i]));
		}
	};

	this.findWord = function() {
		this.found = this.let.every(function(currLett) {
			return currLett.appear;
		});
		return this.found;
	};

	this.checkLetter = function(guessLet) {
		var toReturn = 0;

		for (var i = 0; i < this.let.length; i++) {
			if (this.let[i].value == guessLet){
				this.let[i].appear = true;
				toReturn++;
			}
		}
		return toReturn;
	};

	this.wordRender = function() {
		var string = '';
		for (var i=0; i < this.let.length; i++){
			string += this.let[i].letterRender();
		}
		return string;
	};



}



game = {
 	wordBank: ['november', 'sweat', 'rider', 'canvas', 'story', 'saturday', 'personal'],
 	wordsWon: 0,
 	guessesRemaining: 10,
 	currentWrd: null,
 	
 	startGame: function (wrd) {
 		this.resetGuesses();
 		this.currentWrd = new Word(this.wordBank[Math.floor(Math.random()* this.wordBank.length)]);
 		this.currentWrd.getLet();
 		this.promptUser();
 	},

 	resetGuesses: function(){
 		this.guessesRemaining = 10;
 	},

 	promptUser: function(){
 		var self = this;
 		prompt.get(['guess'], function(err, result){
 			console.log("You guessed: " + result.guess);
 			var manyGuessed = self.currentWrd.checkLetter(result.guess);

 			if(manyGuessed ==0) {
 				console.log("WRONG");
 				self.guessesRemaining--;
 				
 			} else {
 				console.log("CORRECT");
 					if(self.currentWrd.findWord()){
 						console.log("You won!");
 						console.log("-------------------");
 						return;
 					}
 			}

 			console.log("Guesses remaining: " + self.guessesRemaining);
 			console.log("-------------------");
 			if((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
 				self.promptUser();
 			}
 			else if(self.guessesRemaining ==0){
 				console.log("Game over. Correct Word ", self.currentWrd.target);
 			} else {
 				console.log(self.currentWrd.wordRender());
 			}
 		});

 	}


};

game.startGame();

