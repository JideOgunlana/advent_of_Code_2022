import React, { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import "./day1.css"
import { getLines } from "../../utils/utils";
import { input1, input2 } from "../../assets/tests"

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

const Header = ({title}) => {
	return (
		<div>
			<h3>
                Advent of Code<br/>&lt;y&gt;2022&lt;/y&gt;
            </h3>
            <p>
				{title}
            </p>
            <p>
                Select an input file
            </p>
		</div>
	);
}

const Day1 = () => {

	const [input1fileContent, setinput1FileContent] = useState("");
	const [input2FileContent, setInput2FileContent] = useState("");
	const [isEditMode, setIsEditMode] = useState([]);

	const [result, setResult] = useState(false);
	const [max, setMax] = useState({index: null, value: null});
	let [totalTopThree, setTotalTopThree] = useState(0);
	let [top3, setTop3 ] = useState([]);

	let [testFile, setTestFile] = useState("");
	useEffect( () => {
		fetch(input1)
		.then((response) => response.text())
		.then((content) => {
			setinput1FileContent(content);
			// Processing happens here
		})
		.catch((error) => {
			console.log("Error reading file:", error);
		})
	}, [] );

	useEffect( () => {
		fetch(input2)
		.then((response) => response.text())
		.then((content) => {
			setInput2FileContent(content);
			// Processing happens here
		})
		.catch((error) => {
			console.log("Error reading file:", error);
		})
	}, [] );

	const openModal = (id) => {
		setIsEditMode((prevModals) => {
			if(!prevModals.includes(id)) {

				return [...prevModals, id];
			}
			return prevModals;
		})
	}

	const closeModal = (id) => {
		setIsEditMode((prevModals) => prevModals.filter( (modalId) => modalId !== id));
	}

	const handleProcess = () => {
		let numArr = [];
		if (testFile === "default") {
			numArr = getLines(input1fileContent);
		}
		else if (testFile === "test") {
			numArr = getLines(input2FileContent);
		}
		else {
			alert("Pick a file");
			return ;
		}
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
			<Header title="-- Day 1: Calorie Couting --" />

			<div className="card" id="test" onClick={() => setTestFile("test")}>
				<div className="card-button">
						<button onClick={ () => openModal('modal2')}>Edit</button>
				</div>
				<pre>
					{input2FileContent}
				</pre>
			</div>
			<div className="card" id="default" onClick={() => setTestFile("default")}>
				<div className="card-button">
					<button onClick={()=>openModal('modal1')} >View test 1</button>
				</div>
				<pre>{input1fileContent}</pre>
			</div>

			{
				isEditMode.map( (id) => (
					<div key={id}>
						<Modal
							isOpen={true}
							onRequestClose={()=>closeModal(id)}
							contentLabel={`Edit test ${id}`}
							>
							{
								(id === "modal1") ? 
							<textarea value={input1fileContent} rows="50" column="50" /* onChange={ (e) => {setinput1FileContent(e.target.value); setResult(false)} } */ />
							:
							<textarea value={input2FileContent} rows="50" column="50" onChange={ (e) => {setInput2FileContent(e.target.value); setResult(false)} } />

							}
							{
								(id === "modal1") ? 
								<button onClick={()=>closeModal(id)} >
									Close
								</button>
								:
								<button onClick={()=>closeModal(id)} >
									Save
								</button>
							}
						</Modal>
					</div>
				))
			}

			{/* 
				A test file should be selected,then this button can be used
			*/}
				<button onClick={handleProcess} > Process File </button>

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