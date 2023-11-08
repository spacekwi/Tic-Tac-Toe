window.addEventListener("DOMContentLoaded", () => {
	// DOM Content Loaded: Once the html content is loaded properly

//	Purpose to Define variables: to control the html elements  via javascript
//initialize variables 
// querySelectorAll to collect all html tag with same classes and convert into array
	const tiles = Array.from(document.querySelectorAll(".tile"));

// querySelector to collect only one html tag and assign into variable
  const playerDisplay = document.querySelector(".display-player");
  
  // initialize 2 more variables for reset and announcer
  const resetButton = document.querySelector("#reset");
  const newRoundButton = document.querySelector("#newRound");
  const announcer = document.querySelector(".announcer");

  //board variable we are declaring to store the values. X and O
  let board = ["", "", "", "", "", "", "", "", ""];
  
  // variable to define the who is playing currently
  let currentPlayer = "X";
  
  // this variable to define where game is stilla ctive or not. which means if player X or O won already or not.
  let isGameActive = true;

//make a variable name should be playerxwon
const PLAYERX_WON= "PLAYERX_WON";
const PLAYERO_WON= "PLAYERO_WON";
const TIE= "TIE";

  //variables for holding scorecard
  const xscore=document.querySelector(".xscore");
  const oscore=document.querySelector(".oscore");
  const tiescore=document.querySelector(".tiescore");
 //variables for holding scorecard images
 const xscoreimages=document.querySelector(".xscoreimages");
 const oscoreimages=document.querySelector(".oscoreimages");
 const tiescoreimages=document.querySelector(".tiescoreimages");
  /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
  //  multidimensional array
const winningConditions=[
       [0,1,2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6],
];
function handleResultValidation(){
 let roundWon=false;
 for(let i=0;i<=7;i++){
  const winCondition=winningConditions[i];
  const a=board[winCondition[0]];//o
  const b=board[winCondition[1]];//x
  const c=board[winCondition[2]];// " "
  if(a=== "" || b==="" || c===""){
    continue;
  }
  if(a===b && b===c){
  roundWon="true";
  break;
 }

}
if(roundWon){
announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
isGameActive=false;
return;
}
if(!board.includes("")) announce(TIE);
}
 
const announce =(type)=>{
  switch(type){
    case PLAYERX_WON:
      announcer.innerHTML='player <span class="playerX">X</span> Won';
      xscore.innerText=parseInt(xscore.innerText) +1;
      if(parseInt(xscore.innerText) % 3 === 0){
        const img = document.createElement('img');
        img.src ="https://rlv.zcache.co.nz/custom_message_gold_star_with_gold_glitter_texture_star_sticker-r8c6018b4e6f64bd4b7386ba858eb00be_0ugdr_8byvr_540.jpg";
        img.width = 20;
        xscoreimages.appendChild(img);
      }
      break;
      case PLAYERO_WON:
        announcer.innerHTML='player <span class="playerO">O</span> Won';
        oscore.innerText=parseInt(oscore.innerText) +1;
        if(parseInt(oscore.innerText) % 3 === 0){
          const img = document.createElement('img');
          img.src ="https://rlv.zcache.co.nz/custom_message_gold_star_with_gold_glitter_texture_star_sticker-r8c6018b4e6f64bd4b7386ba858eb00be_0ugdr_8byvr_540.jpg";
          img.width = 20;
          oscoreimages.appendChild(img);
        }
        break;
        case TIE:
          announcer.innerText="Tie";
          tiescore.innerText=parseInt(tiescore.innerText) +1;
          if(parseInt(tiescore.innerText) % 3 === 0){
            const img = document.createElement('img');
            img.src ="https://rlv.zcache.co.nz/custom_message_gold_star_with_gold_glitter_texture_star_sticker-r8c6018b4e6f64bd4b7386ba858eb00be_0ugdr_8byvr_540.jpg";
            img.width = 20;
            tiescoreimages.appendChild(img);
          }
          break;
      }
      announcer.classList.remove("hide");
    }
 
    const isValidAction = (tile) => {
      if (tile.innerText === "X" || tile.innerText === "O") {
        return false;
      }
  
      return true;
    };
  // old way to write function 
  /*
  function userAction(tile, index) {
  	console.log(index);
  }
  */

  
  const updateBoard = (index) => {
  // updating board variable with getting index vale and adding current player
  	board[index] = currentPlayer;
  }
  
  const changePlayer = () => {

  	// remove the class for current player before it gets changed
  	playerDisplay.classList.remove('player'+currentPlayer);
    
    // we are changing the current player 
    if (currentPlayer === "X") {
    	currentPlayer = "O";
    } else {
    	currentPlayer = "X";
    }
    
    // we are displaying value of current player inside playerDisplay
    playerDisplay.innerText = currentPlayer;
    
    // we are adding a new class for the current player
    playerDisplay.classList.add('player'+currentPlayer);
  }
  
    // old way to create function
	// function userAction(tile, index) { }
  // arrow type function it is display the player name inside the tile 
  const userAction = (tile,index) => {
	  	// add a text inside the element
      if (isValidAction(tile) && isGameActive) {
	 		tile.innerText = currentPlayer;
      // classList display all classnames inside that element 
      // add means adding a new class inside the current element
      tile.classList.add('player'+currentPlayer);
      
      // call the function updateboard to store the values of X and O
      console.log("Board not Updated Yet", board);
      //calling the updateboard() function at line 32 it should be done before changing the player 
      updateBoard(index);
      // call the function of change player
      console.log("Board is updated", board);
      handleResultValidation();
      changePlayer();
  }
}
const resetBoard =() =>{
  board=["","","","","","","","",""];
  isGameActive=true;
  announcer.classList.add("hide");
  if(currentPlayer === "O"){
    changePlayer();
  }
  tiles.forEach((tile) =>{
    tile.innerText="";
    tile.classList.remove("playerX");
    tile.classList.remove("playerO");
  })

}
const newRound=() =>{
  xscore.innerText=("0")
  oscore.innerText=("0")
  tiescore.innerText=("0")
  xscoreimages.innerText=("")
  oscoreimages.innerText=("")
  tiescoreimages.innerText=("")
  resetBoard();
}
  
    
  // this is an old way to run the loop
  /*
	for (let i=1; i<tiles.length; i++ ) {
  	console.log(tiles[i].innerHTML);
  }*/
  
  // map helps to run the loop
  
  tiles.map((tile, index) => {
		tile.addEventListener('click', () => userAction(tile, index));
  });

  resetButton.addEventListener("click",resetBoard);
  newRoundButton.addEventListener("click",newRound);
});