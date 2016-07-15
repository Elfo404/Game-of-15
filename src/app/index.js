'use strict';
import GameBox from './GameBox';

let Box= new GameBox(document.getElementById("gameContainer"),4);
document.querySelector('#gameControls button').addEventListener('click',function(){
	Box.deleteWinModal();
	Box.shuffle();
});