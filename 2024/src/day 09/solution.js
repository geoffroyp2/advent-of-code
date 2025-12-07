// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('09');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    /** @type {string[]} */ const layout = [];

    let id = 0;
    for (let i = 0; i < input.length; i += 2) {
        const block = parseInt(input[i]);
        const space = parseInt(input[i + 1] ?? '0');
        for (let j = 0; j < block; j++) {
            layout.push(id.toString());
        }
        for (let j = 0; j < space; j++) {
            layout.push('.');
        }
        id++;
    }

    let firstEmptySpace = 0;
    for (let i = layout.length - 1; i >= 0; i--) {
        if (layout[i] === '.') {
            continue;
        }

        while (layout[firstEmptySpace] !== '.' && firstEmptySpace < layout.length) {
            firstEmptySpace++;
        }

        if (firstEmptySpace > i) {
            break;
        }

        layout[firstEmptySpace] = layout[i];
        layout[i] = '.';
    }

    let total = 0;
    for (let i = 0; i < firstEmptySpace; i++) {
        total += parseInt(layout[i]) * i;
    }

    console.log(total);
}

/**
 * @typedef {object} Block
 * @property {number} idx
 * @property {number} size
 * @property {string} id
 */

/** @param {string} input */
function step2(input) {
    /** @type {Block[]} */ const spaces = [];
    /** @type {Block[]} */ const files = [];

    let id = 0;
    let len = 0;
    for (let i = 0; i < input.length; i += 2) {
        const file = parseInt(input[i]);
        const space = parseInt(input[i + 1] ?? '0');

        if (file) {
            files.push({idx: len, size: file, id: id.toString()});
            len += file;
        }
        if (space) {
            spaces.push({idx: len, size: space, id: '.'});
            len += space;
        }
        id++;
    }

    for (let i = files.length - 1; i >= 0; i--) {
        const file = files[i];
        const space = spaces.find((s) => s.size >= file.size);
        if (!space || space.idx > file.idx) continue;

        const oldFileIdx = file.idx;
        file.idx = space.idx;
        space.size -= file.size;
        space.idx += file.size;

        spaces.push({idx: oldFileIdx, size: file.size, id: '.'});
        spaces.sort((a, b) => a.idx - b.idx);

        for (let i = spaces.length - 1; i >= 0; i--) {
            if (spaces[i].size === 0) {
                spaces.splice(i, 1);
                continue;
            }
            if (!spaces[i + 1]) {
                continue;
            }
            if (spaces[i].idx + spaces[i].size === spaces[i + 1].idx) {
                spaces[i].size += spaces[i + 1].size;
                spaces[i + 1].size = 0;
                spaces.splice(i + 1, 1);
            }
        }
    }

    let total = 0;
    for (const file of files) {
        let ftotal = 0;
        for (let i = 0; i < file.size; i++) {
            ftotal += parseInt(file.id) * (file.idx + i);
            total += parseInt(file.id) * (file.idx + i);
        }
    }

    console.log(total);
}
