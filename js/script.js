//	Written by Dave Lunny
function init(){	

	//Level-mapping, for later use
	/*
	var x;
	var thisXp = 1
	for( x in levelsMap ){
		thisXp = levelsMap[x];
	};		
	*/


	//First, finna check if the user exists:
	var player = localStorage.getItem('player');

	if(player){
		var p = JSON.parse(player);
	}else{
		var p = setupPlayer();
		storeDeets(p);
	}

	btnSetup(p);

	updateDeets(p);
	updateProjects(p);
};



/*/////////////SETUP AND STORAGE FUNCTIONS////////////*/


//	If generating a new player, this takes the name, creates, and returns the new player object
function setupPlayer() 	{
	var n = prompt("Please enter your name", "");
	var p = new Player(n);
	return p;
};

// Calls two btn setup function
function btnSetup(p) {
	setupForgetMe();
	setupNxtDay(p);
};	

//	Sets up the forget me btn
function setupForgetMe() {
	$('#forget').on('click',function(){
		alert('You are forgotten. Refreshing the page');
		localStorage.clear();
		location.reload();
	});
};

//	Sets up the next day btn
function setupNxtDay(p){
	$('#nxt-day').on('click',function(e){
		e.stopPropagation();
		if(!nxtClicked){
			advanceDay(p);
			nxtClicked = true;
		}
	});
};

//	Important fxn that adds the stringified player pbject to localstorage
function storeDeets(p){
	localStorage.setItem('player',JSON.stringify(p));
};

//Goes in and changes the displayed deets to reflect those passed to it
function updateDeets(p)	{
	$('#name').html(p.name);
	$('#lvl').html(p.lvl);
	$('#XP').html(p.xp);
	$('#money').html(p.money).commaAtMeBro().prepend('$');
	$('#day').html(p.day);
};


/*///////////END SETUP AND STORAGE FUNCTIONS//////////*/






/*				MOVING THE DAY FORWARD				*/

//	Advance day simply handles taking the btn click from nxtday, updating the fill bar,
// 	and then calling the endOfDaySummary() which handles all end-day events
function advanceDay(p){

	var i = 50;
	var j = 0;
	var t = setInterval(function(){
		j = j + 10;
		i--

		//current width
		var cw = parseFloat( $("#nxt-fill").css('width') );
		var con =  (cw - (i/5.58) +"px");
		$("#nxt-fill").css('width',con);

		if(j >= 500){
			clearInterval(t);
			endOfDaySummary(p);
		}

	}, 50);

};

//	Generates the end of the day summary modial
function endOfDaySummary(p){

	var isARandomEvent = randomEventGen();
	var standardMsg = "End of Day" + p.day + "<br/>";

	//	Check to see if we're even supposed to gen a rand evnt
	if(isARandomEvent) {

		if(Object.keys(p.currentProjects).length < p.devcap){
			var randomEvent = gimmieARandomEvent(p);

			var newProjName = 'proj' + (Object.keys(p.currentProjects).length + 1);

			p.currentProjects[newProjName] = randomEvent[0];

			var tellModial = randomEvent[1] + standardMsg;
			showModial(tellModial,p);

		}else{
			standardMsg += "What a great day to be developing!<br/>";
			showModial(standardMsg,p);
		}	

	}else{
		showModial(standardMsg,p);
	}

};

//	Both generates a new project (doesnt handle adding to currentProjects) and the text
//	for the modial that goes along with it
function gimmieARandomEvent(p)	{

	var evnt = [];
	evnt[0] = new Project(p.lvl);
	evnt[1] = 	""+
				"<span class='new-proj'>NEW!</span><br/>"+
				"Looks like you got a new project! Cool!<br/>"+
				"The company is " + evnt[0].client + " and they are offering a handsome " + 
				evnt[0].billings + " for the project which will take " + evnt[0].days + "days to complete.<br/>"+
				"This project awards " + evnt[0].xpGiven + "XP upon completion"+
				"<br/>";
	return evnt

};

//	Determines if a random event should be generated or not
function randomEventGen()	{
	var r = rn(1,3);	
	if(r==2){
		return true
	}else{
		return false
	}
};

/*				SHOWING AND HIDING THE MODIAL						*/

//	Takes a message (html welcome) and adds it to the modial which is added to the page
function showModial(msg,p){
	var a = "<div class='modial'><div class='inner-modial'>";
	var b = "<div id='close-modial' class='btn'>Close</div></div></div>";
	var mod = a+msg+b;
	$('body').append(mod);
	$('#close-modial').on('click',function(e){
		e.stopPropagation();
		closeModial(p);
	});
};

//	Closes the modial, advances the day forward, and gets shit ready for the next day
function closeModial(p) {

	$('.modial').remove();
	$("#nxt-fill").css('width','100%');
	p.day++

	if(!$.isEmptyObject(p.currentProjects)){
		decrementProjectDaysLeft(p);
	}
	updateProjects(p);
	updateDeets(p);
	storeDeets(p);
	nxtClicked = false;
};

/*				SHOWING AND HIDING THE MODIAL						*/


/*				END MOVING THE DAY FORWARD				*/


/*				UPDATING PROJECTS						*/

//	Loops through all projects (if there are some to loop through) and draws that project, 
function updateProjects(p){
	
	//check if user has any current projects goin on
	if(!$.isEmptyObject(p.currentProjects)){

		var len = Object.keys(p.currentProjects).length;
		$('.projects').empty();
		for (k = 1; k <= len; k++){
			var i = 'proj' + k;	
			drawProj(p.currentProjects[i]);
		};

	}

};


//	Simply intended to draw a single project (not a lot of logic)
function drawProj(proj){
	var draw = 	""+
				"<div class='project'>"+
				"<h6>The <strong>" + proj.client + "</strong> Project!</h6>"+
				"<span><b>Billings: </b>" + proj.billings + "</span><br/>"+
				"<span><b>Days Left:</b>" + proj.daysLeft + "</span><br/>"+
				"<span><b>XP:</b>" + proj.xpGiven + "</span>"+
				"</div>"

	$('.projects').append(draw);
};


function decrementProjectDaysLeft(p){

	var len = Object.keys(p.currentProjects).length;
	for (k = 1; k <= len; k++){
		var i = 'proj' + k;	
		p.currentProjects[i].daysLeft--
	}

};

/*				END UPDATING PROJECTS					*/




//	nxtClicked
var nxtClicked = false;

$(document).ready(init);