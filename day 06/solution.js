// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {'U' | 'D' | 'R' | 'L'} Direction
 * @typedef {{x: number; y: number}} Coord
 */

class Walker {
    /** @param {string[][]} grid */
    constructor(grid) {
        this.x = -1;
        this.y = -1;
        this.startX = -1;
        this.startY = -1;
        this.grid = grid;
        this.height = grid.length;
        this.width = grid[0].length;
        this.isLoop = false;
        /** @type {Coord[]} */ this.visitedCoords = [];
        /** @type {Direction} */ this.dir = 'U';
        /** @type {Set<string>} */ this.visited = new Set();

        this.run();
    }

    run() {
        this.setStart();
        this.loop();
        this.resetGrid();
    }

    resetGrid() {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] === 'X') {
                    this.grid[y][x] = '.';
                }
            }
        }
        this.grid[this.startY][this.startX] = '^';
    }

    loop() {
        while (true) {
            const next = this.peek();
            if (!next) return;

            if (next === '#') {
                this.turn();
            } else {
                this.walk();
            }

            const posId = `${this.x}-${this.y}-${this.dir}`;
            if (!this.visited.has(posId)) {
                this.visited.add(posId);
            } else {
                this.isLoop = true;
                return;
            }
        }
    }

    setStart() {
        for (let gy = 0; gy < this.height; gy++) {
            for (let gx = 0; gx < this.width; gx++) {
                if (this.grid[gy][gx] === '^') {
                    this.x = gx;
                    this.y = gy;
                    this.startX = gx;
                    this.startY = gy;
                    this.grid[gy][gx] = 'X';
                    this.visitedCoords.push({x: this.x, y: this.y});
                    return;
                }
            }
        }
        throw new Error('No start found');
    }

    walk() {
        const next = this.getNextCoord();
        this.x = next.x;
        this.y = next.y;

        if (this.grid[this.y][this.x] === '.') {
            this.grid[this.y][this.x] = 'X';
            this.visitedCoords.push({x: this.x, y: this.y});
        }
    }

    peek() {
        const next = this.getNextCoord();
        if (next.x < 0 || next.y < 0 || next.x >= this.width || next.y >= this.height) {
            return null;
        }

        return this.grid[next.y][next.x];
    }

    turn() {
        switch (this.dir) {
            case 'D':
                this.dir = 'L';
                break;
            case 'U':
                this.dir = 'R';
                break;
            case 'R':
                this.dir = 'D';
                break;
            case 'L':
                this.dir = 'U';
                break;
        }
    }

    /** @returns {Coord} */
    getNextCoord() {
        switch (this.dir) {
            case 'D':
                return {x: this.x, y: this.y + 1};
            case 'U':
                return {x: this.x, y: this.y - 1};
            case 'R':
                return {x: this.x + 1, y: this.y};
            case 'L':
                return {x: this.x - 1, y: this.y};
        }
    }
}

const input = readInput('06');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const grid = input.split('\n').map((line, y) => line.split(''));

    const walker = new Walker(grid);

    console.log(walker.visitedCoords.length);
}

/** @param {string} input */
function step2(input) {
    const grid = input.split('\n').map((line, y) => line.split(''));

    const scout = new Walker(grid);

    let loopCount = 0;
    for (const {x, y} of scout.visitedCoords) {
        if (grid[y][x] === '^') {
            continue;
        }

        grid[y][x] = '#';

        const walker = new Walker(grid);

        if (walker.isLoop) {
            loopCount++;
        }
        grid[y][x] = '.';
    }

    console.log(loopCount);
}
