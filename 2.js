'use strict';

const H = require('highland');
const getLines = require('./getLines');

const sides = (line) => line.split('x').map(x => parseInt(x));
const box = (sides) => ({ length: sides[0], width: sides[1], height: sides[2] });
const getBoxes = () => getLines('input-2.txt').map(sides).map(box);

const min = (array) => array.reduce((a, b) => Math.min(a, b), Number.MAX_SAFE_INTEGER);

// first half
const areas = (box) => [
	box.length * box.width,
	box.width * box.height,
	box.height * box.length
];

const minArea = (box) => min(areas(box));
const sumAreas = (box) => areas(box).map(x => x * 2).reduce(H.add, 0);
const paperNeeded = (box) => sumAreas(box) + min(areas(box));

getBoxes().map(paperNeeded).reduce1(H.add).each(H.log);

// second half
const perimeters = (box) => [
	2 * (box.length + box.width),
	2 * (box.width + box.height),
	2 * (box.height + box.length)
];

const volume = (box) => box.length * box.width * box.height;
const ribbonNeeded = (box) => min(perimeters(box)) + volume(box);

getBoxes().map(ribbonNeeded).reduce1(H.add).each(H.log);
