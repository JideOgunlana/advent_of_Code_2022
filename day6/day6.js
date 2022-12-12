'use strict'

import {getLines} from '../utils/utils.js';

let getMarkerStart = (buffer) => {
	let dupIndex;

	buffer = buffer.join("");
	for (let i = 0; i < buffer.length; i++)
	{
		if (i - dupIndex == 4)
			return(`Part1 answer is ${i + 1}`);
		for (let j = 1 + i; j < i + 4; j++)
		{
			if (buffer[i] == buffer[j])
			{
				dupIndex = i;
				break;
			}
		}
	}
	return 0;
}

let getMessageStart = (buffer) => {
	let endIndex = 14;
	buffer = buffer.join("");
	console.log(buffer);

	for (let i = 0; i < buffer.length; i++)
	{
		for (let j = i + 1; j < endIndex + i; j++)
		{
			if (buffer[i] == buffer[j])
			{
				endIndex = 15;
				break; 
			}
			if (endIndex == 2)
				return(`Part2 answer is ${j + 1}`);
		}
		endIndex--;
	}
	return 0;
}


document.getElementById('input').addEventListener('change', function() {
	const [file] = this.files;
	const reader = new FileReader();
	let buffer;
	let markerStart;
	let messageStart;

	reader.addEventListener('load', () => {
		buffer = getLines(reader);
		markerStart = getMarkerStart(buffer);
		messageStart = getMessageStart(buffer);
		console.log(markerStart);
		console.log(messageStart);
	});
	if (file)
		reader.readAsText(file);
});