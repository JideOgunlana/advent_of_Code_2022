import {React, useState} from "react";
import { Day1, Day2, Day3, Day4, Day5, Day6, Day7 } from "./containers/";
import "./App.css";

const App = () => {
    const [day, setDay] = useState(0);
    const days = [1, 2, 3, 4, 5, 6, 7];

    return (
        <div className="container">
            <h1>
                Select a Day
            </h1>
                <div className="side-bar">
                    {
                        days.map( (dayX) => (
                            <button className={day === dayX ? `d${dayX}`: ""} onClick={ (e) => { setDay(dayX) }}>
                                Day{dayX}
                            </button>
                        ))
                    }
                </div>
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

                </div>
        </div>
    )
}

export default App;
