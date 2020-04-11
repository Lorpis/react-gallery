import React from 'react';
import DelVoltageDrop from './DelmarVoltageDrop.js';
import CECvoltageDrop from './CECvoltageDrop';

class VoltageDropMain extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return(

			<div>
				<DelVoltageDrop/>
				<CECvoltageDrop/>

			</div>)
	}
}

export default VoltageDropMain;