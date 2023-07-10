import React from "react";
import {Header} from "../../components/";
import "../index.css";
import "./day5.css";

const Day5 = () => {
    return (
        <div className="day__container">
            <Header title="--- Day 5: Supply Stacks ---" />
            <p className="day-info">
                Solution to day 5 is written in <code>C</code> and can be found&nbsp;
                <a 
                    href="https://github.com/JideOgunlana/advent_of_Code_2022/blob/main/day5/day5.c"
                    target="_blank"
                    rel="noreferrer"
                >
                    here
                </a>
            </p>
        </div>
    )
}

export default Day5;