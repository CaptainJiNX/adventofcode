'use strict';

const fs = require('fs');
const H = require('highland');

module.exports = (fileName) => H(fs.createReadStream(fileName)).split().compact();
