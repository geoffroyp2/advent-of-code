// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('11');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const stones = input.split(' ').map(Number);
    console.log(solve(stones, 25));
}

/** @param {string} input */
function step2(input) {
    const stones = input.split(' ').map(Number);
    console.log(solve(stones, 75));
}
/**
 * @param {number[]} stones
 * @param {number} depth
 */

function solve(stones, depth) {
    /** @type {Map<string, number>} */ const memo = new Map();

    let total = 0;
    for (const stone of stones) {
        total += getAmount(stone, depth, memo);
    }
    return total;
}

/**
 *
 * @param {number} value
 * @param {number} depth
 * @param {Map<string, number>} memo
 * @returns {number}
 */
function getAmount(value, depth, memo) {
    if (depth === 0) {
        memo.set(`${value}-${depth}`, 1);
        return 1;
    }

    const memoValue = memo.get(`${value}-${depth}`);
    if (memoValue) {
        return memoValue;
    }

    const valueStr = value.toString();
    /** @type {number} */ let total;

    if (value === 0) {
        total = getAmount(1, depth - 1, memo);
    } else if (valueStr.length % 2 === 0) {
        total =
            getAmount(parseInt(valueStr.substring(0, valueStr.length / 2)), depth - 1, memo) +
            getAmount(parseInt(valueStr.substring(valueStr.length / 2)), depth - 1, memo);
    } else {
        total = getAmount(value * 2024, depth - 1, memo);
    }

    memo.set(`${value}-${depth}`, total);
    return total;
}
