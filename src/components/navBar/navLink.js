import React from 'react';
import MainTabs from './MainTabs';
import Styles from'./tabStyles.css';






function navLink(props) {
	
  	return(
    	 <div  id = {props.id} className = {props. className} onClick={props.onClick}> {props.text}</div>
    );
};

export default navLink;




/*
class BoxButtion extends React.Component {
	constructor(props){
		super(props);
		this.state = {selected:false}
	}


	render(){
		return(
			<div >props.name</div>
			)
	}
}
*/