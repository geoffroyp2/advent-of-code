// @ts-check

const {readInput} = require('../shared/read');

const input = readInput('05');
step1(input);
step2(input);

/**
 * @typedef {object} Rule
 * @property {number} from
 * @property {number} to
 * @property {boolean} fromVisited
 * @property {boolean} toVisited
 *
 * @typedef {object} Node
 * @property {number} value
 * @property {Node[]} to
 * @property {Node[]} from
 */

/** @param {string} input */
function step1(input) {
    const {validUpdates} = getSortedUpdates(input);
    const total = validUpdates.reduce((total, update) => total + update[(update.length - 1) / 2], 0);
    console.log(total);
}

/** @param {string} input */
function step2(input) {
    const {invalidUpdates, rules} = getSortedUpdates(input);

    let total = 0;
    for (const update of invalidUpdates) {
        const relevantRules = rules.filter((r) => update.includes(r.from) && update.includes(r.to));
        const sortedNodes = getSortedRules(relevantRules);

        total += sortedNodes[(sortedNodes.length - 1) / 2];
    }

    console.log(total);
}

/** @param {string} input */
function getSortedUpdates(input) {
    const [rulesBlock, updatesBlock] = input.split('\n\n');
    /** @type {Rule[]} */ const rules = rulesBlock.split('\n').map((line) => {
        const [from, to] = line.split('|').map(Number);
        return {from, to, fromVisited: false, toVisited: false};
    });

    const updates = updatesBlock.split('\n').map((line) => line.split(',').map(Number));

    /** @type {number[][]} */ const validUpdates = [];
    /** @type {number[][]} */ const invalidUpdates = [];
    for (const update of updates) {
        rules.forEach((rule) => {
            rule.fromVisited = false;
            rule.toVisited = false;
        });

        const relevantRules = rules.filter((rule) => update.includes(rule.from) && update.includes(rule.to));
        /** @type {Record<number, Rule[]>} */ const rulesByEntry = {};
        relevantRules.forEach((rule) => {
            if (!rulesByEntry[rule.from]) {
                rulesByEntry[rule.from] = [];
            }
            rulesByEntry[rule.from].push(rule);
            if (!rulesByEntry[rule.to]) {
                rulesByEntry[rule.to] = [];
            }
            rulesByEntry[rule.to].push(rule);
        });

        let valid = true;
        numLoop: for (const num of update) {
            const entryRules = rulesByEntry[num];

            if (!entryRules) {
                continue;
            }

            for (const rule of entryRules) {
                if (rule.from === num) {
                    rule.fromVisited = true;
                }
                if (rule.to === num) {
                    rule.toVisited = true;
                }

                if (rule.toVisited && !rule.fromVisited) {
                    valid = false;
                    break numLoop;
                }
            }
        }

        if (valid) {
            validUpdates.push(update);
        } else {
            invalidUpdates.push(update);
        }
    }

    return {validUpdates, invalidUpdates, rules};
}

/** @param {Rule[]} edges */
function getSortedRules(edges) {
    // Topo sort

    /** @type {Set<number>} */ const allValues = new Set();
    for (const rule of edges) {
        allValues.add(rule.from);
        allValues.add(rule.to);
    }

    /** @type {Record<number, Node>} */ const nodes = {};
    for (const value of allValues) {
        nodes[value] = {value, to: [], from: []};
    }
    for (const rule of edges) {
        nodes[rule.from].to.push(nodes[rule.to]);
        nodes[rule.to].from.push(nodes[rule.from]);
    }

    /** @type {Node[]} */ const nodeArray = Object.values(nodes);
    /** @type {Node[]} */ const sortedNodes = [];
    /** @type {Node[]} */ const remaining = nodeArray.filter((node) => !node.from.length);

    while (remaining.length > 0) {
        const node = remaining.pop();
        if (!node) break;
        sortedNodes.push(node);

        const incoming = nodeArray.filter((n) => n.from.includes(node));
        for (const incNode of incoming) {
            incNode.from = incNode.from.filter((n) => n !== node);
            if (incNode.from.length === 0) {
                remaining.push(incNode);
            }
        }
    }

    return sortedNodes.map((node) => node.value);
}
