/*		WELCOME TO THE SETUP FOR DEV TYCOON		*/

/*
==================================
	+		Utilities		+	
==================================*/
	
//a simple regex plugin that adds commas to $krilla
$.fn.commaAtMeBro = function(){ 
    return this.each(function(){ 
        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
    })
};

//random number, min, max
function rn(min, max){
	return (Math.floor( Math.random() * max ) + min);
};

function findMeAClient(l){
	return clientsMap[l][rn(0,2)];
};

//=================================End utilities




//	Player constructor
function Player(name){
	this.name  	= name;
	this.lvl   	= 1;
	this.xp	   	= 75;
	this.money 	= 10000;
	this.devcap = 1;
	this.day	= 1;
	this.currentProjects = {};
};

//	Project constructor
function Project(level){

	var lvl = 'lvl' + level;
	this.funNum	= projectsMap[lvl];

	this.days		= Math.round(this.funNum / 2);
	this.daysLeft	= this.days; 
	this.xpGiven	= this.funNum * rn(2,4)
	this.billings	= this.funNum * rn(2,4) + this.xpGiven/2;

	this.client		= findMeAClient(lvl);


};


var lvlXpMult = 1.61803398875;
// LevelsMap holds all data regarding how much XP is needed to reach each level
levelsMap = {

		'lvl1': 	75 	
	,	'lvl2': 	Math.pow(lvlXpMult, 9.5)
	,	'lvl3': 	Math.pow(lvlXpMult, 10)
	,	'lvl4': 	Math.pow(lvlXpMult, 10.5)
	,	'lvl5': 	Math.pow(lvlXpMult, 11)
	,	'lvl6': 	Math.pow(lvlXpMult, 11.5)
	,	'lvl7': 	Math.pow(lvlXpMult, 12)
	,	'lvl8': 	Math.pow(lvlXpMult, 12.5)
	,	'lvl9': 	Math.pow(lvlXpMult, 13)
	,	'lvl10': 	Math.pow(lvlXpMult, 13.5)
	,	'lvl11': 	Math.pow(lvlXpMult, 14)
	,	'lvl12': 	Math.pow(lvlXpMult, 14.5)
	,	'lvl13': 	Math.pow(lvlXpMult, 15)
	,	'lvl14': 	Math.pow(lvlXpMult, 15.5)
	,	'lvl15': 	Math.pow(lvlXpMult, 16)
	,	'lvl16': 	Math.pow(lvlXpMult, 16.5)
	,	'lvl17': 	Math.pow(lvlXpMult, 17)
	,	'lvl18': 	Math.pow(lvlXpMult, 17.5)
	,	'lvl19': 	Math.pow(lvlXpMult, 18)
	,	'lvl20': 	Math.pow(lvlXpMult, 18.5)

};


projectsMap = {

		//Max = init 10, * 1.61803 each time
		//Min = half of prev level's max
		'lvl1': rn(4,10)
	,	'lvl2': rn(5,16)
	,	'lvl3': rn(8,26)
	,	'lvl4': rn(13,42)
	,	'lvl5': rn(21,69)
	,	'lvl6': rn(35,111)
	,	'lvl7': rn(56,179)
	,	'lvl8': rn(90,290)
	,	'lvl9': rn(145,470)
	,	'lvl10': rn(235,760)
	,	'lvl11': rn(380,1230)
	,	'lvl12': rn(615,1989)
	,	'lvl13': rn(995,3220)
	,	'lvl14': rn(1610,5210)
	,	'lvl15': rn(2605,8429)
	,	'lvl16': rn(4215,13640)
	,	'lvl17': rn(6820,22069)
	,	'lvl18': rn(11035,35709)
	,	'lvl19': rn(17855,57777)
	,	'lvl20': rn(28888,93486)
};

clientsMap = {

		'lvl1': 	["Jim's Pizza", "Franks Franks", "Bob's Hot Dogs"]	
	,	'lvl2': 	["Jimmy Pesto's","A&E Travel","Edward Scissor Hands Barber"]
	,	'lvl3': 	["Hey Awesome!","Candy N' Fruit","Ken's Karate"]
	,	'lvl4': 	["ABC Medical Center","Foster Community College","Hella Tight Autobody"]
	,	'lvl5': 	["Christan Christianson Christian Bible Studies","Falafel Waffel","Bob's Burgers"]
	,	'lvl6': 	["Mill Street Brewey","Ghostbusters","Goats and Other Children's Stuff"]
	,	'lvl7': 	["Booksnob","Hardware Express","Big Manly Truck Co."]
	,	'lvl8': 	["Decker's Construction","Valma's Yoga","Shaggy's Yoga Mats"]
	,	'lvl9': 	["Shitake Shushi","Generic Restaraunt","Midtown Appliance"]
	,	'lvl10': 	["Downtown Appliance","Say Cheese","Bistro 422"]
	,	'lvl11': 	["Builders Union","The Torono Star","Jones Soda Co."]
	,	'lvl12': 	["Arizona Iced Tea","The National Post","Kicking Horse Coffee"]
	,	'lvl13': 	["Express-o Coffee","Belmonts Cigarettes","Steamwhistle Brewing"]
	,	'lvl14': 	["Hugo Boss","Harry Rosen","Canada Goose"]
	,	'lvl15': 	["Forever 21","Louis Vutton","Prada"]
	,	'lvl16': 	["Untitled Bar","No Name Pub","Drinky McBeersys"]
	,	'lvl17': 	["Bina's Bellydancing School","Dan's Dogwalkers"]
	,	'lvl18': 	["Google","Trello","X Tech Solutions"]
	,	'lvl19': 	["Nike","Apple","Gucci"]
	,	'lvl20': 	["Smoke's Poutine","Honest Ed's","TTC"]

};


