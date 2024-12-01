// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('01');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    /** @type {number[]} */ const left = [];
    /** @type {number[]} */ const right = [];

    input.split('\n').forEach((line) => {
        const [l, r] = line.split('   ').map((n) => parseInt(n));
        left.push(l);
        right.push(r);
    });

    left.sort((a, b) => a - b);
    right.sort((a, b) => a - b);

    let totalDif = 0;
    for (let i = 0; i < left.length; i++) {
        totalDif += Math.abs(left[i] - right[i]);
    }

    console.log(totalDif);
}

/** @param {string} input */
function step2(input) {
    /** @type {string[]} */ const left = [];
    /** @type {string[]} */ const right = [];

    input.split('\n').forEach((line) => {
        const [l, r] = line.split('   ');
        left.push(l);
        right.push(r);
    });

    /** @type {Record<number, number>} */ const rec = {};
    right.forEach((num) => {
        if (!rec[num]) {
            rec[num] = 1;
        } else {
            rec[num]++;
        }
    });

    let total = 0;
    left.forEach((num) => {
        total += parseInt(num) * parseInt(rec[num] ?? 0);
    });

    console.log(total);
}
