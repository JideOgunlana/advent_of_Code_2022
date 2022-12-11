'use strict'

import { getLines } from "../utils/utils.js"

let getMax = (num1, num2) => {

	num1 = parseInt(num1);
	num2 = parseInt(num2);

	if (num1 > num2)
		return num1;
	return num2;
}

let getMin = (num1, num2) => {

	num1 = parseInt(num1);
	num2 = parseInt(num2);

	if (num1 < num2)
	{
		return num1;
	}
	return num2;
}
let createIds2 = (pairs) => {
	let separatorIndex = pairs.indexOf(',');
	let pair1 = pairs.slice(0, separatorIndex);
	let pair2 = pairs.slice(separatorIndex + 1);
	let num1Arr = pair1.split('-');
	let num2Arr = pair2.split('-');
	let min = getMin(num1Arr[0], num2Arr[0]);
	let max = getMax(num1Arr[1], num2Arr[1]);
	let id1 = '';
	let id2 = '';
	let p1Range = num1Arr[1] - num1Arr[0];
	let p2Range = num2Arr[1] - num2Arr[0];
	console.log(min, max);
	for (let i = min; i <= max + 1; i++)
	{
		if (i == num1Arr[0])
		{
			for (let j = 0; j < p1Range; j++)
			{
				id1 += parseInt(num1Arr[0]) + j + ' ';
				i++;
			}
			id1 += parseInt(num1Arr[0]) + p1Range;
		}
		else
			id1 += ''
	}
	console.log(id1);
	for (let i = min; i <= max + 1; i++)
	{
		if (i == num2Arr[0])
		{
			for (let j = 0; j < p2Range; j++)
			{
				id2 += parseInt(num2Arr[0]) + j + ' ';
				i++;
			}
			id2 += parseInt(num2Arr[0]) + p2Range;
		}
		else
			id2 += ''
	}
	console.log(id2);
	let id1Arr = id1.split(' ');
	let id2Arr = id2.split(' ');

	for (let i of id1Arr)
	{
		for (let j of id2Arr)
		{
			if (i == j)
			{
				return true;
			}
		}
	}

	for (let i of id2Arr)
	{
		for (let j of id1Arr)
		{
			if (i == j)
			{
				return true;
			}
		}
	}

	return false;
}

let createIds = (pairs) => {
	let separatorIndex = pairs.indexOf(',');
	let pair1 = pairs.slice(0, separatorIndex);
	let pair2 = pairs.slice(separatorIndex + 1);
	let num1Arr = pair1.split('-');
	let num2Arr = pair2.split('-');
	let min = getMin(num1Arr[0], num2Arr[0]);
	let max = getMax(num1Arr[1], num2Arr[1]);
	let id1 = '';
	let id2 = '';
	let p1Range = num1Arr[1] - num1Arr[0];
	let p2Range = num2Arr[1] - num2Arr[0];
	console.log(min, max);
	for (let i = min; i <= max + 1; i++)
	{
		if (i == num1Arr[0])
		{
			for (let j = 0; j < p1Range; j++)
			{
				id1 += parseInt(num1Arr[0]) + j + ' ';
				i++;
			}
			id1 += parseInt(num1Arr[0]) + p1Range;
		}
		else
			id1 += ''
	}
	console.log(id1);
	for (let i = min; i <= max + 1; i++)
	{
		if (i == num2Arr[0])
		{
			for (let j = 0; j < p2Range; j++)
			{
				id2 += parseInt(num2Arr[0]) + j + ' ';
				i++;
			}
			id2 += parseInt(num2Arr[0]) + p2Range;
		}
		else
			id2 += ''
	}
	console.log(id2);
	let id1Arr = id1.split(' ');
	let id2Arr = id2.split(' ');

	let foundId1 = 0;
	let foundId2 = 0;
	for (let i of id1Arr)
	{
		for (let j of id2Arr)
		{
			if (i == j)
			{
				foundId1 += 1;
			}
		}
	}
	console.log(foundId1, p1Range + 1)
	if (foundId1 == p1Range + 1)
		return true;
	for (let i of id2Arr)
	{
		for (let j of id1Arr)
		{
			if (i == j)
			{
				foundId2 += 1;
			}
		}
	}
	if (foundId2 == p2Range + 1)
		return true;
	return false;
}

let getPairs = (list) => {
	let pairInPair = 0;

	for (let pairs of list)
	{
		console.log(pairs);
		if (createIds(pairs))
			pairInPair += 1;
	}
	return pairInPair;
}

let getOverlaps = (list) => {
	let overlaps = 0;

	for (let pairs of list)
	{
		if (createIds2(pairs))
			overlaps += 1;
	}
	return overlaps;
}

document.getElementById('input').addEventListener('change', function () {
	const [file] = this.files;
	const reader = new FileReader();
	let	list;
	let totalPairs;

	reader.addEventListener('load', () => {
		list = getLines(reader);
		totalPairs = getPairs(list);
		let totalOverlaps = getOverlaps(list);
		console.log(totalPairs);
		console.log(totalOverlaps);
	});
	if (file)
		reader.readAsText(file)
});