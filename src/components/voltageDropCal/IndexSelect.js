import React from 'react';
import  './voltageDropStyles.css';
////////////////////////notes//////////////////////////////////////
/*creates a pulldown select that displays a list of values but returns the index number.
	props:
		scale = a string that displays next to the select(also used for key)
		items = a [list] of values
		onSelect = parent event handler
	returns ===> the index number of the given list

	this was made so select could set another with paraleled lists within the parent class
*/

const MenuList = (props) => {
	let index = 0;
	let listItem = props.list.map((item)=>
		<option key = {index}  value = {index++}> {item} </option>
		);
	return (
		<select
				onChange = {props.onChange}>
				{listItem}
		</select>
		);
}

/*************classs******************************/
class IndexSelect extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	
	}

	handleChange(event){
		this.props.onSelect(event.target.value);
		console.log(event.target.value);
	}
	handleClick(){
		this.props.onClick(this.props.scale)
	}

	render(){

		const scale = this.props.scale
		const items = this.props.items

		return(
			<fieldset>
			<MenuList  
				list = {items}
				onChange = {this.handleChange}
			/>{scale}
			</fieldset>
			);
	}
}
export default IndexSelect