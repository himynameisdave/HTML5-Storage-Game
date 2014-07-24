/*		WELCOME TO THE SETUP FOR DEV TYCOON		*/

//	Player constructor
function Player(name){
	this.name  	= name;
	this.lvl   	= 1;
	this.xp	   	= 75;
	this.money 	= 10000;
	this.devcap = 1;
	this.day	= 1;
};

var lvlXpMult = 1.61803398875;
// LevelsMap holds all data regarding how much XP is needed to reach each level
levelsMap = {

		lvl1: 	75 	
	,	lvl2: 	Math.pow(lvlXpMult, 9.5)
	,	lvl3: 	Math.pow(lvlXpMult, 10)
	,	lvl4: 	Math.pow(lvlXpMult, 10.5)
	,	lvl5: 	Math.pow(lvlXpMult, 11)
	,	lvl6: 	Math.pow(lvlXpMult, 11.5)
	,	lvl7: 	Math.pow(lvlXpMult, 12)
	,	lvl8: 	Math.pow(lvlXpMult, 12.5)
	,	lvl9: 	Math.pow(lvlXpMult, 13)
	,	lvl10: 	Math.pow(lvlXpMult, 13.5)
	,	lvl11: 	Math.pow(lvlXpMult, 14)
	,	lvl12: 	Math.pow(lvlXpMult, 14.5)
	,	lvl13: 	Math.pow(lvlXpMult, 15)
	,	lvl14: 	Math.pow(lvlXpMult, 15.5)
	,	lvl15: 	Math.pow(lvlXpMult, 16)
	,	lvl16: 	Math.pow(lvlXpMult, 16.5)
	,	lvl17: 	Math.pow(lvlXpMult, 17)
	,	lvl18: 	Math.pow(lvlXpMult, 17.5)
	,	lvl19: 	Math.pow(lvlXpMult, 18)
	,	lvl20: 	Math.pow(lvlXpMult, 18.5)

};

//a simple regex plugin that adds commas to $krilla
$.fn.commaAtMeBro = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
}



