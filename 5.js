'use strict';

const H = require('highland');
const getLines = require('./getLines');

// first half
const wovels = ['a', 'e', 'i', 'o', 'u'];
const forbiddenStrings = ['ab', 'cd', 'pq', 'xy'];

const isWovel = (char) => wovels.some(wovel => char === wovel);
const hasThreeWovels = (str) => [...str].filter(isWovel).length >= 3;
const hasLetterTwiceInARow = (str) => [...str].some((char, i) => str[i - 1] === char);
const hasForbiddenString = (str) => forbiddenStrings.some(forbidden => str.includes(forbidden));

getLines('input-5.txt')
	.filter(hasThreeWovels)
	.filter(hasLetterTwiceInARow)
	.reject(hasForbiddenString)
	.collect().pluck('length').each(H.log);

// second half
const hasSamePairTwice = (str) => {
	const getPair = (char, index) => ({ index, chars: str.substr(index, 2) });
	const overlaps = (pair1, pair2) => Math.abs(pair1.index - pair2.index) < 2;
	const matches = (pair1) => (pair2) => pair1.chars === pair2.chars && !overlaps(pair1, pair2);

	const pairs = [...str].map(getPair);
	return pairs.some(pair => pairs.some(matches(pair)));
};

const hasRepeatingLetterWithOneInBetween = (str) => {
	const getTriplet = (char, index) => str.substr(index, 3);
	const isValid = (triplet) => triplet[0] === triplet[2];

	return [...str].map(getTriplet).some(isValid);
};

getLines('input-5.txt')
	.filter(hasSamePairTwice)
	.filter(hasRepeatingLetterWithOneInBetween)
	.collect().pluck('length').each(H.log);
