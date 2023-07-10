import {React, useState} from "react";
import { 
        Day1, Day2, Day3, Day4, Day5, Day6, Day7, 
        Day8, Day9, Day10, Day11, Day12, Day13, Day14,
        Day15, Day16, Day17, Day18, Day19, Day20, Day21,
        Day22, Day23, Day24, Day25, Questions 
    }
    from "./containers/";
import "./App.css";
import reactLogo from "./assets/images/logo192.png";

const App = () => {
    const [day, setDay] = useState(0);
    // const daysCompleted = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="container">
            <header>
                <h3>
                    Advent of Code<br/>&lt;y&gt;2022&lt;/y&gt;
                </h3>
                <h1>
                    Select a Day
                </h1>
            </header>
            <Questions day = {day} setDay={setDay}/>
            <main>
                <div className="main">
                    {
                        (day === 1) ? <Day1 /> : null
                    }
                    {
                        (day === 2) ? <Day2 /> : null
                    }
                    {
                        (day === 3) ? <Day3 /> : null
                    }
                    {
                        (day === 4) ? <Day4 /> : null
                    }
                    {
                        (day === 5) ? <Day5 /> : null
                    }
                    {
                        (day === 6) ? <Day6 /> : null
                    }
                    {
                        (day === 7) ? <Day7 /> : null
                    }
                    {
                        (day === 8) ? <Day8 /> : null
                    }
                    {
                        (day === 9) ? <Day9 /> : null
                    }
                    {
                        (day === 10) ? <Day10 /> : null
                    }
                    {
                        (day === 11) ? <Day11 /> : null
                    }
                    {
                        (day === 12) ? <Day12 /> : null
                    }
                    {
                        (day === 13) ? <Day13 /> : null
                    }
                    {
                        (day === 14) ? <Day14 /> : null
                    }
                    {
                        (day === 15) ? <Day15 /> : null
                    }
                    {
                        (day === 16) ? <Day16 /> : null
                    }
                    {
                        (day === 17) ? <Day17 /> : null
                    }
                    {
                        (day === 18) ? <Day18 /> : null
                    }
                    {
                        (day === 19) ? <Day19 /> : null
                    }
                    {
                        (day === 20) ? <Day20 /> : null
                    }
                    {
                        (day === 21) ? <Day21 /> : null
                    }
                    {
                        (day === 22) ? <Day22 /> : null
                    }
                    {
                        (day === 23) ? <Day23 /> : null
                    }
                    {
                        (day === 24) ? <Day24 /> : null
                    }
                    {
                        (day === 25) ? <Day25 /> : null
                    }
                </div>
            </main>
            <footer>
                <div>
                    <code>day1</code> &amp; <code>day2</code> are available
                </div>
                <div>
                    Written in <img src={reactLogo} alt="react"/>
                </div>
            </footer>
        </div>
    )
}

export default App;
