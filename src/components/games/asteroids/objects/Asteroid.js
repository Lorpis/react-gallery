import React from 'react';
import trans from '../functions/translate.js';
import num from '../functions/num.js';


const randomPoly = (size) => {
	var points = [];
	var angle  = 0;
	while(angle <= Math.PI*2){		
		angle += Math.random((Math.Pi*2)-Math.Pi*1.75);
		if(angle > Math.PI*2){break;}
		var hyp = num.randRange(size-3, size+3);
		points.push([Math.cos(angle)*hyp, Math.sin(angle)*hyp]);		
	};
	return points
}

const randomVec = (speed) =>{
	return {x:Math.random()*speed*num.coinToss(), y:Math.random()*speed*num.coinToss()}
}

const randomPos = () =>{
	return {x:Math.random()*800, y:Math.random()*300}
}

const svgPoly = (poly) =>{
}
class Asteroid{
	constructor(radomPos, angle, vec){
		this.pos = randomPos();
		this.rad = 40;
		this.color = 'green';
		this.angle = 0;
		this.rotSpd = (Math.random()*Math.PI/20)*num.coinToss();
		this.rect = {w:8, h:2};
		this.vec = randomVec(.01);
		this.polyN = randomPoly(this.rad);
		this.poly = trans.offSet(trans.rotate(this.polyN, this.angle), this.pos);
		this.col = false;
	}//constructor
	upDate(){ 
	this.pos =  {x:this.pos.x + this.vec.x, y:this.pos.y + this.vec.y };
	this.angle +=  this.rotSpd;
	this.poly = trans.offSet(trans.rotate(this.polyN, this.angle), this.pos);
	}//upDate
	svg(key){
		let poly = this.poly.map((point) => point.toString()).join(' ');
		return(
			<polygon key = {key} points= {poly}
				stroke="green" strokeWidth="2" fill = "none"
			/>	
		)//return
	}//svg
};//bullets

export default Asteroid;