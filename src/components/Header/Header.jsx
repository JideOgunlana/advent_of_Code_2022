import React from "react";

const Header = ({title}) => {
	return (
		<div>
			<h3>
                Advent of Code<br/>&lt;y&gt;2022&lt;/y&gt;
            </h3>
            <p>
				{title}
            </p>
		</div>
	);
}

export default Header;