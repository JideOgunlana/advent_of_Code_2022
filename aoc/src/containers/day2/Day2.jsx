import React, {useState, useEffect} from "react";
import Modal from "react-modal";
import "../index.css";
import "./day2.css";
import { getLines } from "../../utils/utils";
import { input1, input2 } from "../../tests/day2tests";
import { getPlayerScore, getPredictedPlay} from "./helper/day2Helper";
import { FaFileDownload, FaFile, FaSave, FaTimes } from "react-icons/fa";
import { Header, Card, DayChallenge } from "../../components/";




const Day2 = () => {

    const [input1fileContent, setInput1FileContent] = useState("");
	const [input2FileContent, setInput2FileContent] = useState("");
	const [isEditMode, setIsEditMode] = useState([]);
	const [isActive, setIsActive] = useState(false);


	const [result, setResult] = useState(false);
	const [gameResult, setGameResult] = useState(null);
	const [predictedResult, setPredictedResult] = useState(null);

    let [testFile, setTestFile] = useState("");
	useEffect( () => {
		fetch(input1)
		.then((response) => response.text())
		.then((content) => {
			setInput1FileContent(content);
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


    const handleActiveCard = (card) => {
		if (card === "default" && !isActive) {
			setIsActive(!isActive);
		}
		else if (card === "test" && !isActive) {
			setIsActive(!isActive);
		}
	}

	const handleProcess = () => {
		let strategy = [];
		const rps_value = {
			rock: 1,
			paper: 2,
			scissors: 3
		}
		const elf_pick = {
			rock: 'A',
			paper: 'B',
			scissors: 'C'
		}
		if (testFile === "default") {
			strategy = getLines(input1fileContent);
		}
		else if (testFile === "test") {
			strategy = getLines(input2FileContent);
		}
		else {
			alert("Pick a file");
			return ;
		}
		let gameResult = getPlayerScore(strategy, rps_value);
		let predictedResult = getPredictedPlay(strategy, elf_pick, rps_value);

		setGameResult(gameResult);
		setPredictedResult(predictedResult);
		setResult(true);

	};

    return (
        <div className="day__container">
            <Header title="-- Day 2: Rock Paper Scissors --" />
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
										Close <FaTimes className="close-icon" />
									</button>
									:
									<button onClick={()=>closeModal(id)} >
										Save <FaSave className="save-icon"/>
									</button>
								}
								</div>
								{
									(id !== "modaltest") ? 
								<textarea value={input1fileContent} rows="50" column="50" /* onChange={ (e) => {setInput1FileContent(e.target.value); setResult(false)} } */ />
								:
								<textarea value={input2FileContent} rows="50" column="50" onChange={ (e) => {setInput2FileContent(e.target.value); /* setResult(false); */} } />

								}
							</Modal>
						</div>
					))
				}
			</div>

			<div className="submit">
				{
					(isActive) ? 
					<button onClick={handleProcess} > Process File </button>
					:
					null
				}
			</div>
			<div className="questions_results_container">
				<div className="questions">
					{/*  Day2 Question  */}
					<DayChallenge 
						partOneContent={
							<>
								<p>
									The Elves begin to set up camp on the beach. To decide whose tent gets to be closest to the snack storage, a giant <a href="https://en.wikipedia.org/wiki/Rock_paper_scissors" target="_blank" rel="noreferrer">Rock Paper Scissors</a> tournament is already in progress.
								</p>
							
								<p>
									Rock Paper Scissors is a game between two players. Each game contains many rounds; in each round, the players each simultaneously choose one of Rock, Paper, or Scissors using a hand shape. Then, a winner for that round is selected: Rock defeats Scissors, Scissors defeats Paper, and Paper defeats Rock. If both players choose the same shape, the round instead ends in a draw.
								</p>
								<p>
									Appreciative of your help yesterday, one Elf gives you an <em>encrypted strategy guide</em> (your puzzle input) that they say will be sure to help you win. "The first column is what your opponent is going to play: <code>A</code> for Rock, <code>B</code> for Paper, and <code>C</code> for Scissors. The second column--" Suddenly, the Elf is called away to help with someone's tent.
								</p>
								<p>
									The second column, <span title="Why do you keep guessing?!">you reason</span>, must be what you should play in response: <code>X</code> for Rock, <code>Y</code> for Paper, and <code>Z</code> for Scissors. Winning every time would be suspicious, so the responses must have been carefully chosen.
								</p>
								<p>
									The winner of the whole tournament is the player with the highest score. Your <em>total score</em> is the sum of your scores for each round. The score for a single round is the score for the <em>shape you selected</em> (1 for Rock, 2 for Paper, and 3 for Scissors) plus the score for the <em>outcome of the round</em> (0 if you lost, 3 if the round was a draw, and 6 if you won).
								</p>
								<p>
									Since you can't be sure if the Elf is trying to help you or trick you, you should calculate the score you would get if you were to follow the strategy guide.
								</p>
								<p>
									For example, suppose you were given the following strategy guide:
								</p>
								<pre>
									<code className="preserve">
										<div>
											A Y
										</div>
										<div>
											B X
										</div>
										<div>
											C Z
										</div>
									</code>
								</pre>
								<p>This strategy guide predicts and recommends the following:</p>
								<ul>
									<li>
										In the first round, your opponent will choose Rock (<code>A</code>), and you should choose Paper (<code>Y</code>). This ends in a win for you with a score of <em>8</em> (2 because you chose Paper + 6 because you won).
									</li>
									<li>
										In the second round, your opponent will choose Paper (<code>B</code>), and you should choose Rock (<code>X</code>). This ends in a loss for you with a score of <em>1</em> (1 + 0).
									</li>
									<li>
										The third round is a draw with both players choosing Scissors, giving you a score of 3 + 3 = <em>6</em>.
									</li>
								</ul>
								<p>
									In this example, if you were to follow the strategy guide, you would get a total score of <code><em>15</em></code> (8 + 1 + 6).
								</p>
								<p>
									<em>What would your total score be if everything goes exactly according to your strategy guide?</em>
								</p>
							</>
						}
						partTwoContent={
							<>
								<p>
									The Elf finishes helping with the tent and sneaks back over to you. "Anyway, the second column says how the round needs to end: <code>X</code> means you need to lose, <code>Y</code> means you need to end the round in a draw, and <code>Z</code> means you need to win. Good luck!"
								</p>
								<p>
									The total score is still calculated in the same way, but now you need to figure out what shape to choose so the round ends as indicated. The example above now goes like this:
								</p>
								<ul>
									<li>
										In the first round, your opponent will choose Rock (<code>A</code>), and you need the round to end in a draw (<code>Y</code>), so you also choose Rock. This gives you a score of 1 + 3 = <em>4</em>.
									</li>
									<li>
										In the second round, your opponent will choose Paper (<code>B</code>), and you choose Rock so you lose (<code>X</code>) with a score of 1 + 0 = <em>1</em>.
									</li>
									<li>
										In the third round, you will defeat your opponent's Scissors with Rock for a score of 1 + 6 = <em>7</em>.
									</li>
								</ul>
								<p>
									Now that you're correctly decrypting the ultra top secret strategy guide, you would get a total score of <code><em>12</em></code>.
								</p>
								<p>
									Following the Elf's instructions for the second column, <em>what would your total score be if everything goes exactly according to your strategy guide?</em>
								</p>
							</>
						}
					/>
				</div>
				<div className="results">
					<div className="game_result">
						{ /* Result */}
						{result && <h3 className="part1">--- Part One ---</h3>}
						{
							(result) ?
							<>
								<p>
									After following strategy guide, total score is: <em className="ans">{gameResult}</em>
								</p>
							</>
							: 
							null
						}
					</div>
					<div className="predicted_result">
						{
							result && <h3 className="part2">--- Part Two ---</h3>
						}
						{
							(result) ?
							<>
								<p>
									After following strategy guide, total score is: <em className="ans">{predictedResult}</em>
								</p>
							</>
							:
							null
						}
					</div>
				</div>
			</div>
        </div>
    )
}

export default Day2;


