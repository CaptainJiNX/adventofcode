'use strict';

const H = require('highland');
const charGenerator = require('./charGenerator');

const toNumber = (x) => x === '(' ? 1 : -1;
const getChars = () => H(charGenerator('input-1.txt')).map(toNumber);

// first half
getChars().reduce1(H.add).each(H.log);

// second half
const floorAndIndex = (acc, n) => {
	if(acc.floor < 0) return acc;

	acc.floor+=n;
	acc.index++;

	return acc;
};

getChars().reduce({ floor: 0, index: 0 }, floorAndIndex).each(H.log);
