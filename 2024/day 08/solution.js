// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {object} Coord
 * @property {number} x
 * @property {number} y
 */

const input = readInput('08');
step1(input);
step2(input);

/** @param {string[][]} grid */
function getNodes(grid) {
    const width = grid[0].length;
    const height = grid.length;

    /** @type {Record<string, Coord[]>} */ const nodes = {};
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const char = grid[y][x];
            if (char !== '.') {
                if (!nodes[char]) {
                    nodes[char] = [];
                }
                nodes[char].push({x, y});
            }
        }
    }
    return nodes;
}

/** @param {string} input */
function step1(input) {
    const grid = input.split('\n').map((line) => line.split(''));
    const width = grid[0].length;
    const height = grid.length;

    const nodes = getNodes(grid);

    /** @type {Set<string>} */ const anodes = new Set();

    for (const coords of Object.values(nodes)) {
        for (let i1 = 0; i1 < coords.length - 1; i1++) {
            for (let i2 = i1 + 1; i2 < coords.length; i2++) {
                const c1 = coords[i1];
                const c2 = coords[i2];

                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;

                const a1x = c1.x - dx;
                const a1y = c1.y - dy;
                const a2x = c2.x + dx;
                const a2y = c2.y + dy;

                if (a1y >= 0 && a1y < height && a1x >= 0 && a1x < width) {
                    anodes.add(`${a1y}-${a1x}`);
                }
                if (a2y >= 0 && a2y < height && a2x >= 0 && a2x < width) {
                    anodes.add(`${a2y}-${a2x}`);
                }
            }
        }
    }

    console.log(anodes.size);
}

/** @param {string} input */
function step2(input) {
    const grid = input.split('\n').map((line) => line.split(''));
    const width = grid[0].length;
    const height = grid.length;

    const nodes = getNodes(grid);

    /** @type {Set<string>} */ const anodes = new Set();

    for (const coords of Object.values(nodes)) {
        for (let i1 = 0; i1 < coords.length - 1; i1++) {
            for (let i2 = i1 + 1; i2 < coords.length; i2++) {
                const c1 = coords[i1];
                const c2 = coords[i2];

                const dx = c2.x - c1.x;
                const dy = c2.y - c1.y;

                let a1x = c1.x;
                let a1y = c1.y;
                while (1) {
                    anodes.add(`${a1y}-${a1x}`);
                    a1x = a1x - dx;
                    a1y = a1y - dy;

                    if (a1y < 0 || a1y >= height || a1x < 0 || a1x >= width) {
                        break;
                    }
                }

                let a2x = c2.x;
                let a2y = c2.y;
                while (1) {
                    anodes.add(`${a2y}-${a2x}`);
                    a2x = a2x + dx;
                    a2y = a2y + dy;

                    if (a2y < 0 || a2y >= height || a2x < 0 || a2x >= width) {
                        break;
                    }
                }
            }
        }
    }

    console.log(anodes.size);
}
