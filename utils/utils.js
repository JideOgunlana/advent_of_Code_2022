'use strict'

export { getLines }

/**
 * 
 * @param {object} fr FileReader object
 *
 */
 let getLines = (fr) => {
	let input = '';
	let arr = [];

	for (let i = 0; i < fr.result.length; i++)
	{
		while (fr.result[i] != '\n' && i < fr.result.length)
		{
			if (fr.result[i] != '\r')
				input += fr.result[i];
			i++;
		}
		arr.push(input);
		input = '';
	}
	return arr;
}
