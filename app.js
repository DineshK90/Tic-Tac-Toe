////////////////Starting variable

const tile = document.querySelectorAll(".tile");

const playerX = 'X';
const playerO = 'O';

let turn = playerX;

const fieldStatus = Array(tile.length);
fieldStatus.fill(null);

//////////////elements

const strike = document.getElementById("strike");
const noticeBoard = document.getElementById("notice-board");
const endGameText = document.getElementById("end-game-text");
const startGame = document.getElementById("start-game");
const resetGame = document.getElementById("reset-game");
startGame.addEventListener("click", startNewGame);


///////////////sound code

const endGameSound = new Audio('sounds/victory.wav');
const placeBlock = new Audio('sounds/placingBlock.wav');
const bgTheme = new Audio('sounds/bgm.mp3')


///////////////event listener for each tile

tile.forEach((tile) => tile.addEventListener("click", tileClick));

function setHoverText(){
    tile.forEach(tile => {
        tile.classList.remove("X-hover")
        tile.classList.remove("O-hover")
    });
    const hoverClass = `${turn.toLocaleLowerCase()}-hover`;

    tile.forEach(tile=>{
        if(tile.innerText == ""){
            tile.classList.add(hoverClass);
        }
    });
}

setHoverText();


function tileClick(event) {
    if(noticeBoard.classList.contains('visible')){
        return;
    }
    const tile = event.target;
    const tileNumber = tile.dataset.index;
    if(tile.innerText !=""){
        return;
    }

    if(turn === playerX){
        tile.innerText = playerX;
        fieldStatus[tileNumber -1] = playerX;
        turn = playerO;
    }else{
        tile.innerText = playerO;
        fieldStatus[tileNumber -1] = playerO;
        turn = playerX;
    }

    placeBlock.play();
    
    setHoverText();
    winCheck();

}

/////win condition check

const winConditions = [
    {chain: [1,2,3], winStrike: "strike-top-row" },
    {chain: [4,5,6], winStrike: "strike-middle-row" },
    {chain: [7,8,9], winStrike: "strike-bottom-row" },
    {chain: [1,4,7], winStrike: "strike-left-column" },
    {chain: [2,5,8], winStrike: "strike-middle-column" },
    {chain: [3,6,9], winStrike: "strike-right-column" },
    {chain: [1,5,9], winStrike: "strike-diagonal-1" },
    {chain: [3,5,7], winStrike: "strike-diagonal-2" },
];

function winCheck() {
    for(const winCondition of winConditions){
        const {chain, winStrike} = winCondition;
        const tileValue1 = fieldStatus[chain[0]-1];
        const tileValue2 = fieldStatus[chain[1]-1];
        const tileValue3 = fieldStatus[chain[2]-1];
        
        if(
            tileValue1 != null  &&
            tileValue1 === tileValue2 &&
            tileValue1 === tileValue3
        ) {
            strike.classList.add(winStrike);
            endGame(tileValue1);
            return;
        }
    }

    const fullTiles = fieldStatus.every((tile) => tile != null);
    if(fullTiles){
        endGame(null);
    }
}


function endGame(winText){
    let text = "Draw!";
    if(winText != null){
    text = `Winner is ${winText}!`;
    }
    noticeBoard.className = "visible";
    document.getElementById("end-game-text").innerText = text;
    endGameSound.play();
    

}

///////////////starting game

function startNewGame(){
    strike.className = "strike";
    noticeBoard.className= "hidden";
    fieldStatus.fill(null);
    tile.forEach((tile) => (tile.innerText = ""));
    turn = playerX;
    setHoverText();
}


//////////score

// let drawScore = 0;
// let xWins = 0;
// let Owins = 0;

// function addScore() {
//     if(endGame(null)){
//         for(let i=drawScore; i< drawScore.length; i++){
//             document.getElementById("score-board").innerHTML = 'sss: ' + i ;
//         } 
//     }
// }