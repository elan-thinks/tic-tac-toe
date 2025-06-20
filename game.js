const GameBoard = (function(){
    let gameBoard=[[" "," "," "],
               [" "," "," "],
               [" "," "," "],
              ];

    const render_gameBoard =()=> {
    for (let i = 0; i < gameBoard.length; i++) {
        let row = '|';
        for (let j = 0; j < gameBoard[i].length; j++) {
            row += ' ' + gameBoard[i][j] + ' |';
        }
        console.log(row);
        console.log('-------------');

    }
}
   const isBoardFull=()=> {
    let result=false;
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
            if (gameBoard[i][j] === ' ') {
                return false;
            }
        }
    }
    return true; 
}
               
  return {gameBoard,render_gameBoard,isBoardFull}

})();



function Game(){

    function validInputNumber(choice) {
        if (!isNaN(choice) && choice >= 0 && choice <= 2) {
            return true;
        }
        console.log("Invalid choice: " + choice);
        return false;
    }
    function checkXO(choice) {
        if ((choice === 'x' || choice === 'o') && choice !== ' ') {
          return true; 
        }
        console.log("Invalid choice: " + choice);
        return false;
    }

    function getwinner(choice) {
        let the_winner = "";
        let isThere_Awinner = false;
    
        // Rows
        for (let i = 0; i < 3; i++) {
            if (GameBoard.gameBoard[i][0] === choice && GameBoard.gameBoard[i][1] === choice && GameBoard.gameBoard[i][2] === choice) {
                isThere_Awinner = true;
            }
        }
    
        // Columns
        for (let j = 0; j < 3; j++) {
            if (GameBoard.gameBoard[0][j] === choice && GameBoard.gameBoard[1][j] === choice && GameBoard.gameBoard[2][j] === choice) {
                isThere_Awinner = true;
            }
        }
    
        // Diagonals
        if (GameBoard.gameBoard[0][0] === choice && GameBoard.gameBoard[1][1] === choice && GameBoard.gameBoard[2][2] === choice) {
            isThere_Awinner = true;
        }
        if (GameBoard.gameBoard[0][2] === choice && GameBoard.gameBoard[1][1] === choice && GameBoard.gameBoard[2][0] === choice) {
            isThere_Awinner = true;
        }
    
        if (isThere_Awinner) {
            the_winner = `The winner is ${choice}`;
        } else if (GameBoard.isBoardFull()) {
            the_winner = "It's a Draw!";
        } else {
            the_winner = "Continue playing...";
        }
        console.log(the_winner,isThere_Awinner,GameBoard.isBoardFull());
        return {
            the_winner,
            isThere_Awinner,
            result: GameBoard.isBoardFull()
        };
    }

    function checkPosition(x,y,value){
        let changePosition = false;

        if (GameBoard.gameBoard[x][y] !== ' ' ) {

            while(!changePosition){
                alert("Pick another one");
                x = prompt(`Player ${value} - x position`);
                x = parseInt(x);
                while (!validInputNumber(x)) {
                    x = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 for - x position`);
                    x = parseInt(x);
            
                }
                y = prompt(`Player ${value}  - y position`);
                y = parseInt(y);
                while (!validInputNumber(y)) {
                    y = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 or - y position`);
                    y = parseInt(y);
            
                }
                GameBoard.gameBoard[x][y] !== ' ' ?changePosition =false:changePosition=true;

            }

    }
    return {x,y}

}
    function setInput(getChoice,value){
        x = prompt(`Player ${value} - x position`);
        x = parseInt(x);
        while (!validInputNumber(x)) {
            x = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 for - x position`);
            x = parseInt(x);
    
        }
    
        
        y = prompt(`Player ${value}  - y position`);
        y = parseInt(y);
        while (!validInputNumber(y)) {
            y = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 or - y position`);
            y = parseInt(y);
    
        }

    
        const corrected = checkPosition(x, y, value);
        x = corrected.x;
        y = corrected.y;
    
        GameBoard.gameBoard[x][y] = getChoice;
        console.clear();
        GameBoard.render_gameBoard();
    
        let result = getwinner(getChoice);
        
        return {
            the_winner: result.the_winner,
            isThere_Awinner: result.isThere_Awinner,
            finishedBoard: result.result
        };
    
    }


    
    return {validInputNumber,checkXO, setInput,getwinner}

}

const Player=(function(){

    let game = Game();    
    let p1_picks = prompt("Player 1 -- pick x or y").toLowerCase();


    while (!game.checkXO(p1_picks)) {
        p1_picks = prompt("Invalid. Player 1 -- pick x or y").toLowerCase();
    }

    let p2_picks = (p1_picks === 'x') ? 'o' : 'x';
    console.log(`Player 2 automatically assigned: ${p2_picks}`);
    console.log(` ${p1_picks} , ${p2_picks} `);
     
   
   
  const getStarted=()=> {
    console.log(`
        ✨🐾 Welcome to Tic Tac Toe! 🐾✨
        Get ready to battle for glory with X's and O's!
        Two players enter... only one shall win (or maybe you'll tie 💖).
        
        Let's make some moves! 🎮
        
        Good luck & have fun! 
        `);
        

        let p1_turn = true;
        let p2_turn = false;
        let result= false;
        let gameOver=false;
        let message = ' '



        while (!result && !gameOver) {
            let turnResult;

            if (p1_turn) {
                turnResult = game.setInput(p1_picks,1) 
                p1_turn = false;
                p2_turn = true;

            } else if (p2_turn) {
                turnResult = game.setInput(p2_picks,2)
                p2_turn = false;
                p1_turn = true;
            }
            result = turnResult.isThere_Awinner;
            message = turnResult.the_winner;
            gameOver =turnResult.finishedBoard;

            
        console.log(`playing is done - ${result}`);
        console.log(`game over ${gameOver}`);

        }
        alert(message);

    }
    return {getStarted}
 
})();
Player.getStarted();
