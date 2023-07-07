// import React from "react";

let sumEachElfCalory = (sumArr, numArr) => {
	let i = 0;
	let total = 0;
	class sums {
		constructor(index, value) {
			this.index = index;
			this.value = value;
		}
	}

	numArr.forEach((num, index) => {
		if (num !== '')
			total += parseInt(num);
		if (num === '' || index === numArr.length - 1)
		{
			sumArr[i] = new sums(i + 1, total);
			total = 0;
			// console.log(sumArr[i]);
			i++;
		}
	});
}

let getMaxCalory = (sumArr, max) => {
	let elfWithMostCalory;
	for (let i = 0; i < sumArr.length; i++)
	{
		if (max < sumArr[i].value) {
			elfWithMostCalory = sumArr[i];
			max = sumArr[i].value;
		}
		// console.log("this is-> ",elfWithMostCalory);
	}
	return elfWithMostCalory;
}

let getTop3Cals = (sumArr, top3, totalTopThree) => {
	let maxIndex;
	let max;

	while (top3.length !== 0) {
		top3.pop();
		totalTopThree = 0;
	}
	for (let i = 1; i <= 3; i++)
	{
		max = 0;
		maxIndex = 0;
		for (let j = 0; j < sumArr.length; j++)
		{
			if (max < sumArr[j].value)
			{
				max = sumArr[j].value;
				maxIndex = j;
			}
		}
		totalTopThree += max;
		top3.push(sumArr.splice(maxIndex, 1));
		// console.log(top3[0]);
	}
	return totalTopThree;
}

export {getMaxCalory, getTop3Cals, sumEachElfCalory};