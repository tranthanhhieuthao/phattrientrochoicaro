const VALUE_EMPTY = 1;
const VALUE_X = 2;
const VALUE_O = 3;
const DEFAULT_COLS = 21;
const DEFAULT_ROWS = 21;
const DEFAULT_CELL_SIZE = 40;
const DEFAULT_top_left =40;

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.value = VALUE_EMPTY;
    this.getHtml = function(){
        let left = x * DEFAULT_top_left;
        let top = y * DEFAULT_top_left;
        let cellHtml = '<div id="C'+x+'D'+y+'" onclick="play('+x+','+y+')"  style="position: absolute; width: '+
            DEFAULT_CELL_SIZE+'px; height:'+
            DEFAULT_CELL_SIZE+'px; left:'+
            left+'px; top:'+
            top+'px; line-height: '+
            DEFAULT_CELL_SIZE+'px;border:solid 1px blue;font-size:35px"></div>';
        return cellHtml;
    };

    this.draw = function () {
        let cellDiv = document.getElementById("C"+x+"D"+y);
        switch (this.value){
            case VALUE_X:
                cellDiv.innerHTML = "O";
                break;
            case VALUE_O:
                cellDiv.innerHTML = "X";
                break;
            default:
                cellDiv.innerHTML = "";
                break;
        }
    }
}

function GameBoard(rows, cols, elementId) {
    this.rows = rows;
    this.cols = cols;
    this.elementId = elementId;
    this.turn = VALUE_O;
    this.cells = [];
    this.isOver = false;

    this.draw = function () {
        let gameBoardDiv = document.getElementById(this.elementId);
        gameBoardDiv.innerHTML = "";
        for(let i = 0; i < this.rows; i++){
            let row = [];
            this.cells.push(row);
            for(let j = 0; j < this.cols; j++){
                let cell = new Cell(i, j);
                row.push(cell);
                gameBoardDiv.innerHTML += cell.getHtml();
            }
        }
    };

    this.play = function (x, y) {
        if(this.isOver) {
            return;
        }
        let cell = this.cells[x][y];
        if(cell.value === VALUE_EMPTY){
            cell.value = this.turn;
            cell.draw();
            this.check(x, y);
            if(this.turn === VALUE_O){
                this.turn = VALUE_X;
            } else {
                this.turn = VALUE_O;
            }
        } else {
            alert("Cell is not empty");
        }
    };

    this.check = function (x, y) {
        let cell = this.cells[x][y];
        //Horizontal
        let count = 1;
        let i = 1;
        while((y + i < this.cols) && this.cells[x][y + i].value ===  cell.value){
            count++;
            i++;
        }
         i = 1;
        while((y - i >= 0) && this.cells[x][y - i].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        //Vertical
        count = 1;
         i = 1;
        while((x + i < this.rows) &&this.cells[x + i][y].value ===  cell.value){
            count++;
            i++;
        }
         i = 1;
        while((x - i >= 0) &&this.cells[x - i][y].value ===  cell.value){
            count++;
            i++;
        }
        this.endGame(count);
        //Left diagonal
        count = 1;
         i = 1;
        let j = 1;
        while((y + i < this.cols) && (x + i < this.rows) && this.cells[x + i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
         i = 1;
         j = 1;
        while((x - i >= 0) && (y - j >= 0) && this.cells[x - i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
        //Right diagonal
         count = 1;
         i = 1;
         j = 1;
        while((y + j < this.cols) && (x - i >= 0) && this.cells[x - i][y + j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        i = 1;
        j = 1;
        while((y - j >= 0) && (x + i < this.rows) &&this.cells[x + i][y - j].value ===  cell.value){
            count++;
            i++;
            j++;
        }
        this.endGame(count);
    };

    this.endGame = function (count) {
        if(count >= 5){
            this.isOver = true;
            alert("You won!!!");
        }
    };
}

function play(x, y) {
    gameBoard.play(x, y);
}

function start() {
    gameBoard = new GameBoard(DEFAULT_ROWS, DEFAULT_COLS, "game-board");
    gameBoard.draw();
}
let gameBoard;
start();