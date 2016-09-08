import Square from './Square'

export default class GameBox {

    constructor(container, gridSize) {
        this._container = container;
        this._gridSize = gridSize;
        this.emptySquare = {};
        this.squares = [];
        this.emptySquare.X = this.emptySquare.Y = gridSize - 1;
        this.moves = 0;

        for (let i = 0; i < Math.pow(this.gridSize, 2) - 1; i++) {
            let square = new Square("square", i + 1);
            let X = (i % gridSize);
            let Y = parseInt((i / gridSize));
            square.square.addEventListener('click', function () {
                if (this.canMove(square)) {
                    this.shift(square);
                    this.moves++;
                    document.querySelector('#gameStatus span').innerText = this.moves + "";
                }
                if (this.gameWon()) {
                    this.showWinModal();
                }
            }.bind(this));
            square.move(X, Y);
            square.square.style.backgroundPosition = "-" + square.square.style.left + " -" + square.square.style.top;
            this._container.appendChild(square.square);
            this.squares.push(square);
        }
        document.querySelector('#gameStatus span').innerText = this.moves + "";
        this.shuffle();
    }

    shuffle() {
        for (let i = 0; i < 1000; i++) {
            let choices = this.squares.filter(function (s) {
                return this.canMove(s);
            }.bind(this));

            let choice = choices[Math.floor(Math.random() * choices.length)];
            this.shift(choice);
        }
        this.setBackground();
    }

    canMove(square) {
        return (Math.abs(this.emptySquare.X - square.X) + Math.abs(this.emptySquare.Y - square.Y) == 1);
    }

    shift(square) {
        let sX = square.X;
        let sY = square.Y;
        square.move(this.emptySquare.X, this.emptySquare.Y);
        this.emptySquare.X = parseInt(sX);
        this.emptySquare.Y = parseInt(sY);
    }

    get gridSize() {
        return this._gridSize;
    }

    set gridSize(gridSize) {
        while (this._container.firstChild) this._container.removeChild(this._container.firstChild);
        this.constructor(this._container, gridSize);
    };

    setBackground() {
        let n = Math.floor(Math.random() * 7) + 1;
        for (let s of this.squares) {
            s.square.style.backgroundImage = "url('./assets/img/" + n + ".jpg')";
        }
    }

    gameWon() {
        var prevY = -1;
        let prevX = -1;
        for (let square of this.squares) {
            if (square.Y < prevY || (square.X < prevX && prevX != this.gridSize - 1) || (square.X == square.Y && square.Y == this.gridSize - 1)) {
                return false
            }
            prevX = square.X;
            prevY = square.Y;
        }
        return true;
    };

    showWinModal() {
        let modalBg = document.createElement('div');
        modalBg.classList.add('modal-bg');
        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        modalContent.appendChild(document.createTextNode('You have won the game!'));
        let vid = document.createElement('iframe');
        vid.width = "100%";
        vid.style.border = 'none';
        vid.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&modestbranding=1&showinfo=0";
        document.body.classList.add('win');
        modalContent.appendChild(vid);
        modalBg.appendChild(modalContent);
        this._container.appendChild(modalBg);
    };

    deleteWinModal() {
        let modal;
        if (modal = this._container.querySelector('.modal-bg')) {
            this._container.removeChild(modal);
            document.body.classList.remove('win');
        }
        this.moves = 0;
        document.querySelector('#gameStatus span').innerText = this.moves + "";
    }
}