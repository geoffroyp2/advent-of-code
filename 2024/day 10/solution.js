// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('10');
step1(input);
step2(input);

/**
 * @typedef {object} Coord
 * @property {number} x
 * @property {number} y
 */

/** @param {string} input */
function step1(input) {
    const grid = input.split('\n').map((line) => line.split('').map(Number));
    const height = grid.length;
    const width = grid[0].length;

    /** @type {Coord[]} */ const starts = [];
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (grid[y][x] === 0) starts.push({x, y});
        }
    }

    let total = 0;
    for (const start of starts) {
        /** @type {Coord[]} */ const endings = [];
        addPaths(start, grid, endings);

        /** @type {Coord[]} */ const unique = [];
        for (const e of endings) {
            if (!unique.some((u) => u.x === e.x && u.y === e.y)) {
                unique.push(e);
            }
        }
        total += unique.length;
    }

    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const grid = input.split('\n').map((line) => line.split('').map(Number));
    const height = grid.length;
    const width = grid[0].length;

    /** @type {Coord[]} */ const starts = [];
    for (let y = 0; y < height; ++y) {
        for (let x = 0; x < width; ++x) {
            if (grid[y][x] === 0) starts.push({x, y});
        }
    }

    let total = 0;
    for (const start of starts) {
        /** @type {Coord[]} */ const endings = [];
        addPaths(start, grid, endings);
        total += endings.length;
    }

    console.log(total);
}

/**
 * @param {Coord} coord
 * @param {number[][]} grid
 * @param {Coord[]} endings
 */
function addPaths(coord, grid, endings) {
    const value = grid[coord.y][coord.x];

    if (value === 9) {
        endings.push(coord);
        return;
    }

    const next = [
        {x: coord.x + 1, y: coord.y},
        {x: coord.x - 1, y: coord.y},
        {x: coord.x, y: coord.y + 1},
        {x: coord.x, y: coord.y - 1},
    ];

    for (const n of next) {
        if (grid[n.y]?.[n.x] === value + 1) {
            addPaths(n, grid, endings);
        }
    }
}
