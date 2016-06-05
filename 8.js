'use strict';

const H = require('highland');
const getLines = require('./getLines');

// first half
const regExp = /\\(\\|"|x[a-f0-9]{2})/g;
const mem = (line) => line.replace(regExp, '-').length - 2;

getLines('input-8.txt').map(x => x.length - mem(x)).reduce1(H.add).each(H.log);

// second half
const regExp2 = /\\|"/g
const enc = (line) => line.replace(regExp2, '\\$&').length + 2;

getLines('input-8.txt').map(x => enc(x) - x.length).reduce1(H.add).each(H.log);
