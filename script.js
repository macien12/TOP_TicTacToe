const Gameboard = (function() {
    let board = ["", "", "", "", "", "", "", "", ""]; // Changed const to let

    function placeMark(index, mark) {
        board[index] = mark;
    }

    function resetBoard() {
        board = ["", "", "", "", "", "", "", "", ""];
    }

function printBoard() {
        // Map empty strings to spaces so the grid borders stay perfectly aligned
        const b = board.map(cell => cell === "" ? " " : cell);
        
        console.log(`
 ${b[0]} | ${b[1]} | ${b[2]} 
---+---+---
 ${b[3]} | ${b[4]} | ${b[5]} 
---+---+---
 ${b[6]} | ${b[7]} | ${b[8]} 
        `);
    }

    return {
        getBoard: function() { return board; },
        printBoard,
        placeMark,
        resetBoard,
    };
})();

const createPlayer = (name, mark) => {
    return { name, mark };
};

const player1 = createPlayer("player 1", "X");
const player2 = createPlayer("player 2", "O");

const GameController = (function() {
    const players = [player1, player2];
    let currentPlayer = player1;
    let isGameOver = false;

    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    function switchTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }

    function checkWin() {
        const board = Gameboard.getBoard();
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => board[index] === currentPlayer.mark);
        });
    }

    function checkTie() {
        const board = Gameboard.getBoard();
        return !board.includes("");
    }

    function playRound(index) {
        if (isGameOver) return;

        if (Gameboard.getBoard()[index] === "") {
            Gameboard.placeMark(index, currentPlayer.mark);

            Gameboard.printBoard();

            if (checkWin()) {
                isGameOver = true;
                console.log(`${currentPlayer.mark} wins!`);
            } else if (checkTie()) {
                isGameOver = true;
                console.log("It's a tie!");
            } else {
                switchTurn();
            }
        }
    }

    function resetGame() {
        isGameOver = false;
        Gameboard.resetBoard();
        currentPlayer = player1;
    }

    return {
        playRound,
        resetGame,
    };
})();