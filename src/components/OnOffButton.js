import React from 'react';
//React programs extend the reactDom

class Toggle extends React.Component {
	constructor(props) {
		//super allows own object manipulation
		super(props);
		//create toggle state and set default to on
		this.state = {isToggleOn: true};

		//binding 'this' for callback to work
		//Class methods are not auto bound
		//neded for function calls without ()
		this.handleClick = this.handleClick.bind(this);
		//this can be worked around with sytax.
		}// con end

	//handleClick = () => {} to bind "this"
	//caution: this is experimental
	//other option in render =>
  	handleClick() {
  		//changing state forces update
    	this.setState(state => ({
     	 isToggleOn: !state.isToggleOn
    	}));
 	 }




	render() {
		return (
			//using arrow sytex on call ensures this get bound
			//{(e) =>this.handleClick(e)}
			//produces new callback every time
			//may reduse proformance if passed to children
			  <button onClick={this.handleClick}>
   				 {this.state.isToggleOn ? 'ON' : 'OFF'}
			  </button>
		);//return end
	}//render end
}//class end

export default Toggle;