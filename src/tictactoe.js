/**
 * Created by hyaghinloo on 4/23/17.
 */

class TicTacToe {
    constructor(container = 'tictactoe', gameSize = 3) {
        this.container = document.getElementById(container); // selector for the container div ID
        this.gameSize = gameSize; // get the board size

        // initialize the game
        this.initGame();
    }

    // create the initial game state
    setInitialState() {
        for (let x = 0; x < this.gameSize; x++) {
            this.state.push([]);
            for (let y = 0; y < this.gameSize; y++) {
                this.state[x][y] = 0;
            }
        }
    }


    // fill the game area with given setup
    createBoard() {
        let outputStr = ``;
        const cellFactory = (x, y) => `<div style=" " class ='tictactoe_cell' data-x="${x}" data-y="${y}"></div> `;
        for (let x = 0; x < this.gameSize; x++)
            for (let y = 0; y < this.gameSize; y++)
                outputStr += cellFactory(x, y);

        // fill the container with the markup
        this.container.innerHTML = outputStr;
        document.getElementById('tictactoe_msg').style.cursor = 'default';
    }

    attachEvents() {
        this.container.addEventListener('click', (e) => {
            e.preventDefault();
            const clickedCell = e.target || e.srcElement;
            const cellUpdate = this.setState(clickedCell);
            if (cellUpdate !== 0) {
                clickedCell.innerHTML = `<div class="tictactoe_cell-state">${cellUpdate}</div>`;
                this.sendMessage();
            }
        });
        document.getElementById('tictactoe_msg').addEventListener('click', (e) => {
            e.preventDefault();
            if (this.gameFinished === true) this.initGame();
        });
    }

    initGame() {
        // reset the game state
        this.resetGame();
        this.setInitialState();
        this.createBoard();
        this.attachEvents();
        this.sendMessage()
    }


    resetGame() {
        this.gameFinished = false; // game end flag
        this.activePlayer = 1; // flag to identify the active player
        this.state = []; // game state
        this.filledCells = 0; // counter for clicked cells
    }

    // update the game state
    setState(cell) {
        if (cell.className !== "tictactoe_cell") return 0;
        const x = cell.getAttribute('data-x');
        const y = cell.getAttribute('data-y');
        let cellUpdate = 0;
        if (this.state[x][y] === 0) {
            this.state[x][y] = this.activePlayer;
            cellUpdate = (this.activePlayer === 1) ? 'X' : 'O';

            this.activePlayer = (this.activePlayer === 1) ? 2 : 1;
            this.filledCells++;

        }
        return cellUpdate;

    }

    // send message to the user
    sendMessage() {
        let outputMsg;
        if (this.filledCells < Math.pow(this.gameSize, 2)) {
            outputMsg = 'Now Player : ';
            outputMsg += (this.activePlayer === 1 ) ? 'X' : 'O';
        } else {
            outputMsg = 'Game Finished! click here to reset';
            this.gameFinished = true;
            document.getElementById('tictactoe_msg').style.cursor = 'pointer';
            this.checkforwinner();
        }
        document.getElementById('tictactoe_msg').innerHTML = outputMsg;

    }

    checkforwinner() {

        // winner logic goes here
        let winnerMessage = 'no one wins';
        const checkforwin = (win) => {
            let winner = true;
            for (let x = 0; x < this.gameSize; x++) {
                let colwinner = true;
                for (let y = 0; y < this.gameSize; y++) {

                    if (this.state[x][y] !== win) colwinner = false
                }
                if (colwinner == true)return true;
            }
            for (let x = 0; x < this.gameSize; x++) {
                let rowwinner = true;
                for (let y = 0; y < this.gameSize; y++) {

                    if (this.state[y][x] !== win) rowwinner = false
                }
                if (rowwinner == true)return true;
            }

            let diag1winner = true;
            for (let x = 0; x < this.gameSize; x++) {
                if (this.state[x][x] !== win) diag1winner = false

            }
            if (diag1winner == true)return true;

            let diag2winner = true;
            for (let x = 0; x < this.gameSize; x++) {
                if (this.state[(this.gameSize - x - 1)][x] !== win) diag2winner = false

            }
            if (diag2winner == true)return true;

            return false;
        }
        const xIswinner = checkforwin(1);
        const oIswinner = checkforwin(2);

        console.log('x is winner', xIswinner);
        console.log('o is winner', oIswinner);
        if (xIswinner && oIswinner) {
            winnerMessage = ' both are winners ';
        } else {
            if (xIswinner) {
                winnerMessage = ' X is winner';
            }
            if (oIswinner) {
                winnerMessage = ' O is winner'
            }

        }
        document.getElementById('tictactoe_msg-winner').innerHTML = winnerMessage;


    }

}

new TicTacToe();