// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {{x: number; y: number}} Coord
 * @typedef {{pos: Coord; dir: Coord}} Machine
 */

const input = readInput('14');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    /** @type {Machine[]} */ const machines = input.split('\n').map((line) => {
        const [spos, sdir] = line.split(' ');
        return {pos: getCoord(spos), dir: getCoord(sdir)};
    });

    const width = 101;
    const height = 103;
    const steps = 100;

    const lastPos = machines.map((m) => getLastPos(m, steps, width, height));

    const quadrants = [0, 0, 0, 0];
    for (const pos of lastPos) {
        if (pos.x < width / 2 - 1 && pos.y < height / 2 - 1) {
            quadrants[0]++;
        }
        if (pos.x > width / 2 && pos.y < height / 2 - 1) {
            quadrants[1]++;
        }
        if (pos.x < width / 2 - 1 && pos.y > height / 2) {
            quadrants[2]++;
        }
        if (pos.x > width / 2 && pos.y > height / 2) {
            quadrants[3]++;
        }
    }

    console.log(quadrants);

    const total = quadrants.reduce((t, c) => t * c, 1);
    console.log(total);
}

/** @param {string} input */
function step2(input) {
    // ?
}

/** @param {string} str @returns {Coord} */
function getCoord(str) {
    const match = str.match(/-?\d+,-?\d+/)?.[0];
    if (!match) {
        throw new Error(`Invalid coord ${str}`);
    }
    const [x, y] = match.split(',').map(Number);
    return {x, y};
}

/**
 * @param {Machine} machine
 * @param {number} steps
 * @param {number} width
 * @param {number} height
 * @returns {Coord}
 */
function getLastPos(machine, steps, width, height) {
    const lastX = (machine.pos.x + machine.dir.x * steps) % width;
    const lastY = (machine.pos.y + machine.dir.y * steps) % height;

    const clampedX = (lastX + width) % width;
    const clampedY = (lastY + height) % height;

    return {x: clampedX, y: clampedY};
}
