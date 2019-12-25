import React from 'react';
import './headerStyles.css';

const Header = () => {
	let title = "= (Lorp.React.Project_Gallery) => {...";
	let ReactIcon = require('./images/react.png');
	return(
		<div className = 'flexContainer'>
			<img alt = "loading" className = 'reactIcon' src = {ReactIcon}></img>
			<h1 className = 'header'> {title} </h1>
		</div>
		);
}

export default Header;