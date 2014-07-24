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
		console.log('we got a player');
		var p = JSON.parse(player);
		btnSetup(p);
	}else{
		console.log('aint no player');
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
	$('#money').html(p.money);
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

	$('#nxt-day').on('click',function(){
		p.day++
		storeDeets(p);
		updateDeets(p);
	});

};

function btnSetup(p) {
	setupForgetMe();
	setupNxtDay(p);
};	


$(document).ready(init);