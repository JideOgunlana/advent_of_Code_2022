import React from "react";


const Card = ({ isActive, testFile, setTestFile, handleActiveCard, openModal, fileId, buttonIcon, buttonText, fileContent }) => {
	const handleClick = () => {
	  setTestFile(fileId);
	  handleActiveCard(fileId);
	};
  
	const handleModalOpen = () => {
	  openModal(`modal${fileId}`);
	};
  
	return (
	  <div className={`card ${isActive && testFile === fileId ? 'card-active' : ''}`} id={fileId} onClick={handleClick}>
		<div className="card-button">
		  <button onClick={handleModalOpen}>
			{buttonIcon} {buttonText}
		  </button>
		</div>
		<pre>{fileContent}</pre>
	  </div>
	);
  };

  export default Card;