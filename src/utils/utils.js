

/**
 * 
 * @param {string} fileContent
 *
 */
 let getLines = (fileContent) => {
	let input = '';
	let arr = [];

	for (let i = 0; i < fileContent.length; i++)
	{
		while (fileContent[i] !== '\n' && i < fileContent.length)
		{
			if (fileContent[i] !== '\r')
				input += fileContent[i];
			i++;
		}
		arr.push(input);
		input = '';
	}
	return arr;
}

export { getLines }
