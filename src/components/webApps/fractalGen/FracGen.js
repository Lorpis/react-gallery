import React from 'react';
import './fracGen.css';
import Mandelbrot from './Mandelbrot.js';
import { WebView } from 'react';


class FracGen extends React.Component{
	constructor(props){
		super(props);
		this.imageData = null;
		this.handleClick = this.handleClick.bind(this);
		this.state = {
			worldView:{x:0,y:0, scale:300},
			viewPort:{y:800,x:1000,yC:400,xC:500}

		}
	}//constructor

	handleClick(e){	
		let wv = this.state.worldView;
		let vp = this.state.viewPort;
		let x =wv.x + (e.nativeEvent.offsetX - vp.xC)/wv.scale;
		let y =wv.y + (e.nativeEvent.offsetY - vp.yC)/wv.scale;
		let scale = wv.scale*2;
		let worldView = 	{x,y,scale};
		this.setState({worldView});
	}//handleClick

	render() {
		return(
			<div >
				<Mandelbrot 
					className = 'viewPort'
					onClick = {this.handleClick}
					viewPort = {this.state.viewPort}
					worldView ={this.state.worldView}
					width = {this.state.viewPort.x}
					height = {this.state.viewPort.y}
				/>
			</div>
		)//return
	}//render
};//mandel
export default FracGen



