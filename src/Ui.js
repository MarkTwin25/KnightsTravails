import { getCellsBetween } from './controller.js';

const board = document.getElementById('board');

export function createBoard() {
    for (let row = 0; row < 8; row++) {
        for (let column = 0; column < 8; column++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${row}${column}`;
            board.appendChild(cell);

            if (row % 2 === column % 2) {
                cell.style.backgroundColor = '#44413D';
            } else {
                cell.style.backgroundColor = 'white';
            }
        }
    }
}

export function putMark(position, mark, isNum = false) {
    const cell = document.getElementById(`${position[0]}${position[1]}`);
    const horse = document.createElement('div');

    if (isNum) {
        horse.classList.add('num');
    } else {
        horse.classList.add('horse');
    }
    horse.innerHTML = mark;
    cell.appendChild(horse);
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function horseAnimation(path) {
    const initialCell = document.getElementById(`${path[0].join('')}`);
    putMark(path[0], 0, true);
    initialCell.style.backgroundColor = '#eb5e28';
    for (let i = 1; i < path.length; i++) {
        let start = path[i - 1];
        let end = path[i];
        let cellsBetween = getCellsBetween(path[i - 1], path[i]);
        let current = start;
        for (let j = 0; j < cellsBetween.length; j++) {
            await wait(150);
            moveHorse(current, cellsBetween[j]);
            current = cellsBetween[j];
        }
        await wait(300);
        const landingCell = document.getElementById(`${end[0]}${end[1]}`);
        landingCell.innerHTML = '';
        moveHorse(current, end);
        await wait(300);
        landingCell.style.backgroundColor = '#eb5e28';

        putMark(end, i, true);
    }
}

function moveHorse(start, end) {
    const oldCell = document.getElementById(`${start[0]}${start[1]}`);
    const oldHorse = oldCell.querySelector('.horse');
    if (oldHorse) {
        oldHorse.remove();
    }
    putMark(end, '&#9822');
}

export function clearBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
        cell.innerHTML = '';
        const row = parseInt(cell.id[0]);
        const column = parseInt(cell.id[1]);

        if (row % 2 === column % 2) {
            cell.style.backgroundColor = '#44413D';
        } else {
            cell.style.backgroundColor = 'white';
        }
    });
}
