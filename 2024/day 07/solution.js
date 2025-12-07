// @ts-check

const {readInput} = require('../shared/read');

/**
 * @typedef {'+' | '*' | '|'} Operator
 */

class Operation {
    /**
     * @param {number} total
     * @param {number[]} values
     */
    constructor(total, values) {
        this.total = total;
        this.values = values;
    }

    /** @param {Operator[]} validOperators */
    canBeValid(validOperators) {
        /** @type {Operator[]} */ const operators = [];
        return this.checkR(operators, validOperators);
    }

    /**
     * @param {Operator[]} operators
     * @param {Operator[]} validOperators
     */
    checkR(operators, validOperators) {
        if (operators.length === this.values.length - 1) {
            return this.isValid(operators);
        }

        for (const validOperator of validOperators) {
            operators.push(validOperator);
            if (this.checkR(operators, validOperators)) {
                return true;
            }
            operators.pop();
        }
        return false;
    }

    /** @param {Operator[]} operators */
    isValid(operators) {
        let total = this.values[0];
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '*') {
                total *= this.values[i + 1];
            } else if (operators[i] === '+') {
                total += this.values[i + 1];
            } else {
                total = parseInt(total.toString() + this.values[i + 1].toString());
            }
        }
        return total === this.total;
    }
}

/** @param {string} input */
function getOperations(input) {
    return input.split('\n').map((line) => {
        const [total, valuesStr] = line.split(': ');
        const values = valuesStr.split(' ').map(Number);
        return new Operation(+total, values);
    });
}

const input = readInput('07');
step1(input);
step2(input);

/** @param {string} input */
function step1(input) {
    const operations = getOperations(input);

    let total = 0;
    for (const operation of operations) {
        if (operation.canBeValid(['*', '+'])) {
            total += operation.total;
        }
    }
    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const operations = getOperations(input);

    let total = 0;
    for (const operation of operations) {
        if (operation.canBeValid(['*', '+', '|'])) {
            total += operation.total;
        }
    }
    console.log(total);
}
