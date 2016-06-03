'use strict';

const H = require('highland');
const getLines = require('./getLines');

const actionRegExp = /on|off|toggle/
const coordsRegExp = /\d+,\d+/g; 

const toPosition = (str) => str.split(',').map(n => parseInt(n));
const toRectangle = (pos1, pos2) => ({ x1: pos1[0], y1: pos1[1], x2: pos2[0], y2: pos2[1] });

const toInstruction = (states) => (line) => ({
	state: states[line.match(actionRegExp)[0]],
	rect: line.match(coordsRegExp).map(toPosition).reduce(toRectangle)
});

const toPositionStateMap = (resolver) => (acc, ins) => {
	for(var y = ins.rect.y1; y <= ins.rect.y2; y++) {
		for(var x = ins.rect.x1; x <= ins.rect.x2; x++) {
			acc[`${x}:${y}`] = resolver(acc[`${x}:${y}`], ins.state);
		}
	}

	return acc;
};

// first half
const firstResolver = (current, next) => next === undefined ? !!!current : next;

getLines('input-6.txt')
	.map(toInstruction({ on: true, off: false, toggle: undefined }))
	.reduce(toPositionStateMap(firstResolver), {})
	.flatMap(H.values).compact()
	.reduce((acc) => ++acc, 0)
	.each(H.log);


// second half
const secondResolver = (current, next) => Math.max(0, (current || 0) + next);

getLines('input-6.txt')
	.map(toInstruction({ on: 1, off: -1, toggle: 2 }))
	.reduce(toPositionStateMap(secondResolver), {})
	.flatMap(H.values).compact()
	.reduce1(H.add)
	.each(H.log);