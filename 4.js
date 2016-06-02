'use strict';

const H = require('highland');
const crypto = require('crypto');

const inputString = 'ckczppom';
const createMD5 = (value) => crypto.createHash('MD5').update(value).digest('hex');

const numbers = (start) => {
	let n = start;

	return (push, next) => {
		push(null, n++);
		next();
	}
};

const findHash = (search) => H(numbers(1))
	.map(number => ({ number, hash: createMD5(`${inputString}${number}`) }))
	.filter(tuple => tuple.hash.startsWith(search))
	.take(1)
	.each(H.log);

// first half
findHash('00000');

// second half
findHash('000000');
