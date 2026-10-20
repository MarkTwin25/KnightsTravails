import './styles.css';
import './template.html';
import { createBoard, putMark, horseAnimation, clearBoard } from './Ui.js';
import { knightMoves } from './controller.js';
createBoard();

const board = document.getElementById('board');
const clear = document.getElementById('clear');
let start = null;
let isAnimation = false;

board.addEventListener('click', (e) => {
    if (isAnimation) {
        return;
    }

    if (e.target.classList.contains('cell')) {
        const cellNum = e.target.id;
        const cellClicked = cellNum.split('').map((elem) => +elem);

        // first click
        if (start === null) {
            clearBoard();
            start = cellClicked;
            putMark(cellClicked, '&#9822');
        } else {
            // second click
            const end = cellClicked;
            if (start[0] === end[0] && start[1] === end[1]) {
                return;
            }
            putMark(cellClicked, 'X');

            isAnimation = true;

            const path = knightMoves(start, end);
            console.log(path);
            horseAnimation(path);
            start = null;
            isAnimation = false;
        }
    }
});

clear.addEventListener('click', () => {
    start = null;
    isAnimation = false;
    clearBoard();
});
