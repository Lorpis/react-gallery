
import React from 'react';
import './fracGen.css';

const pallet = (iterations, max) =>{
	let cs = iterations/max;
	let red = Math.floor((Math.sin(360*cs)*255) + 127.5);
	let green = Math.floor((Math.sin((360*cs) + 120)*255) + 127.5);
	let blue = Math.floor((Math.sin((360*cs) + 240)*255) + 127.5);
	return [red,green,blue,255]
}

const iterate = (pos, vp, wv) => {
	let xO = ((pos.x-vp.xC)/wv.scale)+wv.x;
	let yO = ((pos.y-vp.yC)/wv.scale)+wv.y;
	var x = 0.0;
    var y = 0.0;
    var iteration = 0;
    let max_iteration = 200;
	while ((x*x + y*y <= 4) && (iteration < max_iteration)){
        var xx = x*x - y*y + xO;
        y = 2*x*y + yO;
        x = xx;
        iteration ++;
 	}
    return pallet(iteration, max_iteration);
}

class Mandelbrot extends React.Component{
	constructor(props){
		super(props);
		this.setContext = this.setContext.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.state = {push:true}
	}//constructor

	setContext(ref) {
		var wv = this.props.worldView;
		let vp = this.props.viewPort;
   		this.ctx = ref.getContext("2d");
		const imgData = this.ctx.createImageData(vp.x, vp.y);
		console.log(imgData );
		let t0 = performance.now();
	    var c = 0;
		for(var i=0; i < vp.y; i++){
			for(var j = 0; j< vp.x; j++){
				let pxl = iterate({x:j,y:i},vp,wv);			
				imgData.data[c+0] = pxl[0];
				imgData.data[c+1] = pxl[1];
				imgData.data[c+2] = pxl[2];
				imgData.data[c+3] = pxl[3];
				c+=4;
			}
		}			
		let t1 = performance.now();
		this.ctx.putImageData(imgData,0,0)
		console.log("rendertime " + (t1 - t0) + " milliseconds.");			
  	}//setContext

	handleClick(e){	
		this.setContext(document.getElementById('canvas'));
		let push =  this.state.push === true ? false:true;
		this.setState({push})
	}

    render() {
	    return(
	    	<div >
		        <canvas
		        	onClick = {this.handleClick}
			        id = 'canvas'
			        className = 'viewPort'
			        width = {this.props.viewPort.x}
			        height = {this.props.viewPort.y}
			        ref={this.setContext}
		       	/>
	        </div>
	    )//return
	}//render
};//mandel

export default  Mandelbrot;
