//	Welcome to the HTML5 localstorage game
//	Also known as Dev Tycoon

function init(){	

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

	//Should make all this stuff happen on the condition of it being changed/diff
	//so that it isn't redrawn each time if there is no change=

	$('#name').html(p.name);
	$('#lvl').html(p.lvl);
	//Update level bar
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
		var cw = parseFloat( $("#day-fill").css('width') );
		var con =  (cw - (i/5.58) +"px");
		$("#day-fill").css('width',con);

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
	var dayEnd = true;

	//	Check to see if we're even supposed to gen a rand evnt
	if(isARandomEvent) {

		var numCurrProjs = 0;
		//loop through events for any that are > 0 daysLeft
		for(i=1;i<=Object.keys(p.currentProjects).length;i++){
			var pro = 'proj'+i;
			if(p.currentProjects[pro].daysLeft > 0){
				numCurrProjs++;
			}
		};

		if(numCurrProjs < p.devcap){
			var randomEvent = gimmieARandomEvent(p);

			var newProjName = 'proj' + (Object.keys(p.currentProjects).length + 1);

			p.currentProjects[newProjName] = randomEvent[0];

			var tellModial = randomEvent[1] + standardMsg;
			showModial(tellModial,p,dayEnd);

		}else{
			standardMsg += "What a great day to be developing!<br/>";
			showModial(standardMsg,p,dayEnd);
		}	

	}else{
		showModial(standardMsg,p,dayEnd);
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
function showModial(msg,p,dayEnd){

	//see if there is a modial already

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

//	Closes the modial, advances the day forward, and gets shit ready for the next day
function closeModial(p,dayEnd,mn) {

	$('#modial-'+mn).remove();

	if(dayEnd){
		$("#day-fill").css('width','100%');
		p.day++

		if(!$.isEmptyObject(p.currentProjects)){
			decrementProjectDaysLeft(p);
		}
		updateLevel(p);
		updateProjects(p);
		updateDeets(p);
		storeDeets(p);
	}
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
			if(p.currentProjects[i].daysLeft > 0){
				drawProj(p.currentProjects[i]);
			}
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
		if(p.currentProjects[i].daysLeft == 0){
			completeProject(p,p.currentProjects[i]);
		}
	}

};

function completeProject(p,proj){
	p.money += proj.billings;
	p.xp += proj.xpGiven;
};


/*				END UPDATING PROJECTS					*/


/*				UPDATING THE LEVEL 						*/

function updateLevel(p)	{

	var totalWidth = parseFloat( $("#lvl-fill").parent().css('width') )
	var nli = nextLevelIn(p);

	if(nli[2]){
		p.lvl++;
		var str = 	"<div class='lvl-up-text'>"+
					"LEVEL UP!<br/>"+
					"You are now level "+
					p.lvl +
					"!</div>";

		showModial(str,p,false);
		updateDeets(p);
		storeDeets(p);
		updateLevel(p);
	}else{
		var per = (100 - ((nli[1] / nli[0])*100)) + "%";

		$("#lvl-fill").css("width",per);

		if($("#lvl-fill").parent().find(".xp-to-next")){
			$("#lvl-fill").parent().find(".xp-to-next").remove();
		}
		var l = p.lvl;
		var othrStr =  "<div class='xp-to-next'>XP to level "+(l+1)+": "+nli[1]+"</div>";
		$("#lvl-fill").parent().append(othrStr);

		$("#lvl-fill").width(per);
	}

};




//	returns how much xp is needed to reach the next level, as well as the total difference
//	in xp between the current level and the next level
function nextLevelIn(p)		{
	var lvl 	= 'lvl'+p.lvl;
	var nxtlvl 	= 'lvl'+(p.lvl+1);

	//nli == next level in
	var nli = [];


	//	The difference between the current level and next
	nli[0] = levelsMap[nxtlvl] - levelsMap[lvl];
	//	The difference between the next level and the current level
	nli[1] = levelsMap[nxtlvl] - p.xp;
	//	bool, whether there is a level up or not
	if(nli[1] <= 0){
		nli[2] = true;
	}else{
		nli[2] = false;
	}

	// console.log(nli);
	return nli;
};


/*				END UPDATING THE LEVEL 					*/

//	nxtClicked
var nxtClicked = false;

$(document).ready(init);