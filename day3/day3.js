'use strict'

import {getLines} from "../utils/utils.js"

let itemPriority = (item) => {
	let items = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	
	return items.indexOf(item) + 1;
}

let getSackPriority = (sack) => {
	console.log(sack, sack.length);
	let storage1 = sack.slice(0, sack.length / 2);
	let storage2 = sack.slice(sack.length /2);
	for (let itemA of storage1)
	{
		for (let itemB of storage2)
		{
			if (itemA == itemB)
				return itemPriority(itemA);
		}
	}
}

let getBadgePriority = (group) => {
	let [sack1, sack2, sack3] = group;

	for (let itemI of sack1)
	{
		for (let itemJ of sack2)
		{
			if (itemI == itemJ)
				for (let itemZ of sack3)
				{
					if (itemZ == itemI)
						return itemPriority(itemI);
				}
		}
	}
}

let getTotalPriorities = (arr) => {
	let totalPriorities = 0;

	for (let sack of arr)
	{
		totalPriorities += getSackPriority(sack);
	}
	return totalPriorities;
}

let getTotalBadgePriorities = (arr) => {
	let group = [];
	let totalPriorities = 0;

	for (let i in arr)
	{
		group.push(arr[i]);
		if ((i + 1) % 3 == 0)
		{
			totalPriorities += getBadgePriority(group);
			let sackLen = group.length;
			for (let j = 0; j < sackLen; j++)
				group.pop()
		}
	}
	return totalPriorities;
}

document.getElementById('input').addEventListener('change', () => {
	const [file] = document.getElementById('input').files;
	const reader = new FileReader();
	let totalPriority = 0;
	let totalBadgePriority = 0;
	reader.addEventListener('load', () => {
		let rucksackArr = getLines(reader);
		totalPriority = getTotalPriorities(rucksackArr);
		totalBadgePriority = getTotalBadgePriorities(rucksackArr);
		console.log(totalPriority);
		console.log("Total Badge priorites: " + totalBadgePriority);
	});
	if (file)
		reader.readAsText(file);
});
