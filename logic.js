/*
 * https://www.pirple.com/
 * Tic-Tac-Toe - Homework Assignment #8: Events
 * @author Ivan komlev <ivankomlev@gmail.com>
 * @github https://github.com/Ivan-Komlev/Javascript-Tic-Tac-Toe-game
 * @copyright Copyright (C) 2020. All Rights Reserved
 * @license GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html
*/
	
	function checkTheClick(e){
		if(e.target.tagName == "DIV")
			proceedWithTheTurn(e.target.id);
	}
	
	function proceedWithTheTurn(boxId){
		let box=document.getElementById(boxId);
		//Get the box id example: (box-2) where 2 is the id
		let n=boxId.split("-");
		if(n.length==2){
			let index=n[1];

			//Check if the space is not occupied
			if(theBoard[index]==0){
				
				//Add X or O text (span) element
				let element = document.createElement('span');
				element.classList.add('hitSigh'+turn);
				element.innerHTML=(turn == 1 ? "X" : "O");
				box.appendChild(element);
				
				//Set the board space to the turn index
				theBoard[index]=turn;
				
				if(checkWin(turn)){
					alert((turn ==1 ? "X" : "O")+" has won!");
					startOver();
				}else{
					if(checkCatsGame()){
						alert("Cats game");
						startOver();
					}else{
						//Change the turn
						turn+=1;
						if(turn==3)
							turn=1;
					}
				}
			}
			else{
				//Show shake animation if occupied
				box.classList.add('occupied');
				setTimeout(function(){
					box.classList.remove('occupied');
				},500);
			}
		}
	}
	
	function convertPatternStringToIndexes(patterns_Str){
		//Converts ["abc","def"] -> [[0,1,2],[3,4,5]]
		let patterns=[];
		patterns_Str.forEach((pattern) => {
			let indexedPattern=[];
			let p=pattern.split('');
			p.forEach((l) => {
				indexedPattern.push(l.charCodeAt(0)-97);
			});
				
			patterns.push(indexedPattern);
		});
		return patterns;
	}
	
	
	function checkWin(turn){
		
		for(let i=0;i<patterns.length;i++){
			let correct=true;
			patterns[i].forEach((p) => {
				if(theBoard[p]!=turn)
					correct=false;
			});
			
			if(correct){
				return true;
			}
		}
		return false;
	}
	
	function checkCatsGame(){
		
		for(let i=0;i<theBoard.length;i++){
			if(theBoard[i]==0)
				return false;
		}
		
		return true;
	}
	
	function startOver(){

		for(let i=0;i<theBoard.length;i++){
			theBoard[i]=0;
			document.getElementById("box-"+i).innerHTML='&nbsp';
		}
			
		turn = 1;
	}
