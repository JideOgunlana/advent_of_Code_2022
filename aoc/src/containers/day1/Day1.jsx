import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../index.css";
import "./day1.css";
import { getLines } from "../../utils/utils";
import { input1, input2 } from "../../tests/day1tests";
import { FaFileDownload, FaFile, FaAd, FaTimes } from "react-icons/fa"
import { sumEachElfCalory, getMaxCalory, getTop3Cals } from "./helper/day1Helper";
import { Header, Card, DayChallenge } from "../../components/"



const Day1 = () => {

	const [input1fileContent, setInput1FileContent] = useState("");
	const [input2FileContent, setInput2FileContent] = useState("");
	const [isEditMode, setIsEditMode] = useState([]);
	const [isActive, setIsActive] = useState(false);

	const [result, setResult] = useState(false);
	const [max, setMax] = useState({index: null, value: null});
	let [totalTopThree, setTotalTopThree] = useState(0);
	let [top3, setTop3 ] = useState([]);

	let [testFile, setTestFile] = useState("");
	useEffect( () => {
		fetch(input1)
		.then((response) => response.text())
		.then((content) => {
			setInput1FileContent(content);
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

		setResult(true);
		sumEachElfCalory(sumArr, numArr);
		setMax(getMaxCalory(sumArr, 0));
		setTotalTopThree (getTop3Cals(sumArr, top3, totalTopThree))
		setTop3(top3);
		// console.log(top3.length);
	};

	const handleActiveCard = (card) => {
		if (card === "default" && !isActive) {
			setIsActive(!isActive);
		}
		else if (card === "test" && !isActive) {
			setIsActive(!isActive);
		}
	}

    return (
        <div className="day__container">
			<Header title="-- Day 1: Calorie Couting --" />
			<div className="cards__container">
				<Card
					isActive={isActive}
					testFile={testFile}
					setTestFile={setTestFile}
					handleActiveCard={handleActiveCard}
					openModal={openModal}
					fileId="default"
					buttonIcon={<FaFile />}
					buttonText="View Default Test"
					fileContent={input1fileContent}
				/>

				<Card
					isActive={isActive}
					testFile={testFile}
					setTestFile={setTestFile}
					handleActiveCard={handleActiveCard}
					openModal={openModal}
					fileId="test"
					buttonIcon={<FaFileDownload />}
					buttonText="View/Edit Test"
					fileContent={input2FileContent}
				/>

				{
					isEditMode.map( (id) => (
						<div key={id}>
							<Modal
								className="modal__container"
								isOpen={true}
								onRequestClose={()=>closeModal(id)}
								contentLabel={`Edit test ${id}`}
								>
								<div className="modal__button-container">
								{
									(id !== "modaltest") ? 
									<button onClick={()=>closeModal(id)} >
										Close <FaTimes />
									</button>
									:
									<button onClick={()=>closeModal(id)} >
										Save <FaAd />
									</button>
								}
								</div>
								{
									(id !== "modaltest") ? 
								<textarea value={input1fileContent} rows="50" column="50" /* onChange={ (e) => {setInput1FileContent(e.target.value); setResult(false)} } */ />
								:
								<textarea value={input2FileContent} rows="50" column="50" onChange={ (e) => {setInput2FileContent(e.target.value); setResult(false);} } />

								}
							</Modal>
						</div>
					))
				}
			</div>

			{/* 
				A test file should be selected,then this button can be used
			*/}
			<div className="submit">
				{
					(isActive) ? 
					<button onClick={handleProcess} > Process File </button> :
					null
				}
			</div>
			<div className="questions_results_container">
				<div className="questions">
					{/* Day1 Question */}
					<DayChallenge 
						partOneContent = {
							<>
								<p>
									Santa's reindeer typically eat regular reindeer food, but they need a lot of <a href="/2018/day/25">magical energy</a> to deliver presents on Christmas. For that, their favorite snack is a special type of <em className="star">star</em> fruit that only grows deep in the jungle. The Elves have brought you on their annual expedition to the grove where the fruit grows.
								</p>
								<p>
									To supply enough magical energy, the expedition needs to retrieve a minimum of <em className="star">fifty stars</em> by December 25th. Although the Elves assure you that the grove has plenty of fruit, you decide to grab any fruit you see along the way, just in case.
								</p>
								<p>
									Collect stars by solving puzzles.  Two puzzles will be made available on each day in the Advent calendar; the second puzzle is unlocked when you complete the first.  Each puzzle grants <em className="star">one star</em>. Good luck!
								</p>
								<p>
									The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of <em>Calories</em> each Elf is carrying (your puzzle input).
								</p>
								<p>
									The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, <span title="By &quot;etc&quot;, you're pretty sure they just mean &quot;more snacks&quot;.">etc.</span> that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.
								</p>
								<p>
									For example, suppose the Elves finish writing their items' Calories and end up with the following list:</p>
								<pre>
									<code className="preserve">
										<div>
											1000<br />
											2000<br />
											3000<br /><br />
										</div>
										<div>
											4000<br /><br />
										</div>
										<div>
											5000<br />
											6000<br /><br />
										</div>
										<div>
											7000<br />
											8000<br />
											9000<br /><br />
										</div>
										<div>
											10000
										</div>
									</code>
								</pre>
								<p>This list represents the Calories of the food carried by five Elves:</p>
								<ul>
									<li>The first Elf is carrying food with <code>1000</code>, <code>2000</code>, and <code>3000</code> Calories, a total of <code><em>6000</em></code> Calories.</li>
									<li>The second Elf is carrying one food item with <code><em>4000</em></code> Calories.</li>
									<li>The third Elf is carrying food with <code>5000</code> and <code>6000</code> Calories, a total of <code><em>11000</em></code> Calories.</li>
									<li>The fourth Elf is carrying food with <code>7000</code>, <code>8000</code>, and <code>9000</code> Calories, a total of <code><em>24000</em></code> Calories.</li>
									<li>The fifth Elf is carrying one food item with <code><em>10000</em></code> Calories.</li>
								</ul>
								<p>
									In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the <em>most</em> Calories. In the example above, this is <em><code>24000</code></em> (carried by the fourth Elf).
								</p>
								<p>Find the Elf carrying the most Calories. <em>How many total Calories is that Elf carrying?</em></p>
							</>
						}
						partTwoContent={
							<>
								<p>
									By the time you calculate the answer to the Elves' question, they've already realized that the Elf carrying the most Calories of food might eventually <em>run out of snacks</em>.
								</p>
								<p>
									To avoid this unacceptable situation, the Elves would instead like to know the total Calories carried by the <em>top three</em> Elves carrying the most Calories. That way, even if one of those Elves runs out of snacks, they still have two backups.
								</p>
								<p>
									In the example above, the top three Elves are the fourth Elf (with <code>24000</code> Calories), then the third Elf (with <code>11000</code> Calories), then the fifth Elf (with <code>10000</code> Calories). The sum of the Calories carried by these three elves is <code><em>45000</em></code>.
								</p>
								<p>
									Find the top three Elves carrying the most Calories. <em>How many Calories are those Elves carrying in total?</em>
								</p>
							</>
						}
					/>
				</div>
				<div className="results">
					<div className="highest_calory_elf">
					{result && <h3 className="part1">--- Part One ---</h3>}
						
						{
							(result && max) ?
							<table >
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
							:
							null
						}
					</div>
					<br />
					
					<div className="top_three_elf">
					{result && <h3 className="part1">--- Part One ---</h3>}

					{
						(result && top3[0][0] !== undefined && top3[1][0] !== undefined && top3[2][0] !== undefined) &&
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
										Total weight of top 3 calories:
									</td>
									<td>
										{totalTopThree}
									</td>
								</tr>
							</tfoot>
						</table>
					}
					</div>
				</div>
			</div>
        </div>
    );
}

export default Day1;