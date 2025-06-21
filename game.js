
  //**************************GameBoard************************************************************* *//

const GameBoard = (function () {
    let gameBoard = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
    let players = {
      player1: "name",
      player2: "name"
    }
  
    const render_gameBoard = () => {
      for (let i = 0; i < gameBoard.length; i++) {
        let row = "|";
        for (let j = 0; j < gameBoard[i].length; j++) {
          row += " " + gameBoard[i][j] + " |";
        }
        console.log(row);
        console.log("-------------");
      }
    };
  
    const isBoardFull = () => {
      for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard[i].length; j++) {
          if (gameBoard[i][j] === " ") {
            return false;
          }
        }
      }
      return true;
    };
  
    return { gameBoard, render_gameBoard, isBoardFull,players };
  })();


  //**************************Game************************************************************* *//
  
  function Game() {
        // function validInputNumber(choice) {
        // return !isNaN(choice) && choice >= 0 && choice <= 2;
        // }
    
        // function checkXO(choice) {
        // return (choice === "x" || choice === "o") && choice !== " ";
        // }
    
        function getWinner(choice) {
        let isWinner = false;
    
        for (let i = 0; i < 3; i++) {
            if (
            GameBoard.gameBoard[i][0] === choice &&
            GameBoard.gameBoard[i][1] === choice &&
            GameBoard.gameBoard[i][2] === choice
            ) {
            isWinner = true;
            }
        }
    
        for (let j = 0; j < 3; j++) {
            if (
            GameBoard.gameBoard[0][j] === choice &&
            GameBoard.gameBoard[1][j] === choice &&
            GameBoard.gameBoard[2][j] === choice
            ) {
            isWinner = true;
            }
        }
    
        if (
            (GameBoard.gameBoard[0][0] === choice &&
            GameBoard.gameBoard[1][1] === choice &&
            GameBoard.gameBoard[2][2] === choice) ||
            (GameBoard.gameBoard[0][2] === choice &&
            GameBoard.gameBoard[1][1] === choice &&
            GameBoard.gameBoard[2][0] === choice)
        ) {
            isWinner = true;
        }
    
        if (isWinner) return `The winner is ${choice}`;
        if (GameBoard.isBoardFull()) return "It's a Draw!";
        return null;
        }
  
        function setInput(x, y, playerSymbol) {
        GameBoard.gameBoard[x][y] = playerSymbol;
        console.clear();
        GameBoard.render_gameBoard();
    
        let result = getWinner(playerSymbol);
    
        return {
            winnerMessage: result,
            isOver: !!result,
            x,
            y
        };
        }
  
        // function playerMove(symbol, playerNumber) {
        // let x = parseInt(prompt(`Player ${playerNumber} - Enter X (0-2):`));
        // while (!validInputNumber(x)) {
        //     x = parseInt(prompt("Invalid X. Enter 0, 1, or 2:"));
        // }
    
        // let y = parseInt(prompt(`Player ${playerNumber} - Enter Y (0-2):`));
        // while (!validInputNumber(y)) {
        //     y = parseInt(prompt("Invalid Y. Enter 0, 1, or 2:"));
        // }
    
        // while (GameBoard.gameBoard[x][y] !== " ") {
        //     alert("Cell occupied! Choose again.");
        //     return playerMove(symbol, playerNumber);
        // }
    
        // return setInput(x, y, symbol);
        // }
        function hardComputerMove(p1, symbol) {
            const b = GameBoard.gameBoard;
        
            // Rows and columns
            for (let i = 0; i < 3; i++) {
            if (b[i].filter(c => c === p1).length === 2 && b[i].includes(" "))
                return setInput(i, b[i].indexOf(" "), symbol);
        
            let col = [b[0][i], b[1][i], b[2][i]];
            if (col.filter(c => c === p1).length === 2 && col.includes(" "))
                return setInput(col.indexOf(" "), i, symbol);
            }
        
            // Diagonal (main)
            let diag1 = [b[0][0], b[1][1], b[2][2]];
            if (diag1.filter(c => c === p1).length === 2 && diag1.includes(" "))
            return setInput(diag1.indexOf(" "), diag1.indexOf(" "), symbol);
        
            // Diagonal (anti)
            let diag2 = [b[0][2], b[1][1], b[2][0]];
            if (diag2.filter(c => c === p1).length === 2 && diag2.includes(" ")) {
            let i = diag2.indexOf(" ");
            return setInput(i, 2 - i, symbol);
            }
        
            // Fallback random
            while (true) {
            let x = Math.floor(Math.random() * 3);
            let y = Math.floor(Math.random() * 3);
            if (b[x][y] === " ") return setInput(x, y, symbol);
            }
        }
        
        function simpleComputerMove(p1, cpu) {
            const b = GameBoard.gameBoard;
        
            function tryLine(line, getCoords) {
            if (line.filter(c => c === cpu).length === 2 && line.includes(" ")) {
                const idx = line.indexOf(" ");
                const [x, y] = getCoords(idx);
                return setInput(x, y, cpu);
            }
            if (line.filter(c => c === p1).length === 2 && line.includes(" ")) {
                const idx = line.indexOf(" ");
                const [x, y] = getCoords(idx);
                return setInput(x, y, cpu);
            }
            return null;
            }
        
            // Check rows
            for (let i = 0; i < 3; i++) {
            const res = tryLine(b[i], idx => [i, idx]);
            if (res) return res;
            }
        
            // Check columns
            for (let j = 0; j < 3; j++) {
            const col = [b[0][j], b[1][j], b[2][j]];
            const res = tryLine(col, idx => [idx, j]);
            if (res) return res;
            }
        
            // Check diagonals
            const diag1 = [b[0][0], b[1][1], b[2][2]];
            const diag1Res = tryLine(diag1, idx => [idx, idx]);
            if (diag1Res) return diag1Res;
        
            const diag2 = [b[0][2], b[1][1], b[2][0]];
            const diag2Res = tryLine(diag2, idx => [idx, 2 - idx]);
            if (diag2Res) return diag2Res;
        
            // Center
            if (b[1][1] === " ") return setInput(1, 1, cpu);
        
            // Corners
            const corners = [[0,0], [0,2], [2,0], [2,2]];
            for (let [x, y] of corners) {
            if (b[x][y] === " ") return setInput(x, y, cpu);
            }
        
            // Fallback: any empty cell
            for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (b[i][j] === " ") return setInput(i, j, cpu);
            }
            }
        }
      
  
    return {simpleComputerMove,hardComputerMove, setInput };
  }


  //**************************Player************************************************************ *//
  
  const Player = (function () {
    const game = Game();
    let level = "easy";
  
    const logIn = (mode,p1,level) => {
      console.log("mode is",mode)
  
      let p2 = p1 === "x" ? "o" : "x";
      console.log(`Player 1 is ${p1}, Player 2 is ${p2}`);
      GameBoard.render_gameBoard();
  
      if (parseInt(mode) === 2) {
        playWithComputer(p1, p2);
      } else {
        playWithFriend(p1, p2);
      }
    
    };
  
    const playWithFriend = (p1, p2) => {
      let turn = 1;
      let over = false;
  
      while (!over) {
        let currentPlayer = turn % 2 === 1 ? p1 : p2;
        let currentNumber = turn % 2 === 1 ? 1 : 2;
  
        let result = game.playerMove(currentPlayer, currentNumber);
        over = result.isOver;
        if (result.winnerMessage) alert(result.winnerMessage);
  
        turn++;
        console.log("now its ",true ," turn ")
      }
    };
  
    const playWithComputer = (p1, cpu) => {
      let turn = 1;
      let over = false;
  
      while (!over) {
        if (turn % 2 === 1) {
          let result = game.playerMove(p1, 1);
          over = result.isOver;
          if (result.winnerMessage) alert(result.winnerMessage);
        } else {
            let result=0;
          console.log("💻 Computer is thinking...");
          if(logIn.level ==='2'){
            console.log(level)
            result = game.hardComputerMove(p1,cpu);
          }else {
            result = game.simpleComputerMove(p1,cpu);
          }
          over = result.isOver;
          if (result.winnerMessage) alert(result.winnerMessage);
        }
  
        turn++;
      }
    };
  
    return { logIn };
  })();
  
//   Player.logIn();







function DomRender(){
    let match = 0;
    let level = 0;
    let symbol = '';
    const container = document.querySelector('.welcome-container');
    const choose_match_container = document.querySelector('.choose-match-container');
    const choose_level_container = document.querySelector('.choose-level-container');
    const enter_your_name = document.querySelector('.enter-your-name');
    const game = document.querySelector('.game');

    const logo = document.querySelector('.logo').addEventListener('click',()=>{
        container.style.display="flex";
        choose_match_container.style.display="none";
        choose_level_container.style.display="none";
        enter_your_name.style.display="none";
        game.style.display="none"
        

    })
    
    const player1_avatar= document.querySelector('.player1')
    const player2_avatar= document.querySelector('.player2')

    const game_board= document.querySelector('.game-board')


    const player_one_name = document.querySelector('#player1-name');
    const player_two_name = document.querySelector('#player2-name');
    const player_one_label= document.querySelector('#player-1');
    const player_two_label= document.querySelector('#player-2');


    const playButton = document.querySelector('.playBtn');
    const matchBtn = document.querySelector('#matchBtn');
    const leveBtn = document.querySelector('#leveBtn');
    const nameBtn = document.querySelector('#nameBtn');

    const botImage = document.querySelector('.botImage');
    const friendImage = document.querySelector('.friendImage');

    const simpleLevel = document.querySelector('#simpleLevel').addEventListener('click',()=>{
        level = 1;
    });
    const hardLevel = document.querySelector('#hardLevel').addEventListener('click',()=>{
        level = 2; 
    });
    const symbolX= document.querySelector('.symbol-x').addEventListener('click',()=>{
        symbol = 'x';

    });
    const symbolO= document.querySelector('.symbol-o').addEventListener('click',()=>{
        symbol = 'o';

    });
    

    

    playButton.addEventListener('click',()=>{
        container.style.display="none";
        choose_match_container.style.display="flex";
      

            //with bot game
        botImage.addEventListener('click',()=>{
            match = 2;
            
                // if(match === 2){
            const symbolX= document.querySelector('.symbol-x').addEventListener('click',()=>{symbol = 'x';});
            const symbolO= document.querySelector('.symbol-o').addEventListener('click',()=>{symbol = 'o';});
            console.log("helllllloooo")
          
             matchBtn.addEventListener('click',()=>{   
                choose_match_container.style.display="none";
                choose_level_container.style.display="flex";

             

                leveBtn.addEventListener('click',()=>{
                  player1_avatar.src = "Assets/image.png";
                  player2_avatar.src = "Assets/friend.png";
                       if( level = 1)
                        choose_level_container.style.display="none";
                        game.style.display="flex"
                       if(level = 2){
                         choose_level_container.style.display="none";
                        game.style.display="flex"
                       }
                       let currentTurn = symbol; // Start with chosen symbol, 'x' or 'o'

                    GameBoard.players.player1="You";
                    GameBoard.players.player2="Bot";

                    player_one_label.textContent=GameBoard.players.player1;
                    player_two_label.textContent=GameBoard.players.player2;

                    console.log(GameBoard.players)
                    enter_your_name.style.display="none";
                    game.style.display="flex"
                    player1_avatar.src = "Assets/friend.png";
                    player2_avatar.src = "Assets/image.png";


                    const gameInstance = Game(); // You must have a Game() function returning game logic
                    // let imageIs =symbol=== "x" ? "Assets/x.png" : "Assets/o.png";
                    
                    const p1 = symbol;
                    const cpu = p1 ==="x" ? "o" : "x";
                    const playerImg = p1 === "x" ? "Assets/x.png" : "Assets/o.png";
                    const cpuImg = cpu === "x" ? "Assets/x.png" : "Assets/o.png";

                    currentTurn = p1;
                
                    // Create the 3x3 board
                    for (let i = 0; i < 3; i++) {
                      
                
                        for (let j = 0; j < 3; j++) {
                            const card = document.createElement("div");
                            card.classList.add("card");
                            card.id = `card-${i}-${j}`;
                
                            card.addEventListener("click", () => {
                                // Block if not player's turn or already has image
                                if (currentTurn !== p1 || card.querySelector("img")) return;
                
                                // Player's move
                                const img = document.createElement("img");
                                img.src = playerImg;
                                img.alt = p1;
                                img.style.width = "80%";
                                img.style.height = "80%";
                                card.appendChild(img);
                
                                const result = gameInstance.setInput(i, j, p1);
                
                                if (result.isOver) {
                                    setTimeout(() => alert(result.winnerMessage), 100);
                                    return;
                                }
                
                                currentTurn = cpu;
                
                                // Computer's move (after small delay)
                                setTimeout(() => {
                                    const botMove = level === 2
                                        ? gameInstance.hardComputerMove(p1, cpu)
                                        : gameInstance.simpleComputerMove(p1, cpu);
                
                                    if (botMove && botMove.x !== undefined && botMove.y !== undefined) {
                                        const botCard = document.querySelector(`#card-${botMove.x}-${botMove.y}`);
                                        if (botCard && !botCard.querySelector("img")) {
                                            const botImg = document.createElement("img");
                                            botImg.src = cpuImg;
                                            botImg.alt = cpu;
                                            botImg.style.width = "80%";
                                            botImg.style.height = "80%";
                                            botCard.appendChild(botImg);
                                        }
                                    }
                
                                    if (botMove && botMove.isOver) {
                                        setTimeout(() => alert(botMove.winnerMessage), 100);
                                        return;
                                    }
                
                                    currentTurn = p1;
                                }, 1000); // Small delay for realism
                            });
                        game_board.appendChild(card);
                      }
                    }
               
                        Player.logIn(match,symbol,level);
                        console.log("player ",match," symbol ",symbol," level ",level)
                    
                  });
            
              })
        })
          
          friendImage.addEventListener('click',()=>{
              match = 1;
              const symbolX= document.querySelector('.symbol-x').addEventListener('click',()=>{symbol = 'x';});
              const symbolO= document.querySelector('.symbol-o').addEventListener('click',()=>{symbol = 'o';});
            console.log("helllllloooo friend")

               
                matchBtn.addEventListener('click',()=>{   
                  choose_match_container.style.display="none";
                enter_your_name.style.display="flex";

                nameBtn.addEventListener('click',()=>{
                  let currentTurn = symbol; // Start with chosen symbol, 'x' or 'o'

                    GameBoard.players.player1=player_one_name.value;
                    GameBoard.players.player2=player_two_name.value;

                    player_one_label.textContent=GameBoard.players.player1;
                    player_two_label.textContent=GameBoard.players.player2;

                    console.log(GameBoard.players)
                    enter_your_name.style.display="none";
                    game.style.display="flex"
                    player1_avatar.src = "Assets/friend.png";
                    player2_avatar.src = "Assets/friend.png";


                    let turn = 0;
                    for (let i = 0; i < 3; i++) {
                      for (let j = 0; j < 3; j++) {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.id = `card-${i}-${j}`;
                        card.dataset.x = i;
                        card.dataset.y = j;
                        card.textContent = GameBoard.gameBoard[i][j]; // Initially " "
                        card.addEventListener('click', (e) => {
                          console.log(`Card ${card.id} clicked`);
                          if (card.querySelector('img')){return};

                                  const img = document.createElement('img');
                                  img.src = currentTurn === "x" ? "Assets/x.png" : "Assets/o.png";
                                  img.alt = currentTurn;
                                  img.style.width = "80%";
                                  img.style.height = "80%";


                                  // Update game board state
                                  const x = parseInt(card.dataset.x);
                                  const y = parseInt(card.dataset.y);
                                  GameBoard.gameBoard[x][y] = currentTurn;


                                  // Optionally check winner
                                  const result = Game().setInput(x, y, currentTurn);
                                  card.appendChild(img);

                                  if (result.isOver) {
                                    setTimeout(() => alert(result.winnerMessage), 100);
                                  }

                                  // Toggle turn
                                  currentTurn = currentTurn === "x" ? "o" : "x";
                          // Here you can call playerMove or setInput depending on turn
                        });
                        game_board.appendChild(card);
                      }
                    }  
                })
          });  
        });       
    })
}
DomRender();