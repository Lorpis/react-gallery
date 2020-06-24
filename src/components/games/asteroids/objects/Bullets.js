import React from 'react';
import trans from '../functions/translate.js';

class Bullet{
	constructor(pos, angle, vec){
		this.pos = pos;
		this.rad = 5;
		this.color = 'red'
		this.angle = angle;
		this.rect = {w:8, h:2};
		this.spd = 5;
		this.col = false;

		this.vec = {
			x:((Math.cos(this.angle))*this.spd)+vec.x, 
			y:((Math.sin(this.angle))*this.spd)+vec.y
		}//vec
		this.polyN = [[0,0],[8,0]];
		this.poly = trans.offSet(trans.rotate(this.polyN, this.angle), this.pos);
	}//constructor
	upDate(){ 
	this.pos =  {x:this.pos.x + this.vec.x, y:this.pos.y + this.vec.y };
	this.poly = trans.offSet(trans.rotate(this.polyN, this.angle), this.pos);
	}//upDate
	svg(key){
		return(
			<polygon key = {key} points= {
				`${this.poly[0][0]}, ${this.poly[0][1]} 
				${this.poly[1][0]}, ${this.poly[1][1]}`}
				stroke="red" strokeWidth="2"
			/>	
		)//return
	}//svg
};//bullets

export default Bullet;