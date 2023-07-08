
let getScore = (elf, player) => {
	let point = 0;

	if (!("ABC".includes(elf)) || !("XYZ".includes(player)))
		return null;
	player = (player === 'X') ? 1 : (player === 'Y') ? 2 : 3;
	elf = (elf === 'A') ? 1 : (elf === 'B') ? 2 : 3;

	if (elf === player)
		point = 3;
	else if (elf % 3 < player % 3 || elf - player === -1)
		if (elf - player !== 1)
			point = 6;
	return point;
}

let getPredictedPlay = (arr, elfPick, {rock, paper, scissors}) => {
	let playerScore = 0;

	for (let play of arr)
	{
		let elfPlay = play[0];
		if (play[2] === 'X')
		{
			if (elfPlay === elfPick.rock)
				playerScore += scissors;
			else if (elfPlay === elfPick.paper)
				playerScore += rock;
			else if (elfPlay === elfPick.scissors)
				playerScore += paper;
		}
		else if (play[2] === 'Y')
		{
			if (elfPlay === elfPick.rock)
				playerScore += rock;
			else if (elfPlay === elfPick.paper)
				playerScore += paper;
			else if (elfPlay === elfPick.scissors)
				playerScore += scissors;
			playerScore += 3;
		}
		else if (play[2] === 'Z')
		{
			if (elfPlay === elfPick.rock)
				playerScore += paper;
			else if (elfPlay === elfPick.paper)
				playerScore += scissors;
			else if (elfPlay === elfPick.scissors)
				playerScore += rock;
			playerScore += 6;
		}
	}
	return playerScore;
}


let getPlayerScore = (arr, {rock, paper, scissors}) => {
	let playerScore = 0;

	for (let play of arr)
	{
		playerScore += getScore(play[0], play[2]);
		if (play[2] === 'X')
			playerScore += rock;
		if (play[2] === 'Y')
			playerScore += paper;
		if (play[2] === 'Z')
			playerScore += scissors;
	}
	return playerScore;
}

export {getPlayerScore, getPredictedPlay};
