import React, { useEffect, useState } from "react";
import "./day1.css"
import { getLines } from "../../utils/utils";
import { input1, input2 } from "../../assets/tests"
// import input1 from "../../assets/day1/input1"

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
		if (num != '')
			total += parseInt(num);
		if (num == '' || index == numArr.length - 1)
		{
			sumArr[i] = new sums(i + 1, total);
			total = 0;
			console.log(sumArr[i]);
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
		console.log("this is-> ",elfWithMostCalory);
	}
	return elfWithMostCalory;
}

let getTop3Cals = (sumArr, top3, totalTopThree) => {
	let maxIndex;
	let max;

	while (top3.length != 0) {
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
		console.log(top3);
	}
	return totalTopThree;
}

const Output = ( {result} ) => {
    const [fileContent, setFileContent] = useState("");

	useEffect( ()=> {
		fetch(input1)
		.then((response) => response.text())
		.then((content) => {
			setFileContent(content);
			// Processing happens here
		})
		.catch((error) => {
			console.error("Error reading file:", error);
		});
	}, [] )
    return (
        <div>
			Result is &#61; &gt; {result}
			<div>
				{fileContent}
			</div>
        </div>
    );
}

const Day1 = () => {
    // let [ result, setResult ] = useState(false);
	// let [ userInput, setUserInput ] = useState("")

	const [fileContent, setFileContent] = useState("");
	const [ result , setResult ] = useState(false);
	const [max, setMax] = useState({index: null, value: null});
	let [totalTopThree, setTotalTopThree] = useState(0);
	let [top3, setTop3 ] = useState([]);


	useEffect( () => {
		fetch(input2)
		.then((response) => response.text())
		.then((content) => {
			setFileContent(content);
			// Processing happens here
		})
		.catch((error) => {
			console.log("Error reading file:", error);
		})
	}, [] );

	const handleProcess = () => {
		let numArr = getLines(fileContent);
		let sumArr = [];
		console.log(numArr);
		setResult(true);

		sumEachElfCalory(sumArr, numArr);
		// max = getMaxCalory(sumArr, 0);
		setMax(getMaxCalory(sumArr, 0));
		// console.log(max.index, max.value);
		// totalTopThree = getTop3Cals(sumArr, top3, totalTopThree)
		setTotalTopThree (
			getTop3Cals(sumArr, top3, totalTopThree)
		)
		setTop3(top3);
	};

    return (
        <div className="day1__container">
            <h3>
                Advent of Code<br/>&lt;y&gt;2022&lt;/y&gt;
            </h3>
            <p>
                -- Day 1: Calorie Couting --
            </p>
            <p>
                Select the input file provided
            </p>
            {/* <button onClick={ () => setResult(result + 1) } > Click </button> */}
            {/* <input type="file" id="inputfile" onChange={ (e) => { setResult(e.target.value != ""); setUserInput(e.target.value)} } />
            <br />
            {
                result && <Output result={userInput}/>
            } */}
			<textarea value={fileContent} rows="50" column="50" onChange={ (e) => {setFileContent(e.target.value); setResult(false)} } />
			<button onClick={handleProcess} > Process File </button>
			{
				result && fileContent				
			}
			<br />
			{
				result &&
				<table width={250}>
					<caption> Elf with highest calory </caption>
					<thead>
						<tr>
							<th>
								Elf Index
							</th>
							<th>
								Calories
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{max.index} 
							</td>
							<td>
								{max.value}
							</td>
						</tr>
					</tbody>
				</table>
			}
			<br />
			{
				result &&
				<table>
					<caption>
						Top 3 Elves
					</caption>
					<thead>
						<tr>
							<th>
								Elf Index
							</th>
							<th>
								Elf Calories
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								{top3[0][0].index}
							</td>
							<td>
								{top3[0][0].value}
							</td>
						</tr>
						<tr>
							<td>
								{top3[1][0].index}
							</td>
							<td>
								{top3[1][0].value}
							</td>
						</tr>
						<tr>
							<td>
								{top3[2][0].index}
							</td>
							<td>
								{top3[2][0].value}
							</td>
						</tr>
					</tbody>
					<tfoot>
						<tr>
							<td>
								Total weight of top 3 calories: {totalTopThree}
							</td>
						</tr>
					</tfoot>
				</table>
			}
        </div>
    );
}

export default Day1;