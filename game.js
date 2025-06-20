
  //**************************GameBoard************************************************************* *//

const GameBoard = (function () {
    let gameBoard = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "],
    ];
  
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
  
    return { gameBoard, render_gameBoard, isBoardFull };
  })();


  //**************************Game************************************************************* *//
  
  function Game() {
        function validInputNumber(choice) {
        return !isNaN(choice) && choice >= 0 && choice <= 2;
        }
    
        function checkXO(choice) {
        return (choice === "x" || choice === "o") && choice !== " ";
        }
    
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
        };
        }
  
        function playerMove(symbol, playerNumber) {
        let x = parseInt(prompt(`Player ${playerNumber} - Enter X (0-2):`));
        while (!validInputNumber(x)) {
            x = parseInt(prompt("Invalid X. Enter 0, 1, or 2:"));
        }
    
        let y = parseInt(prompt(`Player ${playerNumber} - Enter Y (0-2):`));
        while (!validInputNumber(y)) {
            y = parseInt(prompt("Invalid Y. Enter 0, 1, or 2:"));
        }
    
        while (GameBoard.gameBoard[x][y] !== " ") {
            alert("Cell occupied! Choose again.");
            return playerMove(symbol, playerNumber);
        }
    
        return setInput(x, y, symbol);
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
      
  
    return { playerMove, simpleComputerMove,hardComputerMove, checkXO };
  }


  //**************************Player************************************************************ *//
  
  const Player = (function () {
    const game = Game();
    let level = "easy";
  
    const logIn = () => {
      alert("🎮 Welcome to Tic Tac Toe!");
  
      let mode = prompt("Play with 'friend' or 'computer'?");

  
      let p1 = prompt("Player 1 - Choose X or O").toLowerCase();
      while (!game.checkXO(p1)) {
        p1 = prompt("Invalid. Choose X or O").toLowerCase();
      }
  
      let p2 = p1 === "x" ? "o" : "x";
      console.log(`Player 1 is ${p1}, Player 2 is ${p2}`);
      GameBoard.render_gameBoard();
  
      if (parseInt(mode) === 2) {
        level = prompt("easy or hard ?").toLowerCase();
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
  
  Player.logIn();
  