import React from 'react';
import  './grid.css';


const Devices = () => {
	return( <div className = 'device'> device</div> )
}




class Grid extends React.Component{
	constructor(props){
		super(props);
		this.state = {something:null};

		this.dag = this.drag.bind(this);
		this.drop = this.drop.bind(this);
		this.select = this.select.bind(this);

	}//con

	drag(event){

		//todo pick up item from catalog

	}
	drop(event){

	}
	select(event){

	}

	//todo click event will grab and drop items, select items for options



	render(){
		let device = Devices()

		return(
			<div className = 'displayLayout'>
				<div className = 'gridHeader'>Some Heading</div>
				<div 
					className = 'body'
					onMouseDown = {this.drag}
					onMouseDown = {this.drop} 
					onDblClick = {this.select}> 

					<div className = 'itemsCatalogue'>
						{device}
					</div>
					<div className = 'feild-flex-container'>
						<div className = 'distribution'>building Type, item2, item3, item4</div>
						<div className = 'gridBox'> place items here</div>
					</div>
				<div className = 'selection'> selected item options</div>
			</div>
			</div>
			);
	}//render
}//class

export default Grid;