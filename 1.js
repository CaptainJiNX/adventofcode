'use strict';

const H = require('highland');
const getChars = require('./getChars');

const toNumber = (x) => x === '(' ? 1 : -1;
const getNumbers = () => getChars('input-1.txt').map(toNumber);

// first half
getNumbers().reduce1(H.add).each(H.log);

// second half
const floorAndIndex = (acc, n) => {
	if(acc.floor < 0) return acc;

	acc.floor+=n;
	acc.index++;

	return acc;
};

getNumbers().reduce(floorAndIndex, { floor: 0, index: 0 }).each(H.log);
