// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('02');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const lines = input.split('\n');
    let total = 0;

    for (const line of lines) {
        const nums = line.split(' ').map(Number);
        if (isSafeSeries(nums)) {
            total++;
        }
    }

    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const lines = input.split('\n');
    let total = 0;

    for (const line of lines) {
        const nums = line.split(' ').map(Number);
        const isSafe = isSafeSeries(nums);
        if (isSafe) {
            total++;
            continue;
        }

        for (let i = 0; i < nums.length; i++) {
            const numsCopy = nums.toSpliced(i, 1);
            if (isSafeSeries(numsCopy)) {
                total++;
                break;
            }
        }
    }

    console.log(total);
}

/**
 * @param {number[]} nums
 * @returns {boolean}
 */
function isSafeSeries(nums) {
    /** @type {boolean | null} */ let isIncreasing = null;

    for (let i = 1; i < nums.length; i++) {
        const dif = Math.abs(nums[i] - nums[i - 1]);
        if (dif < 1 || dif > 3) {
            return false;
        }

        const inc = nums[i] - nums[i - 1] > 0;
        if (isIncreasing === null) {
            isIncreasing = inc;
        } else if (inc !== isIncreasing) {
            return false;
        }
    }
    return true;
}
