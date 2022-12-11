'use strict'

import { getLines } from "../utils/utils.js"

let getScore = (elf, player) => {
	let point = 0;

	if (!("ABC".includes(elf)) || !("XYZ".includes(player)))
		return null;
	player = (player == 'X') ? 1 : (player == 'Y') ? 2 : 3;
	elf = (elf == 'A') ? 1 : (elf == 'B') ? 2 : 3;

	if (elf == player)
		point = 3;
	else if (elf % 3 < player % 3 || elf - player == -1)
		if (elf - player != 1)
			point = 6;
	return point;
}

let getPredictedPlay = (arr, elfPick, {rock, paper, scissors}) => {
	let playerScore = 0;

	for (let play of arr)
	{
		let elfPlay = play[0];
		if (play[2] == 'X')
		{
			if (elfPlay == elfPick.rock)
				playerScore += scissors;
			else if (elfPlay == elfPick.paper)
				playerScore += rock;
			else if (elfPlay == elfPick.scissors)
				playerScore += paper;
		}
		else if (play[2] == 'Y')
		{
			if (elfPlay == elfPick.rock)
				playerScore += rock;
			else if (elfPlay == elfPick.paper)
				playerScore += paper;
			else if (elfPlay == elfPick.scissors)
				playerScore += scissors;
			playerScore += 3;
		}
		else if (play[2] == 'Z')
		{
			if (elfPlay == elfPick.rock)
				playerScore += paper;
			else if (elfPlay == elfPick.paper)
				playerScore += scissors;
			else if (elfPlay == elfPick.scissors)
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
		console.log(play[0] + " " + play[2]);
		playerScore += getScore(play[0], play[2]);
		if (play[2] == 'X')
			playerScore += rock;
		if (play[2] == 'Y')
			playerScore += paper;
		if (play[2] == 'Z')
			playerScore += scissors;
	}
	return playerScore;
}

document.getElementById("input").addEventListener("change", () => {
	const output = document.querySelector("p");
	const [file] = document.querySelector("[type='file']").files;
	const reader = new FileReader();
	let rps_value = {
		rock: 1,
		paper: 2,
		scissors: 3
	};

	let elfPick = {
		rock: 'A',
		paper: 'B',
		scissors: 'C'
	}

	reader.addEventListener("load", () => {
		let strategyArr = getLines(reader);
		let firstGameResult;
		let predictedResult;
		firstGameResult = getPlayerScore(strategyArr, rps_value);
		console.log(firstGameResult);
		predictedResult = getPredictedPlay(strategyArr, elfPick, rps_value);
		console.log(predictedResult);
	});
	if (file)
		reader.readAsText(file);
});
