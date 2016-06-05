'use strict';

const H = require('highland');
const getLines = require('./getLines');

const regExp = /(((\w+)\s)?(\w+)\s)?(\w+)\s->\s(\w+)/;

const toMatch = (line) => line.match(regExp).slice(3)

const operators = {
	AND: (a, b) => a & b,
	OR: (a, b) => a | b,
	NOT: (a, b) => ~ b,
	LSHIFT: (a, b) => a << b,
	RSHIFT: (a, b) => a >> b,
	undefined: (a, b) => b
};

const toInstruction = (match) => ({
	name: match[3],
	debug: match[3] + ' = ' + ((match[0] || '') + ' ' + (match[1] || '') + ' ' + match[2]).trim(),
	operator: operators[match[1] + ''],
	left: match[0] + '',
	right: match[2] + ''
});

const val = (circuit, value) => isNaN(value) ? circuit[value]() : parseInt(value);

const toCircuit = (overrides) => {
	const or = overrides || {};

	return (acc, ins) => {
		acc[ins.name] = () => {
			if(!acc[`cache:${ins.name}`]) {
				acc[`cache:${ins.name}`] = or[ins.name] || ins.operator(val(acc, ins.left), val(acc, ins.right)) & 65535;
			}
			return acc[`cache:${ins.name}`];
		};

		return acc;
	};
};

// first half
getLines('input-7.txt')
.map(toMatch)
.map(toInstruction)
.reduce(toCircuit(), { undefined: () => undefined })
.invoke('a')
.each(H.log);

// second half
getLines('input-7.txt')
.map(toMatch)
.map(toInstruction)
.reduce(toCircuit({ b: 16076 }), { undefined: () => undefined })
.invoke('a')
.each(H.log);
