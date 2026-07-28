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

    function switchTurn() {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }


    return {

    };
});
