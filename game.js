
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
    const reset = () => {
      // Directly mutate the `gameBoard` array
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          gameBoard[i][j] = " ";
        }
      }
      console.log("reset yeeeeee");

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
  
    return { gameBoard, reset,render_gameBoard, isBoardFull,players };
  })();


  //**************************Game************************************************************* *//
  
  function Game() {
    
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
          //  GameBoard.reset();
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
        if (result.isOver) {
          setTimeout(() => {
            winnerIs.textContent = result.winnerMessage;
            winnerDialog.showModal();
          }, 100);
          return;
        }
        
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
          if (result.isOver) {
            setTimeout(() => {
              winnerIs.textContent = result.winnerMessage;
              winnerDialog.showModal();
            }, 100);
            return;
          }
          
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
      return result.winnerMessage;
    };
  
    return { logIn };
  })();
  
//   Player.logIn();





function DomRender() {


  let match = 0;
  let level = 0;
  let symbol = '';
 
  

  const container = document.querySelector('.welcome-container');
  const choose_match_container = document.querySelector('.choose-match-container');
  const choose_level_container = document.querySelector('.choose-level-container');
  const enter_your_name = document.querySelector('.enter-your-name');
  const game = document.querySelector('.game');
  const game_board = document.querySelector('.game-board');

  const player1_avatar = document.querySelector('.player1');
  const player2_avatar = document.querySelector('.player2');

  const player_one_name = document.querySelector('#player1-name');
  const player_two_name = document.querySelector('#player2-name');
  const player_one_label = document.querySelector('#player-1');
  const player_two_label = document.querySelector('#player-2');

  const playButton = document.querySelector('.playBtn');
  const matchBtn = document.querySelector('#matchBtn');
  const leveBtn = document.querySelector('#leveBtn');
  const nameBtn = document.querySelector('#nameBtn');

  const botImage = document.querySelector('.botImage');
  const friendImage = document.querySelector('.friendImage');

  const symbolx = document.querySelector('.symbol-x');
  const symboly = document.querySelector('.symbol-o');


  symbolx.addEventListener('click', () => {
    symbol = 'x';
  if (symbolx) {
    symbolx.style.boxShadow = "0 9px 30px rgb(255, 255, 255)";
    symboly.style.boxShadow = "none";

  }
});

symboly.addEventListener('click', () => {
  if (symboly) {
    symboly.style.boxShadow = "0 9px 30px rgb(255, 255, 255)";
    symbolx.style.boxShadow = "none";

  }
  symbol = 'o';
});

      const turnPlayer1 = document.querySelector('.player1');
      const turnPlayer2 = document.querySelector('.player2');


  const simpleLevel=document.querySelector('#simpleLevel');
  const hardLevel =document.querySelector('#hardLevel'); 

  simpleLevel.addEventListener('click', () => {
    if (simpleLevel) {
      simpleLevel.style.background = "rgb(106, 233, 222)";
      simpleLevel.style.borderColor = "rgb(106, 233, 222)";

      simpleLevel.style.boxShadow = "0 0 30px rgb(57, 168, 159)";
      hardLevel.style.background = "#f1a94a";
      hardLevel.style.borderColor = "#f1a94a";
      hardLevel.style.boxShadow = "none";
  
    }
    level = 1});
  hardLevel.addEventListener('click', () => {
    if (hardLevel) {
      hardLevel.style.background = "rgb(106, 233, 222)";
      hardLevel.style.borderColor = "rgb(106, 233, 222)";
      hardLevel.style.boxShadow = "0 0 30px rgb(57, 168, 159)";
      simpleLevel.style.background = "#f1a94a";
      simpleLevel.style.borderColor = "#f1a94a";


      simpleLevel.style.boxShadow = "none";
  
    }
    level = 2});

  const winnerDialog = document.querySelector("#winnerDialog");
  const winnerIs = document.querySelector('#winnerIs');
  document.getElementById("playAgainBtn").addEventListener("click", () => {
    winnerDialog.close();
    container.style.display = "none";
    choose_match_container.style.display = "none";
    choose_level_container.style.display = "none";
    enter_your_name.style.display = "none";
    game.style.display = "flex";
  
    // Reset internal game state
    GameBoard.reset();
  
    // Clear the visual board
    document.querySelectorAll(".card").forEach(card => {
      card.innerHTML = "";
    });
    
    
  });

  document.querySelector('.logo').addEventListener('click', () => {
    container.style.display = "flex";
    choose_match_container.style.display = "none";
    choose_level_container.style.display = "none";
    enter_your_name.style.display = "none";
    game.style.display = "none";
    game_board.innerHTML = "";

    if (typeof GameBoard?.reset === 'function') GameBoard.reset();

    player_one_name.value = "";
    player_two_name.value = "";
  });

  playButton.addEventListener('click', () => {
    container.style.display = "none";
    choose_match_container.style.display = "flex";
  });
  const friendElement = document.getElementsByClassName('friendDiv')[0];
  const botElement = document.getElementsByClassName('botDiv')[0];

  // if(symbolx || symboly){

  botImage.addEventListener('click', () => {
    
    if (botElement) {
      botElement.style.boxShadow = "0 9px 30px rgb(98, 232, 255)";
      friendElement.style.boxShadow = "none";

    }
    console.log(symbol)

    match = 2;
    
    matchBtn.addEventListener('click', () => {
      choose_match_container.style.display = "none";
      enter_your_name.style.display = "none";
      if (symbol === '') {
        console.log(symbol)
       choose_match_container.style.display = "flex";
        
      }else{
      choose_level_container.style.display = "flex";
      }
    });
  

    leveBtn.addEventListener('click', () => {
      choose_level_container.style.display = "none";
      enter_your_name.style.display = "none";

      game.style.display = "flex";

      GameBoard.players.player1 = "You";
      GameBoard.players.player2 = "Bot";
      player_one_label.textContent = GameBoard.players.player1;
      player_two_label.textContent = GameBoard.players.player2;
      player1_avatar.src = "Assets/friend.png";
      player2_avatar.src = "Assets/image.png";

      const gameInstance = Game();
      const p1 = symbol;
      const cpu = symbol === "x" ? "o" : "x";
      const playerImg = p1 === "x" ? "Assets/x.png" : "Assets/o.png";
      const cpuImg = cpu === "x" ? "Assets/x.png" : "Assets/o.png";
      let currentTurn = p1;

      game_board.innerHTML = "";

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.id = `card-${i}-${j}`;

          card.addEventListener("click", () => {
            if (currentTurn !== p1 || card.querySelector("img")) return;

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


              currentTurn = p1;

              if (botMove && botMove.isOver) {
                setTimeout(() => {
                  winnerIs.textContent = botMove.winnerMessage;
                  winnerDialog.showModal();
                  console.log("winner winner")
                }, 100);
                return;
              }
              
            }, 1000);
          });

          game_board.appendChild(card);
        }
      }
     
      Player.logIn(match, symbol, level);
    });
    
  });
// }

  friendImage.addEventListener('click', () => {
    if (friendElement) {
      friendElement.style.boxShadow = "0 9px 30px rgb(223, 194, 33)";
      botElement.style.boxShadow = "none";
    }
    match = 1;
    matchBtn.addEventListener('click', () => {
      choose_match_container.style.display = "none";
      choose_level_container.style.display = "none";
      if (symbol === '') {
        console.log(symbol)
      choose_match_container.style.display = "flex";
      }else{
      enter_your_name.style.display = "flex";
    }
    });

    nameBtn.addEventListener('click', () => {
      choose_level_container.style.display = "none";
      enter_your_name.style.display = "none";
      game.style.display = "flex";

      GameBoard.players.player1 = player_one_name.value;
      GameBoard.players.player2 = player_two_name.value;
      player_one_label.textContent = GameBoard.players.player1;
      player_two_label.textContent = GameBoard.players.player2;
      player1_avatar.src = "Assets/friend.png";
      player2_avatar.src = "Assets/friend.png";

      let currentTurn = symbol;
      game_board.innerHTML = "";
      
      

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const card = document.createElement("div");
          card.classList.add("card");
          card.id = `card-${i}-${j}`;
          card.dataset.x = i;
          card.dataset.y = j;
          card.textContent = GameBoard.gameBoard[i][j];

          card.addEventListener("click", () => {
            if (card.querySelector("img")) return;

            const img = document.createElement("img");
            img.src = currentTurn === "x" ? "Assets/x.png" : "Assets/o.png";
            img.alt = currentTurn;
            img.style.width = "80%";
            img.style.height = "80%";

            const x = parseInt(card.dataset.x);
            const y = parseInt(card.dataset.y);
            GameBoard.gameBoard[x][y] = currentTurn;

            const result = Game().setInput(x, y, currentTurn);
            card.appendChild(img);


            currentTurn = currentTurn === "x" ? "o" : "x";
            turnPlayer1.classList.toggle('highlight', currentTurn === 'x');
            turnPlayer2.classList.toggle('highlight', currentTurn === 'o');

            if (result.isOver) {
              setTimeout(() => {
                winnerIs.textContent = result.winnerMessage;
                winnerDialog.showModal();
              }, 100);
              return;
            }
            
          })
          
          game_board.appendChild(card);
        }
      }
    });
  });
}

DomRender();
