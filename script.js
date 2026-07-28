const Gameboard = ( function() {
        const board = ["", "", "", "", "", "", "", "", ""];

    function placeMark(index, mark) {
        board[index] = mark;
    }


        return {
            getBoard: function() { return board; },
            printBoard: function() { console.log(board); },
            placeMark: placeMark,
        
        };
}) ();

    const createPlayer = (name, mark) => {
    return { name, mark };
}
    const player1 = createPlayer("player 1", "X");
    const player2 = createPlayer("player 2", "O")


const GameController = (function() {
    const players = [player1, player2];

    let currentPlayer = player1;

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
    };

    function checkTie() {
        const board = Gameboard.getBoard();
        return !board.includes("");
    }

    function playRound(index) {
        if (Gameboard.getBoard()[index] === ""){
            Gameboard.placeMark(index, currentPlayer.mark);
            
            if (checkWin()) {
                console.log(`${currentPlayer.mark} wins!`)
            } else if (checkTie()) {
                console.log("It's a tie!");
            } else {
                switchTurn();
            }
        }
    }
    
    return {
        playRound,
    };


}) ();
