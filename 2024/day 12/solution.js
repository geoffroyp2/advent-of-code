// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {{x: number; y: number}} Coord
 * @typedef { 'U' | 'L' | 'D' | 'R'} Dir
 * @typedef {Coord & {visited: boolean; char: string}} Square
 * @typedef {{char: string; squares: Square[]}} Zone
 * @typedef {Coord & {dir: Dir}} Side
 */

/** @type {Side[]} */ const adjacentDirections = [
    {x: 1, y: 0, dir: 'R'},
    {x: -1, y: 0, dir: 'L'},
    {x: 0, y: 1, dir: 'D'},
    {x: 0, y: -1, dir: 'U'},
];

const input = readInput('12');
step1(input);
step2(input);

/**
 * @param {Square} square
 * @param {Square[][]} grid
 * @returns {(Square | undefined)[] }
 */
function adjacentSquares(square, grid) {
    return adjacentDirections.map((c) => grid[square.y + c.y]?.[square.x + c.x]);
}

/** @param {string} input */
function step1(input) {
    const grid = input.split('\n').map((line, y) => line.split('').map((char, x) => ({x, y, char, visited: false})));
    /** @type {Zone[]} */ const zones = getAllZones(grid);

    let total = 0;
    for (const z of zones) {
        total += z.squares.length * getPerimeter(z, grid);
    }

    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const grid = input.split('\n').map((line, y) => line.split('').map((char, x) => ({x, y, char, visited: false})));
    /** @type {Zone[]} */ const zones = getAllZones(grid);

    let total = 0;
    for (const z of zones) {
        total += z.squares.length * getSides(z, grid);
    }

    console.log(total);
}

/** @param {Square[][]} grid */
function getAllZones(grid) {
    const width = grid[0].length;
    const height = grid.length;

    /** @type {Zone[]} */ const zones = [];

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (!grid[y][x].visited) {
                zones.push(getZone(grid, grid[y][x]));
            }
        }
    }
    return zones;
}

/**
 * @param {Square[][]} grid
 * @param {Square} start
 * @returns {Zone}
 */
function getZone(grid, start) {
    /** @type {Square[]} */ const squares = [];
    const queue = [start];

    while (queue.length > 0) {
        const current = queue.shift();
        if (!current) break;

        if (current.visited) continue;
        current.visited = true;
        squares.push(current);

        const next = adjacentSquares(current, grid)
            .filter((s) => !!s)
            .filter((s) => !s.visited && s.char === current.char);
        queue.push(...next);
    }

    return {char: start.char, squares};
}

/**
 * @param {Zone} zone
 * @param {Square[][]} grid
 */
function getPerimeter(zone, grid) {
    let total = 0;
    for (const s of zone.squares) {
        const adj = adjacentSquares(s, grid);
        for (const a of adj) {
            if (a?.char === s.char) continue;
            total++;
        }
    }
    return total;
}

/**
 * @param {Zone} zone
 * @param {Square[][]} grid
 */
function getSides(zone, grid) {
    /** @type {Side[]} */ const allSides = [];
    for (const s of zone.squares) {
        for (const adj of adjacentDirections) {
            const square = grid[s.y + adj.y]?.[s.x + adj.x];
            if (square && square.char === s.char) continue;

            allSides.push({x: s.x, y: s.y, dir: adj.dir});
        }
    }

    let total = 0;

    const sides = Object.groupBy(allSides, (side) => side.dir);

    if (sides.L) {
        total += getSegmentsAmount(sides.L, 'x', 'y');
    }
    if (sides.R) {
        total += getSegmentsAmount(sides.R, 'x', 'y');
    }
    if (sides.D) {
        total += getSegmentsAmount(sides.D, 'y', 'x');
    }
    if (sides.U) {
        total += getSegmentsAmount(sides.U, 'y', 'x');
    }

    return total;
}

/**
 * @param {Side[]} sides
 * @param {'x' | 'y'} mainAxis
 * @param {'x' | 'y'} secAxis
 */
function getSegmentsAmount(sides, mainAxis, secAxis) {
    const gSides = Object.groupBy(sides, (side) => side[mainAxis]);

    let total = 0;
    for (const line of Object.values(gSides)) {
        if (!line) continue;
        line.sort((a, b) => a[secAxis] - b[secAxis]);

        let lineTotal = 1;
        let last = line[0][secAxis];
        for (let i = 1; i < line.length; i++) {
            if (Math.abs(line[i][secAxis] - last) !== 1) {
                lineTotal++;
            }
            last = line[i][secAxis];
        }
        total += lineTotal;
    }

    return total;
}
