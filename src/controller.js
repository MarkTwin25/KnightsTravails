export function getJumps(position) {
    const possibilities = [
        [position[0] + 1, position[1] + 2],
        [position[0] - 1, position[1] + 2],
        [position[0] + 1, position[1] - 2],
        [position[0] - 1, position[1] - 2],
        [position[0] + 2, position[1] + 1],
        [position[0] + 2, position[1] - 1],
        [position[0] - 2, position[1] + 1],
        [position[0] - 2, position[1] - 1],
    ];
    const sol = [];

    for (let posibility of possibilities) {
        if (
            posibility[0] >= 0 &&
            posibility[0] <= 7 &&
            posibility[1] >= 0 &&
            posibility[1] <= 7
        ) {
            sol.push(posibility);
        }
    }
    return sol;
}

export function knightMoves(start, end) {
    const queue = new Array();
    queue.push([start]);
    const visited = new Set();
    visited.add(start.toString());

    while (queue.length !== 0) {
        let path = queue.shift();
        let current = path[path.length - 1];

        if (current[0] === end[0] && current[1] === end[1]) {
            return path;
        }

        const jumps = getJumps(current);

        for (const jump of jumps) {
            const jumpStr = jump.toString();

            if (!visited.has(jumpStr)) {
                visited.add(jumpStr);
                let temPath = [...path, jump];
                queue.push(temPath);
            }
        }
    }
}

export function getCellsBetween(start, end) {
    const xDiff = end[0] - start[0];
    const yDiff = end[1] - start[1];
    const sol = [];

    if (Math.abs(xDiff) === 2) {
        sol.push([start[0] + xDiff / 2, start[1]]);
        sol.push([end[0], start[1]]);
    } else {
        sol.push([start[0], start[1] + yDiff / 2]);
        sol.push([start[0], end[1]]);
    }

    return sol;
}
