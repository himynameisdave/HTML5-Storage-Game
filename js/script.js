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
		console.log('j/10 is: ' + j/10)
		//current width
		var cw = parseFloat( $("#nxt-fill").css('width') );
		console.log('nxtfillwdth: ' + cw)
		var con =  (cw - (i/5.58) +"px");
		$("#nxt-fill").css('width',con);

		if(j >= 500){
			clearInterval(t);
			p.day++
			updateDeets(p);
			$("#nxt-fill").css('width','100%');
			storeDeets(p);
			nxtClicked = false;
		}

	}, 50);

};

function btnSetup(p) {
	setupForgetMe();
	setupNxtDay(p);
};	



//	nxtClicked
var nxtClicked = false;

$(document).ready(init);