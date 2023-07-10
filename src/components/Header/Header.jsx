import React from "react";
import "./header.css"

const Header = ({title}) => {
	return (
		<div className="challenge-title">
            <p>
				{title}
            </p>
		</div>
	);
}

export default Header;