import React from "react";


const Questions = ({day, setDay}) => {
    return (

        <div className="calendar" >
                    <div 
                        className={day === 25 ? `d25 calendar-day25`: `calendar-day25`}
                        onClick={ (e) => { setDay(25) } }
                    >
                        <div>
                            <div className="preserve-wspace"> - /\ -  -        -       -     -      -  -</div>          
                            <div className="preserve-wspace">- /  \/\  -    -     -  -    -   -  /\   -    -</div>      
                            <div className="preserve-wspace">##@#@####@@@@#@@@@@@@@@@#@@@#@##@@@#@@@@@@#@@@@#@</div>
                        </div>
                        <span className="calendar-day">25</span>
                        <div className="calendar-marks">
                            <span className="calendar-mark-complete">*</span><span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 24 ? `d24 calendar-day24`: `calendar-day24`}
                        onClick={ (e) => { setDay(24) } }
                    >
                        <div>
                            ###@@###@#@@@@##@##@#@@#@@@@@@@@#@#@#@@@@@@@##@@@
                        </div>
                        <span className="calendar-day">24</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div 
                        className={day === 23 ? `d23 calendar-day23`: `calendar-day23`}
                        onClick={ (e) => { setDay(23) } }
                    >
                        <div>
                            ##@@@@@@@@#@#@@@@@@##@@#@@@@#@@@#@@@@@#@#@@#@@#@@  
                        </div>
                        <span className="calendar-day">23</span> 
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 22 ? `d22 calendar-day22`: `calendar-day22`}
                        onClick={ (e) => { setDay(22) } }
                    >
                        <div>
                            @@##@@@@#@@@@@@#@@#@@@@@#@@@@##@#@@@#@@@@##@@@@#@ 
                        </div>
                        <span className="calendar-day">22</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div className={day === 21 ? `d21 calendar-day21`: `calendar-day21`}
                        onClick={ (e) => { setDay(21) } }
                    >
                        <div>
                            #@@@@#@@@####@@@@@@@@@@@@##@##@@#@@@#@@#@@@#@@@@#
                        </div>
                        <span className="calendar-day">21</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div className={day === 20 ? `d20 calendar-day20`: `calendar-day20`}
                        onClick={ (e) => { setDay(20) } }
                    >
                        <div>
                            @##@@@@@@@#@@@#@@#@@@###@#@#@@@@###@@@@@@@@##@@@#
                        </div>
                        <span className="calendar-day">20</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 19 ? `d19 calendar-day19`: `calendar-day19`}
                        onClick={ (e) => { setDay(19) } }
                    >
                        <div>
                            #@@##@@@@@@@@@@@##@##@@@@###@###@@@#@@@##@@#@@@@#
                        </div>
                        <span className="calendar-day">19</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 18 ? `d18 calendar-day18`: `calendar-day18`}
                        onClick={ (e) => { setDay(18) } }
                    >
                        <div>
                            @#@@@@#@@@@###@@#@###@#@#@#@@@@@@@@@#@#@##@@#@@@# 
                        </div>
                        <span className="calendar-day">18</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                     className={day === 17 ? `d17 calendar-day17`: `calendar-day17`}
                     onClick={ (e) => { setDay(17) } }
                    >
                        <div>
                            ##@@@#@@#@#@@@@@@###@@#@@@@##@@##@#@@@@@@#@#@@@#@  
                        </div>
                        <span className="calendar-day">17</span>
                        <div>
                           <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div 
                        className={day === 16 ? `d16 calendar-day16`: `calendar-day16`}
                        onClick={ (e) => { setDay(16) } }
                    >
                        <div>
                            @@##@@@@@@@@@@@#@#@#@@@@@@@@#@@#@@#@@@#@@@@@@#@@@  
                        </div>
                        <span className="calendar-day">16</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div className={day === 15 ? `d15 calendar-day15`: `calendar-day15`}
                        onClick={ (e) => { setDay(15) } }
                    >
                        <div>
                            ##@#@@@@@@@@@@##@#@@@@@@@#@@@@@##@#@@#@@@@##@###@  
                        </div>
                        <span className="calendar-day">15</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 14 ? `d14 calendar-day14`: `calendar-day14`}
                        onClick={ (e) => { setDay(14) } }
                    >
                        <div>
                            @@@@##@@@@@@#@#@@#@#@@@##@#@@@#@@@@@@@#@@###@#@@@  
                        </div>
                        <span className="calendar-day">14</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 13 ? `d13 calendar-day13`: `calendar-day13`}
                        onClick={ (e) => { setDay(13) } }
                    >
                        <div>
                            @@@@#@#@#@#@#@@#@@@@@#@##@@#@@#@@@@@@@@@@@@@#@@@@  
                        </div>
                        <span className="calendar-day">13</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 12 ? `d12 calendar-day12`: `calendar-day12`}
                        onClick={ (e) => { setDay(12) } }
                    >
                        <div>
                            @@#@###@##@@@#@#@@@@#@@@@###@@#@#@@@@@#@@@@#@##@#  
                        </div>
                        <span className="calendar-day">12</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 11 ? `d11 calendar-day11`: `calendar-day11`}
                        onClick={ (e) => { setDay(11) } }
                    >
                        <div>
                            @@@#@#@@##@@#@@@#@@#@@@@@@##@@@@@@@#@@@@@#@@@@@#@  
                        </div>
                        <span className="calendar-day">11</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 10 ? `d10 calendar-day10`: `calendar-day10`}
                        onClick={ (e) => { setDay(10) } }
                    >
                        <div>
                            @@@@#@@@@#@#@@#@@####@@###@@@@#@@#@#@##@@@@##@@@@  
                        </div>
                        <span className="calendar-day">10</span>
                        <div>
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 9 ? `d9 calendar-day9`: `calendar-day9`}
                        onClick={ (e) => { setDay(9) } }
                    >
                        <div>
                            @#@@@#@#@@##@@@@##@#@#@##@@#@@@@@@#@#@#@#@@#@@@##  
                        </div>
                        <span className="preserve-wspace calendar-day"> 9</span>
                        <div>                
                            <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div 
                        className={day === 8 ? `d8 calendar-day8`: `calendar-day8`}
                        onClick={ (e) => { setDay(8) } }
                    >
                        <div>
                            #@#@@##@@@###@@#@@@#@@@#@@@#@@@#@@#@@#@@@#@@#@@@@  
                        </div>
                        <span className="preserve-wspace calendar-day"> 8</span>
                        <div>
                           <span className="calendar-mark-complete">*</span>
                            <span className="calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 7 ? `d7 calendar-day7 calendar-verycomplete`: `calendar-day7 calendar-verycomplete`}
                        onClick={ (e) => { setDay(7) } }
                    >
                        <div>
                            @@@@###@##@@##@@@@@@##@@@@@#@@###@##@@@#@@@@#@@#@ 
                        </div>
                        <span className="preserve-wspace calendar-day"> 7</span>
                    <div>
                        <span className="calendar-mark-complete">*</span>
                        <span className="calendar-mark-verycomplete">*</span></div>
                    </div>
                    <div
                        className={day === 6 ? `d6 calendar-day6 calendar-verycomplete`: `calendar-day6 calendar-verycomplete`}
                        onClick={ (e) => { setDay(6) } }
                    >
                        <div>
                            @@@@@@@@@@
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g2">@</span>
                            <span className="preserve-wspace calendar-color-u">.~~.</span>
                            <span className="preserve-wspace calendar-color-g2">#</span>
                            <span className="preserve-wspace calendar-color-g1">#</span>
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g1">@@</span>
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g0">#</span>
                            <span className="preserve-wspace calendar-color-s">..</span>
                            <span className="preserve-wspace calendar-color-g1">@@</span>
                            
                            @@#@#@@@@#@@#@@@@@@#@@  
                        </div>
                        <span className="preserve-wspace calendar-day"> 6</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>      
                    </div>
                    <div
                        className={day === 5 ? `d5 calendar-day5 calendar-verycomplete`: `calendar-day5 calendar-verycomplete`}
                        onClick={ (e) => { setDay(5) } }
                    >
                        <div>
                            @@##@#@@
                            <span className="preserve-wspace calendar-color-g0">@</span>
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g1">#</span>
                            <span className="preserve-wspace calendar-color-g2">@</span>
                            <span className="preserve-wspace calendar-color-g0">@</span>
                            <span className="preserve-wspace calendar-color-u">.~~.</span>
                            <span className="preserve-wspace calendar-color-g2">@</span>
                            <span className="preserve-wspace calendar-color-g0">@</span>
                            <span className="preserve-wspace calendar-color-s">.</span>
                            <span className="preserve-wspace calendar-color-c">/\</span>
                            <span className="preserve-wspace calendar-color-s">.'</span>
                            <span className="preserve-wspace calendar-color-g4">#</span>
                            <span className="preserve-wspace calendar-color-g0">#@</span>
                            <span className="preserve-wspace calendar-color-g1">@</span>
                            <span className="preserve-wspace calendar-color-g2">#</span>
                            @#@@@@@@#@##@@#@###@  
                        </div>
                        <span className="preserve-wspace calendar-day"> 5</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>        
                    </div>
                    <div
                        className={day === 4 ? `d4 calendar-day4 calendar-verycomplete`: `calendar-day4 calendar-verycomplete`}
                        onClick={ (e) => { setDay(4) } }
                        >
                        <div>
                            ##@@@
                            <span className="preserve-wspace calendar-color-g1">@@@</span>
                            <span className="preserve-wspace calendar-color-g0">#@#</span>
                            <span className="preserve-wspace calendar-color-s">.'</span>
                            <span className="preserve-wspace calendar-color-u"> ~  </span>
                            <span className="preserve-wspace calendar-color-s">'.</span>
                            <span className="preserve-wspace calendar-color-c">/\</span>
                            <span className="preserve-wspace calendar-color-s">'.</span>
                            <span className="preserve-wspace calendar-color-c">/\</span>
                            <span className="preserve-wspace calendar-color-s">' .</span>
                            <span className="preserve-wspace calendar-color-g1">#</span>
                            <span className="preserve-wspace calendar-color-g2">@#</span>
                            #@@#@@@@#@@@#@@@@@  
                        </div>
                        <span className="preserve-wspace calendar-day"> 4</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div className={day === 3 ? `d3 calendar-day3 calendar-verycomplete`: `calendar-day3 calendar-verycomplete`}
                        onClick={ (e) => { setDay(3) } }
                    >
                        <div>
                            @
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g4">@#</span>
                            <span className="preserve-wspace calendar-color-g2">@@</span>
                            <span className="preserve-wspace calendar-color-g4">@</span>
                            <span className="preserve-wspace calendar-color-g3">@</span>
                            <span className="preserve-wspace calendar-color-g0">#</span>
                            <span className="preserve-wspace calendar-color-s">_/</span>
                            <span className="preserve-wspace calendar-color-u"> ~   ~  </span>
                            <span className="preserve-wspace calendar-color-s">\ ' '. '.'.</span>
                            <span className="preserve-wspace calendar-color-g1">@</span>
                            <span className="preserve-wspace calendar-color-g0">@</span>
                            #@@@@@@#@#@@@@@#@  
                        </div>
                        <span className="preserve-wspace calendar-day"> 3</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div 
                        className={day === 2 ? `d2 calendar-day2 calendar-verycomplete`: `calendar-day2 calendar-verycomplete`}
                        onClick={ (e) => { setDay(2) } }>
                        <div>
                            <span className="preserve-wspace calendar-color-s">-~------'</span>
                            <span className="preserve-wspace calendar-color-u">    ~    ~ </span>
                            <span className="preserve-wspace calendar-color-s">'--~-----~-~----___________--</span> 
                        </div>
                        <span className="preserve-wspace calendar-day"> 2</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
                    <div
                        className={day === 1 ? `d1 calendar-day1 calendar-verycomplete`: `calendar-day1 calendar-verycomplete`}
                        onClick={ (e) => { setDay(1) } }
                    >
                        <div>
                            <span className="preserve-wspace calendar-color-u">  ~    ~  ~      ~     ~ ~   ~     ~  ~  ~   ~   </span>  
                        </div>
                        <span className="preserve-wspace calendar-day"> 1</span>
                        <div>
                            <span className="preserve-wspace calendar-mark-complete">*</span>
                            <span className="preserve-wspace calendar-mark-verycomplete">*</span>
                        </div>
                    </div>
            </div>
    )
}

export default Questions;