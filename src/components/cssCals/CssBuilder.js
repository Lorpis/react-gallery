import React from 'react';
import ColorMixer from './cssTools/ColorMixer';






class CssBuilder extends React.Component {
	constructor (){
		super();
		this.state = {some:1}
		};



		render(){
			return(
				<div><ColorMixer/></div>)
		}
}

export default CssBuilder;