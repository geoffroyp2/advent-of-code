// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {{ x: number, y: number }} Coord
 * @typedef {{A: Coord; B: Coord; T: Coord}} Machine
 */

const input = readInput('13');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const machines = input.split('\n\n').map((block) => getMachine(block, 0));

    let total = 0;
    for (const machine of machines) {
        total += getScore(machine);
    }
    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const machines = input.split('\n\n').map((block) => getMachine(block, 10000000000000));

    let total = 0;
    for (const machine of machines) {
        total += getScore(machine);
    }
    console.log(total);
}

/**
 * @param {Machine} machine
 * @returns {number}
 */
function getScore(machine) {
    const matrix = [
        [machine.A.x, machine.B.x, machine.T.x],
        [machine.A.y, machine.B.y, machine.T.y],
    ];

    solve(matrix);

    const nA = matrix[0][2];
    const nB = matrix[1][2];

    if (isInteger(nA) && isInteger(nB)) {
        return nA * 3 + nB;
    }
    return 0;
}

/**
 * @param {number} n
 */
function isInteger(n) {
    const e = Math.abs(n - Math.round(n));
    return e < 1e-3 || e > 1 - 1e-3;
}

/** @param {number[][]} matrix */
function solve(matrix) {
    const height = matrix.length;
    const width = matrix[0].length;
    let pivotY = -1;

    for (let x = 0; x < width; x++) {
        let y = 0;
        let ymax = matrix[0][y];
        for (let dy = pivotY + 1; dy < height; dy++) {
            const value = Math.abs(matrix[dy][x]);
            if (value > ymax) {
                ymax = value;
                y = dy;
            }
        }

        const pivot = matrix[y][x];
        if (pivot === 0) continue;

        pivotY++;
        if (pivotY >= height) break;

        for (let dx = 0; dx < width; dx++) {
            matrix[y][dx] /= pivot;
        }

        if (y !== pivotY) {
            const xRow = matrix[y];
            const rRow = matrix[pivotY];
            matrix[y] = rRow;
            matrix[pivotY] = xRow;
        }

        for (let dy = 0; dy < height; dy++) {
            if (dy === pivotY) continue;
            const factor = matrix[dy][x];
            for (let dx = 0; dx < width; dx++) {
                matrix[dy][dx] -= factor * matrix[pivotY][dx];
            }
        }
    }
}

/**
 * @param {string} block
 * @param {number} offset
 * @returns {Machine}
 */
function getMachine(block, offset) {
    const [Astr, Bstr, Tstr] = block.split('\n');
    return {
        A: getCoord(Astr, 0),
        B: getCoord(Bstr, 0),
        T: getCoord(Tstr, offset),
    };
}

/**
 * @param {string} buttonStr
 * @param {number} offset
 */
function getCoord(buttonStr, offset) {
    const m = buttonStr.match(/(?:X[+=](\d+)).*?(?:Y[+=](\d+))/);
    const AX = m?.at(1) ?? '0';
    const AY = m?.at(2) ?? '0';
    return {x: parseInt(AX) + offset, y: parseInt(AY) + offset};
}
