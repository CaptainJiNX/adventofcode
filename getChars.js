'use strict';

const fs = require('fs');
const H = require('highland');

module.exports = (fileName) => H((push) => {
	const file = fs.createReadStream(fileName);

	file.on('readable', () => {
		let char;
		while(char = file.read(1)) {
			push(null, char.toString());
		}
	});

	file.once('end', () => push(null, H.nil));
});
