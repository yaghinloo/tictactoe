'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hyaghinloo on 4/23/17.
 */

var TicTacToe = function () {
    function TicTacToe() {
        var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'tictactoe';
        var gameSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3;

        _classCallCheck(this, TicTacToe);

        this.container = document.getElementById(container); // selector for the container div ID
        this.gameSize = gameSize; // get the board size

        // initialize the game
        this.initGame();
    }

    // create the initial game state


    _createClass(TicTacToe, [{
        key: 'setInitialState',
        value: function setInitialState() {
            for (var x = 0; x < this.gameSize; x++) {
                this.state.push([]);
                for (var y = 0; y < this.gameSize; y++) {
                    this.state[x][y] = 0;
                }
            }
        }

        // fill the game area with given setup

    }, {
        key: 'createBoard',
        value: function createBoard() {
            var outputStr = '';
            document.getElementById('tictactoe_msg-winner').innerHTML = 'Do your best. You can win!';
            var cellFactory = function cellFactory(x, y) {
                return '<div style=" " class =\'tictactoe_cell\' data-x="' + x + '" data-y="' + y + '"></div> ';
            };
            for (var x = 0; x < this.gameSize; x++) {
                for (var y = 0; y < this.gameSize; y++) {
                    outputStr += cellFactory(x, y);
                }
            } // fill the container with the markup
            this.container.innerHTML = outputStr;
            document.getElementById('tictactoe_msg').style.cursor = 'default';
        }
    }, {
        key: 'attachEvents',
        value: function attachEvents() {
            var _this = this;

            this.container.addEventListener('click', function (e) {
                e.preventDefault();
                var clickedCell = e.target || e.srcElement;
                var cellUpdate = _this.setState(clickedCell);
                if (cellUpdate !== 0) {
                    clickedCell.innerHTML = '<div class="tictactoe_cell-state">' + cellUpdate + '</div>';
                    _this.sendMessage();
                }
            });
            document.getElementById('tictactoe_msg').addEventListener('click', function (e) {
                e.preventDefault();
                if (_this.gameFinished === true) _this.initGame();
            });
        }
    }, {
        key: 'initGame',
        value: function initGame() {
            // reset the game state
            this.resetGame();
            this.setInitialState();
            this.createBoard();
            this.attachEvents();
            this.sendMessage();
        }
    }, {
        key: 'resetGame',
        value: function resetGame() {
            this.gameFinished = false; // game end flag
            this.activePlayer = 1; // flag to identify the active player
            this.state = []; // game state
            this.filledCells = 0; // counter for clicked cells
        }

        // update the game state

    }, {
        key: 'setState',
        value: function setState(cell) {
            if (cell.className !== "tictactoe_cell") return 0;
            var x = cell.getAttribute('data-x');
            var y = cell.getAttribute('data-y');
            var cellUpdate = 0;
            if (this.state[x][y] === 0) {
                this.state[x][y] = this.activePlayer;
                cellUpdate = this.activePlayer === 1 ? 'X' : 'O';

                this.activePlayer = this.activePlayer === 1 ? 2 : 1;
                this.filledCells++;
            }
            return cellUpdate;
        }

        // send message to the user

    }, {
        key: 'sendMessage',
        value: function sendMessage() {
            var outputMsg = void 0;
            if (this.filledCells < Math.pow(this.gameSize, 2)) {
                outputMsg = 'Now Player : ';
                outputMsg += this.activePlayer === 1 ? 'X' : 'O';
            } else {
                outputMsg = 'Game Finished! click here to reset';
                this.gameFinished = true;
                document.getElementById('tictactoe_msg').style.cursor = 'pointer';
                this.checkforwinner();
            }
            document.getElementById('tictactoe_msg').innerHTML = outputMsg;
        }
    }, {
        key: 'checkforwinner',
        value: function checkforwinner() {
            var _this2 = this;

            // winner logic goes here
            var winnerMessage = 'no one wins';
            var checkforwin = function checkforwin(win) {
                var winner = true;
                for (var x = 0; x < _this2.gameSize; x++) {
                    var colwinner = true;
                    for (var y = 0; y < _this2.gameSize; y++) {

                        if (_this2.state[x][y] !== win) colwinner = false;
                    }
                    if (colwinner == true) return true;
                }
                for (var _x3 = 0; _x3 < _this2.gameSize; _x3++) {
                    var rowwinner = true;
                    for (var _y = 0; _y < _this2.gameSize; _y++) {

                        if (_this2.state[_y][_x3] !== win) rowwinner = false;
                    }
                    if (rowwinner == true) return true;
                }

                var diag1winner = true;
                for (var _x4 = 0; _x4 < _this2.gameSize; _x4++) {
                    if (_this2.state[_x4][_x4] !== win) diag1winner = false;
                }
                if (diag1winner == true) return true;

                var diag2winner = true;
                for (var _x5 = 0; _x5 < _this2.gameSize; _x5++) {
                    if (_this2.state[_this2.gameSize - _x5 - 1][_x5] !== win) diag2winner = false;
                }
                if (diag2winner == true) return true;

                return false;
            };
            var xIswinner = checkforwin(1);
            var oIswinner = checkforwin(2);

            console.log('x is winner', xIswinner);
            console.log('o is winner', oIswinner);
            if (xIswinner && oIswinner) {
                winnerMessage = ' both are winners ';
            } else {
                if (xIswinner) {
                    winnerMessage = ' X is winner';
                }
                if (oIswinner) {
                    winnerMessage = ' O is winner';
                }
            }
            document.getElementById('tictactoe_msg-winner').innerHTML = winnerMessage;
        }
    }]);

    return TicTacToe;
}();

new TicTacToe();
