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

	setupForgetMe();

	//First, finna check if the user exists:
	var player = localStorage.getItem('player');

	if(player){
		console.log('we got a player');
		var p = JSON.parse(player);
	}else{
		console.log('aint no player');
		var p = setupPlayer();
		localStorage.setItem('player',JSON.stringify(p));
	}

	setDeets(p);

};





function setupPlayer() 	{

	var n = prompt("Please enter your name", "");
	var p = new Player(n);
	return p;
};

function setDeets(p)	{

	$('#name').html(p.name);
	$('#lvl').html(p.lvl);
	$('#XP').html(p.xp);
	$('#money').html(p.money);
	$('#day').html(p.day);

};

function setupForgetMe() {

	$('#forget').on('click',function(){
		alert('You are forgotten. Refreshing the page');
		localStorage.clear();
		location.reload();
	})

};



$(document).ready(init);