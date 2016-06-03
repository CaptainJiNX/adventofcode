'use strict';

const H = require('highland');
const getChars = require('./getChars');

const pos = (x, y) => ({ x, y });
const house = (pos) => `${pos.x}:${pos.y}`;

const movement = {
	'v': pos(0, 1),
	'>': pos(1, 0),
	'<': pos(-1, 0),
	'^': pos(0, -1)
};

const toMovement = (x) => movement[x];
const getMovements = () => getChars('input-3.txt').map(toMovement);

const initHouse = (who, acc) => {
	acc[who] = pos(0, 0);
	return house(acc[who]);
};

const visitHouse = (who) => (acc, move) => {
	const h = (acc[who] && house(acc[who])) || initHouse(who, acc);
	acc[who].x += move.x;
	acc[who].y += move.y;
	acc.houses[h] = (acc.houses[h] || 1) + 1;
	return acc;
};

const countHouses = (s) => s.pluck('houses')
	.flatMap(H.keys)
	.collect()
	.pluck('length');

// first half
getMovements()
	.reduce(visitHouse('santa'), { houses: {} })
	.through(countHouses)
	.each(H.log);

// second half
const santa = visitHouse('santa');
const robo = visitHouse('robo');
const visitHouses = (acc, moves) => santa(robo(acc, moves[1]), moves[0]);

getMovements()
	.batch(2)
	.reduce(visitHouses, { houses: {} })
	.through(countHouses)
	.each(H.log);
