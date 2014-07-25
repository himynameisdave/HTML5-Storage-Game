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
		btnSetup(p);
	}else{
		var p = setupPlayer();
		storeDeets(p);
		btnSetup(p);
	}

	updateDeets(p);

};





function setupPlayer() 	{

	var n = prompt("Please enter your name", "");
	var p = new Player(n);
	return p;
};

function updateDeets(p)	{

	$('#name').html(p.name);
	$('#lvl').html(p.lvl);
	$('#XP').html(p.xp);
	$('#money').html(p.money).commaAtMeBro().prepend('$');
	$('#day').html(p.day);

};

function storeDeets(p){
	localStorage.setItem('player',JSON.stringify(p));
};

function updateProjects(p,proj){
	//check if user has any current projects goin on
	if(!$.isEmptyObject(p.currentProjects)){
		
		var len = Object.keys(p.currentProjects).length;
		for (k = 1; k <= len; k++){
			var i = 'proj' + k;	
			p.currentProjects[i].daysLeft--
			storeDeets(p);
			drawProj(p.currentProjects[i]);
		};

	}else{
		p.currentProjects['proj1'] = proj;
		storeDeets(p);
		drawProj(proj);
	}

	

};

function drawProj(proj){

	$('.projects').empty();
	
	var draw = 	""+
				"<div class='project'>"+
				"<h6>The <strong>" + proj.client + "</strong> Project!</h6>"+
				"<span><b>Billings: </b>" + proj.billings + "</span><br/>"+
				"<span><b>Days Left:</b>" + proj.daysLeft + "</span><br/>"+
				"<span><b>XP:</b>" + proj.xpGiven + "</span>"+
				"</div>"

	$('.projects').append(draw);
}

function setupForgetMe() {

	$('#forget').on('click',function(){
		alert('You are forgotten. Refreshing the page');
		localStorage.clear();
		location.reload();
	});

};

function setupNxtDay(p){

	$('#nxt-day').on('click',function(e){
		e.stopPropagation();
		if(!nxtClicked){
			advanceDay(p);
			nxtClicked = true;
		}
	});

};



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

function randomDayEvents(p){

	//time being
	// var r = rn(1,3);
	var r = rn(2,2);

	var c = {};
	if(r==2){
		c.proj = new Project(p.lvl);
		c.con = ""+
			"<span class='new-proj'>NEW!</span><br/>"+
			"Looks like you got a new project! Cool!<br/>"+
			"The company is " + c.proj.client + " and they are offering a handsome " + 
			c.proj.billings + " for the project which will take " + c.proj.days + "days to complete.<br/>"+
			"This project awards " + c.proj.xpGiven + "XP upon completion"+
			"<br/>";

		return c;

	}else{
		c.con = '';
		return c;
	}

};


function endOfDaySummary(p){

	var randomEvent = randomDayEvents(p);
	showModial(randomEvent.con + 'End of day ' + p.day + '!<br/>');
	if(randomEvent.proj){
		updateProjects(p,randomEvent.proj);
	}else{
		updateProjects(p);
	}
	p.day++
	updateDeets(p);
	$("#nxt-fill").css('width','100%');
	storeDeets(p);
	nxtClicked = false;

};


function btnSetup(p) {
	setupForgetMe();
	setupNxtDay(p);
};	

function showModial(msg){
	var a = "<div class='modial'><div class='inner-modial'>";
	var b = "<div id='close-modial' class='btn'>Close</div></div></div>";
	var mod = a+msg+b;
	$('body').append(mod);
	$('#close-modial').on('click',function(e){
		e.stopPropagation();
		$('.modial').remove();
	});
};



//	nxtClicked
var nxtClicked = false;

$(document).ready(init);