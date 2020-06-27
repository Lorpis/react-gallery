    import React from 'react';
    
    const pallet = (iterations, max) =>{
        let cs = iterations/max;
        let red = Math.floor((Math.sin(360*cs)*255) + 127.5);
        let green = Math.floor((Math.sin((360*cs) + 120)*255) + 127.5);
        let blue = Math.floor((Math.sin((360*cs) + 240)*255) + 127.5);
        return [red,green,blue,255]
    }
    
    const iterat = (pos, vp, wv) => {
        let xO = ((pos.x-(vp.xC))/wv.scale)+wv.x;
        let yO = ((pos.y - (vp.yC))/wv.scale)+wv.y;
        var x = 0.0;
        var y = 0.0;
        var iteration = 0;
        let max_iteration = 300;
        while ((x*x + y*y <= 4) && (iteration < max_iteration)){
            var xtemp = x*x - y*y + xO;
            y = 2*x*y + yO;
            x = xtemp;
            iteration ++;
        };
        return pallet(iteration, max_iteration);
    }; 
    
    class Mandelbrot extends React.Component{
        constructor(props){
            super(props);
            this.imageData = null;
            this.worldView = {x:0,y:0, scale:300};
            this.setContext = this.setContext.bind(this);
            this.handleClick = this.handleClick.bind(this);
            this.state = {viewPort:{y:800,x:1000,yC:400,xC:500}}
        }//constructor
    
        setContext(r) {
        	if(r != null){
            var wv = this.worldView;
            let vp = this.state.viewPort;
            this.ctx = r.getContext("2d");



       
            const imgData = this.ctx.createImageData(vp.x, vp.y);
            console.log(imgData);
            let t0 = performance.now();
            var c = 0;
            for(var i=0; i < vp.y; i++){
                for(var j = 0; j< vp.x; j++){
                    let pxl = iterat({x:j,y:i},vp,wv);          
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
            }    
    
        }//setContext
    
        
    
        handleClick(e){ 
            var wv = this.worldView;
            let vp = this.state.viewPort;
            var x =wv.x + (e.nativeEvent.offsetX - vp.xC)/wv.scale;
            var y =wv.y + (e.nativeEvent.offsetY - vp.yC)/wv.scale;
            var scale = wv.scale*2; 
            this.worldView = {x,y,scale}
            this.setContext(document.getElementById('canvas'))
            //for when instructions are in this.setContext


/*
            const imgData = this.ctx.createImageData(vp.x, vp.y);
            console.log(imgData );
            let t0 = performance.now();
            var c = 0;
            for(var i=0; i < vp.y; i++){
                for(var j = 0; j< vp.x; j++){
                    let pxl = iterat({x:j,y:i},vp,wv);          
                    imgData.data[c+0] = pxl[0];
                    imgData.data[c+1] = pxl[1];
                    imgData.data[c+2] = pxl[2];
                    imgData.data[c+3] = pxl[3];
                    c+=4;
                }
            }
            let t1 = performance.now();
            this.ctx.putImageData(imgData,0,0)
            console.log("rendertime " + (t1 - t0) + " milliseconds.");*/
        }//handleClick




    
        render() {
            
    
        return(
            <div >
                <canvas 
                    onClick = {this.handleClick}
                    id = 'canvas'
                    className = 'viewPort'
                    width = {this.state.viewPort.x}
                    height = {this.state.viewPort.y}
                    ref={this.setContext}
                />
            </div>
            )//return
        }//render
    };//mandel
    export default Mandelbrot
