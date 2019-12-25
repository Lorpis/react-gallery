import React from 'react';
import './clockStyles.css'

class Clock extends React.Component {
	constructor(props) {
		super(props)
		//state is bound to Clock's prototype
		//new date object is applied to state
		//date called  on life cycle start by render =>
		/*Always use set state to change state*/
		/*NEVER state.date = new Date()*/
			this.state = {date: new Date()};
	}

	componentDidMount() {
		//built in JS function >> setInterval(function,miliseconds)
		//once render complete, we ask the brouser to start the timer
		//once the timer ends, the browser runs the tick function =>
		this.timerID = setInterval(
			() => this.tick(),
			1000
			);
	}

	componentWillUnmount() {
		//this sets up the next hook cycle by reseting the timer
		//rinse and reapeat every second
		clearInterval(this.timerID);
	}

	tick() {
		//the tick changes the state.
		//this updates the react component in the ReactDom
		//then runs functions in willmount =>
		/*Always use "setState()"" to change state*/
		/*NEVER state.date = new Date()*/
		/*"this.setState" can only ever  be used in the constructor*/
		this.setState({
			//Use embeded function if calculations are made with setState
			date: new Date()
		});
	}

	render(){
		//the date object in state produces the data/time
		//Date.__proto__.toLocaleTimeString() formats it
		//"this" is needed because it is bound to this object's prototype
		// once rendered, this object is mounted =>
		return (
			<div>
				{this.state.date.toLocaleTimeString()}
			</div>
		);
	}
}

export default Clock;