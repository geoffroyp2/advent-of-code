// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('03');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const matches = input.match(/mul\(\d+,\d+\)/g);

    let total = 0;
    for (const m of matches) {
        const [A, B] = m.match(/\d+/g).map(Number);
        total += A * B;
    }

    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const segments = input.split(/(don't\(\))|(do\(\))/).filter((x) => !!x);
    let total = 0;

    const matches = segments[0].match(/mul\(\d+,\d+\)/g);
    for (const m of matches) {
        const [A, B] = m.match(/\d+/g).map(Number);
        total += A * B;
    }

    for (let i = 1; i < segments.length; i += 2) {
        const [id, value] = segments.slice(i, i + 3);
        if (id === "don't()") {
            continue;
        }
        const matches = value.match(/mul\(\d+,\d+\)/g);
        for (const m of matches) {
            const [A, B] = m.match(/\d+/g).map(Number);
            total += A * B;
        }
    }

    console.log(total);
}
