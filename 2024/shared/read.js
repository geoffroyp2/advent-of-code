// @ts-check

const {readFileSync} = require('node:fs');

/**
 * @param {string} day
 */
function readInput(day) {
    return readFileSync(`./day ${day}/input`, {encoding: 'utf-8'});
}

module.exports = {readInput};
