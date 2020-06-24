import React from 'react';
import './fracGen.css';

const viewPort = {
	y:800,
	x:1000
};

const worldView = {
	center:{x:-.5,y:0},
	scale:250,
}


const pallett = (iterations, max) =>{
	let cs = iterations/max;
	let red = Math.floor((Math.sin(360*cs)*255) + 127.5);
	let green = Math.floor((Math.sin((360*cs) + 120)*255) + 127.5);
	let blue = Math.floor((Math.sin((360*cs) + 240)*255) + 127.5);
	return `rgb(${red}, ${green}, ${blue})`
}

const iterat = (posX,posY,preX,preY) => {
	/*let xO = ((posX-(viewPort.x/2))/worldView.scale)+worldView.center.x;
	let yO = (((viewPort.y/2)-posY)/worldView.scale)+worldView.center.y;*/
	let xO = (posX/worldView.scale) + preX;
	let yO = preY - (posY/worldView.scale);
	var x = 0.0;
    var y = 0.0;
    var iteration = 0;
    let max_iteration = 1000;
	while ((x*x + y*y <= 4) && (iteration < max_iteration)){
        var xtemp = x*x - y*y + xO;
        y = 2*x*y + yO;
        x = xtemp;
        iteration ++;
 	}
    return pallett(iteration, max_iteration);
}



class FracGen extends React.Component {  
	componentDidMount() {
		var t0 = performance.now();
	    const canvas = this.refs.canvas;
	    const ctx = canvas.getContext("2d");
		//re-aranged view scale and position from itertion to reduce instructions
	    //((posX-(viewPort.x/2))/worldView.scale)+worldView.center.x; =>
	    //xO = (posX/scale) + ((center*scale) - (vp/2))/scale
	    //yO = ((vp/2)+(center*scale))/scale - (posY/scale)
	    let preX = ((worldView.center.x*worldView.scale)-(viewPort.x/2))/worldView.scale;
	    let preY = ((viewPort.x/2)+(worldView.center.x*worldView.scale))/worldView.scale;
		for(var i=0; i < viewPort.y;i++){
			for(var j = 0; j<viewPort.x;j++){
				ctx.fillStyle = iterat(j,i,preX, preY);
				ctx.fillRect(j, i, 1, 1);
			}
		}
		var t1 = performance.now();
		ctx.font = "30px Arial";
		ctx.fillStyle = 'black';
		ctx.fillText("rendertime " + (t1 - t0) + " milliseconds.", 10, 50);
	}	
	

    render() {
    return(
      <div >
        <canvas
        	className = 'viewPort'
        	ref="canvas" 
        	width={viewPort.x} 
        	height={viewPort.y} 
        	/>
        
      </div>
    )
  }
}export default FracGen 



