import React from 'react';
import  './voltageDropStyles.css';

////////////////////////////notes///////////////////////////////////
//input feild that only accepts numbers  to a given decimal place
/*props are	:
		decplace = 100 will round yeild 0.00, default is int
		unit = unit you want displayed next to the field
		inputValue = the input value you want to feed it
		onValueChange = parent listener
		returns ==> the number as a number
		*/

const scanStrFor = (item, inString) => {
	//return number of ocurrances
	var counter = 0;
	for (var i = 0;  i < inString.length; i++){
		if (inString.charAt(i) === item) {counter++}
	}
	return counter
}

const isNumberKey = (number, decPlace) => {
	//input  number string or float, returns number rounded to 3
	let str = String(number);
	if ( str.charAt(str.length -1) === '.'  &&  !(str.indexOf('.') < str.length-1)) { return str} 
	else  if ( str.charAt(str.length -1) === '0' &&  scanStrFor('.' , str) === 1) {return str}
	else {	
		const input = parseFloat(number);
		if(input === 0){return 0}
		if(Number.isNaN(input)){return ' '}
		else {return Math.round(input*1000)/1000}	
		}
}


class NumInput extends React.Component{

	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.decPlace =this.props.decplace;
	}

	handleChange(event){
		let decPlace = this.props.decplace ? this.props.decplace:1;
		let number =isNumberKey(event.target.value, decPlace)
    	this.props.onValueChange(number);
	};

	render(){
		const fieldValue = this.props.inputValue
		const unit = this.props.unit;
		return (
			<fieldset >
				<div style = {{display: 'flex'}}>
					<input style = {{width: '5em', height: '1em'}}
						value = {fieldValue}
						onChange = {this.handleChange}/>
					{unit}
				</div>				
			</fieldset>
		);
	}
}

export default NumInput ;