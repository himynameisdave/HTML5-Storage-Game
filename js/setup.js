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
	this.xp	   	= 20;
	this.money 	= 100;
	this.devcap = 1;
	this.day	= 1;
	this.currentProjects = {};
	this.offices = {
		name: "Mom's Basement"
	};
};

//	Project constructor
function Project(level){

	var lvl = 'lvl' + level;
	this.funNum	= projectsMap[lvl];

	this.days		= Math.round(this.funNum / 2);
	this.daysLeft	= this.days; 
	this.xpGiven	= this.funNum;
	this.billings	= this.funNum * rn(2,4) + this.xpGiven/4;

	this.client		= findMeAClient(lvl);


};


function Modial(type,title,msg){

	this.type 	= type;
	this.title 	= title;
	this.msg 	= msg;

	this.drawModial = function(){

		if($('body').find('.modial')){

			var modNum = ($('.modial').length) + 1;
			var a = "<div id='modial-"+modNum+"' class='modial'><div class='inner-modial'>";
			var b = "<div id='close-modial-"+modNum+"' class='btn'>Close</div></div></div>";
			var mod = a+msg+b;
			$('body').append(mod);
			$( ('#close-modial-'+modNum) ).on('click',function(e){
				e.stopPropagation();
				closeModial(p,dayEnd,modNum);
			});

		}else{
			var a = "<div id='modial-1' class='modial'><div class='inner-modial'>";
			var b = "<div id='close-modial-1' class='btn'>Close</div></div></div>";
			var mod = a+msg+b;
			$('body').append(mod);
			$('#close-modial-1').on('click',function(e){
				e.stopPropagation();
				closeModial(p,dayEnd,1);
			});
		}

	};

};

function Developer(name, salary,unlockLvl){
	this.name 		= name;
	this.salary 	= salary;
	this.unlockLvl 	= unlockLvl;

	this.productivity = (this.salary/10);

};


var lvlXpMult = 1.61803398875;
// LevelsMap holds all data regarding how much XP is needed to reach each level
levelsMap = {

		'lvl1': 	20
	,	'lvl2': 	20 		* 2 	// 	40 		(diff: 20)
	,	'lvl3': 	26 		* 3 	//	78		(diff: 38)
	,	'lvl4': 	42		* 4 	//	168		(diff: 90)
	,	'lvl5': 	69 		* 5 	//  345		(diff: 177)
	,	'lvl6': 	111 	* 6 	//	
	,	'lvl7': 	179		* 7 	//
	,	'lvl8': 	290		* 8 	//
	,	'lvl9': 	470		* 9 	//
	,	'lvl10': 	760		* 10 	//
	,	'lvl11': 	1230	* 11	//
	,	'lvl12': 	1989	* 12 	//
	,	'lvl13': 	3220	* 13 	//
	,	'lvl14': 	5210	* 14 	//
	,	'lvl15': 	8429	* 15 	//
	,	'lvl16': 	13640	* 16 	//
	,	'lvl17': 	22069	* 17 	//
	,	'lvl18': 	35709	* 18 	//
	,	'lvl19': 	57777	* 19 	//	
	,	'lvl20': 	93486	* 20 	//

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
	,	'lvl17': 	["Bina's Bellydancing School","Dan's Dogwalkers","Deacon's (Better) Dogwalkers"]
	,	'lvl18': 	["Google","Trello","X Tech Solutions"]
	,	'lvl19': 	["Nike","Apple","Gucci"]
	,	'lvl20': 	["Smoke's Poutine","Honest Ed's","TTC"]

};

developers = [
		//Sweet name generator found here:
		//http://www.behindthename.com/
		
		new Developer('Johnny Smith'	,10,3),
		new Developer('Roswell Brooks'	,15,3),
		new Developer('Hubert Knight'	,20,3),

		new Developer('Leslie Kersey'	,30,5),
		new Developer('Fran Atkinson'	,35,6),
		new Developer('Chris Babcock'	,40,6),

		new Developer('Luana Rowe'		,50,8),
		new Developer('Fran Atkinson'	,55,9),
		new Developer('Dederick Fashingbauer'	,65,10),


		new Developer('George Lindsay'	,75,12),
		new Developer('Ithel Wash'		,80,13),
		new Developer('Xzavier Dickinson'	,85,14),

		new Developer('Gabriel Read'	,75,15),
		new Developer('Harper Stafford'	,80,16),
		new Developer('Dani Turnbull'	,85,17),

		new Developer('Svjetlana Bruno'	,100,18),
		new Developer('Gaggond Daimbeng'	,120,19),
		new Developer('Pitchforksower Stern'	,150,20),

];

randomPhrases = [
	
		"What a great day to be developing!"
	,	"Your eyes start to hurt from staring at code all day..."
	,	"More coffee, please!"
	,	"I'd really like some more coffee, please!"
	,	"Poutine, forever."
	,	"if(coffee){production++}"
	,	"'I'd like to >div< her legs, if ya know what I mean...'"
	,	"Your developers are hard at work"
	,	"'Thompson, did you file the expense reports ya old bag of hockey pucks!?'"
	,	"'Jenkins, dammit, did you commit your work!?'"
	,	"Is it Friday?"
	,	"Mondays, amirite?"
	,	"'Jefferson, you're coming in this weekend to get the project done dammit!"
	
];
