
let gameBoard=[[" "," "," "],
               [" "," "," "],
               [" "," "," "],
              ];



function isBoardFull() {
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

function getwinner(choice){
    let finishedBoard = false;
   let isThere_Awinner= false;
   let the_winner = ''
    for (let i=0; i<gameBoard.length; i++) {

                
        for (let j=0; j<gameBoard.length; j++) {
           

            for (let k=0; k<gameBoard.length; k++) {
                if (gameBoard.length !== 0) {
                    finishedBoard = true;
                }
                if(gameBoard[j][0] === choice && gameBoard[j][1] === choice && gameBoard[j][2] === choice){
                    the_winner = `the winner ${choice}`;
                    isThere_Awinner=true;
                }else if(gameBoard[0][j] === choice && gameBoard[1][j] === choice && gameBoard[2][j] === choice){
                    the_winner = `the winner ${choice}`;
                     isThere_Awinner=true;

                  }else if(gameBoard[0][0] === choice && gameBoard[1][1] === choice && gameBoard[2][2] === choice){
                    the_winner = `the winner ${choice}`;
                    isThere_Awinner=true;


                  }else if(gameBoard[0][2] === choice && gameBoard[1][1] === choice && gameBoard[2][0] === choice){
                    the_winner = `the winner ${choice}`;
                    isThere_Awinner=true;


                  }else{
                        the_winner = `It's a Draw or finish the game`;
                        
                  }    
           }
        }

      }
   
      
   let result = isBoardFull();
      return {the_winner ,isThere_Awinner,result};

}

function setInput(getChoice,value){
    x = prompt(`Player ${value} - x position`);
    x = parseInt(x);
    while (!checkPosition(x)) {
        x = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 for - x position`);
        x = parseInt(x);

    }

    
    y = prompt(`Player ${value}  - y position`);
    y = parseInt(y);
    while (!checkPosition(y)) {
        y = prompt(`Invalid. Player ${value} -- pick number between 0 and 2 or - y position`);
        y = parseInt(y);

    }
//availabel position
   
    if (gameBoard[x][y] !== ' ' ) {
        alert("Pick another one");
        return;
        
    }

    gameBoard[x][y] = getChoice;
    console.clear();
    render_gameBoard();

    let result = getwinner(getChoice);
    the_winner=result.the_winner;
    isThere_Awinner=result.isThere_Awinner;
    finishedBoard = result.result;
    console.log(the_winner);
    console.log(`game over ${finishedBoard}`);


    return {the_winner,isThere_Awinner,finishedBoard};

}
           

function checkXO(choice) {
    if (choice === 'x' || choice === 'o' && choice !== ' ') {
      return true; 
    }
    console.log("Invalid choice: " + choice);
    return false;
}

function checkPosition(choice) {
    if (!isNaN(choice) && choice >= 0 && choice <= 2) {
        return true;
    }
    console.log("Invalid choice: " + choice);
    return false;
}

  
function getStarted() {

    let p1_picks = prompt("Player 1 -- pick x or y").toLowerCase();
    
    while (!checkXO(p1_picks)) {
        p1_picks = prompt("Invalid. Player 1 -- pick x or y").toLowerCase();
    }

    let p2_picks = (p1_picks === 'x') ? 'o' : 'x';
    console.log(`Player 2 automatically assigned: ${p2_picks}`);
    console.log(` ${p1_picks} , ${p2_picks} `);
     
    let p1_turn = true;
    let p2_turn = false;

    let result=false;
    let gameOver=false;

    let message = ' '
    while (!result && !gameOver) {
        let x = '';
        let y = '';

        if (p1_turn) {
            setInput(p1_picks,1) 
            p1_turn = false;
            p2_turn = true;

        } else if (p2_turn) {
            setInput(p2_picks,2)
            p2_turn = false;
            p1_turn = true;
        }
        result = isThere_Awinner;
        message = the_winner;
        gameOver = finishedBoard;

        
      console.log(result);
      console.log(`game over ${finishedBoard}`);

    }
    alert(message = the_winner);

}

function render_gameBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        let row = '|';
        for (let j = 0; j < gameBoard[i].length; j++) {
            row += ' ' + gameBoard[i][j] + ' |';
        }
        console.log(row);
        console.log('-------------');

    }
}
getStarted();
