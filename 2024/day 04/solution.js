// @ts-check

const { readInput } = require("../shared/read");

/**
 * @typedef {object} Coord
 * @property {number} x
 * @property {number} y
 */

class LineIterator {
    /**
     * @param {(c: Coord) => Coord} iterator
     * @param {string[][]} grid
     * */
    constructor(iterator, grid) {
        this.coord = { x: 0, y: 0 };
        this.iterator = iterator;
        this.grid = grid;
        this.width = grid[0].length;
        this.height = grid.length;
    }

    /** @param {Coord} coord  */
    count(coord) {
        this.coord = coord;

        let count = 0;
        do {
            const substr = this.getSubstring();
            if (substr === "XMAS" || substr === "SAMX") {
                count++;
            }
        } while (this.next());
        return count;
    }

    next() {
        const next = this.iterator(this.coord);
        if (next.x < 0 || next.x >= this.width || next.y < 0 || next.y >= this.height) {
            return null;
        }
        this.coord = next;
        return this.coord;
    }

    getSubstring() {
        let coord = this.coord;
        let substr = this.grid[coord.y]?.[coord.x] ?? "";
        for (let i = 0; i < 3; i++) {
            coord = this.iterator(coord);
            substr += this.grid[coord.y]?.[coord.x] ?? "";
        }
        return substr;
    }
}

const input = readInput("04");
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const grid = input.split("\n").map((line) => line.split(""));
    const width = grid[0].length;
    const height = grid.length;

    let count = 0;

    // Lines
    const RIterator = new LineIterator(({ x, y }) => ({ x: x + 1, y }), grid);
    for (let y = 0; y < height; y++) {
        count += RIterator.count({ x: 0, y });
    }

    // Columns
    const DIterator = new LineIterator(({ x, y }) => ({ x, y: y + 1 }), grid);
    for (let x = 0; x < width; x++) {
        count += DIterator.count({ x, y: 0 });
    }

    // DR Diagonals
    const DRIterator = new LineIterator(({ x, y }) => ({ x: x + 1, y: y + 1 }), grid);
    for (let x = 0; x < width; x++) {
        count += DRIterator.count({ x, y: 0 });
    }
    for (let y = 1; y < height; y++) {
        count += DRIterator.count({ x: 0, y });
    }

    // UR Diagonals
    const URIterator = new LineIterator(({ x, y }) => ({ x: x + 1, y: y - 1 }), grid);
    for (let y = 0; y < height; y++) {
        count += URIterator.count({ x: 0, y });
    }
    for (let x = 1; x < width; x++) {
        count += URIterator.count({ x, y: height - 1 });
    }

    console.log(count);
}

/**
 * @param {Coord} coord
 * @param {string[][]} grid
 */
function isCrossXMAS(coord, grid) {
    const UL = grid[coord.y]?.[coord.x] ?? "";
    const UR = grid[coord.y]?.[coord.x + 2] ?? "";
    const M = grid[coord.y + 1]?.[coord.x + 1] ?? "";
    const DL = grid[coord.y + 2]?.[coord.x] ?? "";
    const DR = grid[coord.y + 2]?.[coord.x + 2] ?? "";

    const S1 = UL + M + DR;
    const S2 = UR + M + DL;

    return (S1 === "MAS" || S1 === "SAM") && (S2 === "MAS" || S2 === "SAM");
}

/** @param {string} input */
function step2(input) {
    const grid = input.split("\n").map((line) => line.split(""));
    const width = grid[0].length;
    const height = grid.length;

    let count = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isCrossXMAS({ x, y }, grid)) {
                count++;
            }
        }
    }
    console.log(count);
}
