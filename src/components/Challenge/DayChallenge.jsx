import React from "react";
import "./dayChallenge.css";

const DayChallenge = ({partOneContent, partTwoContent}) => {
    return (
        <>
            <article className="day-desc">
                <h3 className="part1">--- Part One ---</h3>
                <div>
                    {partOneContent}  
                </div>
            </article>
            <article className="day-desc">
                <h3 className="part2">--- Part Two ---</h3>
                <div>
                    {partTwoContent}  
                </div>
            </article>
        </>
    )
}

export default DayChallenge;