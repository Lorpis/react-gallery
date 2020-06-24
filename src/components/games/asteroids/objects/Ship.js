import React from 'react';
import trans from '../functions/translate.js';
import Bullet from './Bullets.js';



const hitAngles = (polyN) => {
	let scale = trans.scale(polyN, 1.1);
	let l = scale.length - 1;
	var h = [];
	
	h[0] = [trans.angle2p(scale[0],scale[l]), 
				trans.angle2p(scale[0],  scale[1])];
	h[l] = [trans.angle2p(scale[l-1],scale[l]), 
			  trans.angle2p(scale[l],  scale[0])];
	

	for(var i = 2; i < l; i++){
		h[i] = [trans.angle2p(scale[i-2],scale[i-1]), 
				  trans.angle2p(scale[i-1],  scale[i])]	
	}//for
	
	return h;
}//hitAngles

class Ship {
	constructor(pos, angle){
		this.pos = pos;
		this.angle = angle;
		this.rect = {w:20, h:20};
		this.acc = 0.5;
		this.vec = {x:0, y:0};
		this.polyN = [[10,0], [-10,10], [-2.36,0], [-10,-10]];
		this.hitAnglesN = hitAngles(this.polyN);
		this.poly = trans.offSet(this.polyN,this.pos);
		this.col = false;
	}//constructor
	upDate(){ 
		this.pos =  {x:this.pos.x + this.vec.x, y:this.pos.y + this.vec.y };
		this.poly = trans.offSet(trans.rotate(this.polyN, this.angle), this.pos);
	}//tick
	thrust(){
		this.vec = {x:this.vec.x + Math.cos(this.angle)*this.acc, y:this.vec.y + Math.sin(this.angle)*this.acc}
	}//

	hitBox(){
	}

	shot(){
		return new Bullet(this.pos, this.angle, this.vec);
	}

	svg(){
		return(
			<svg>
			<polygon points= {
				`${this.poly[0][0]}, ${this.poly[0][1]} 
				${this.poly[1][0]}, ${this.poly[1][1]}
				${this.poly[2][0]}, ${this.poly[2][1]}
				${this.poly[3][0]}, ${this.poly[3][1]}`}
				stroke="purple" strokeWidth="2" fill = "none"
			/>
			<line x1= {this.poly[1][0]} y1={this.poly[1][1]} x2={this.poly[2][0]} y2={this.poly[2][1]} stroke="green" strokeWidth="2" />

			</svg>
		)//return
	}//svg
};//Ship

export default Ship;