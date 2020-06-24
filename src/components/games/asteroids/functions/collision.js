import React from 'react';
import num from './num.js';


const collision = {

	dis:(ob1, ob2) => {
		let p1 = ob1.pos;
		let p2 = ob2.pos;
		return num.roundTo(Math.sqrt(Math.pow(p1.x - p2.x, 2)+(Math.pow(p1.y - p2.y,2))), .1)
	},//dis
	scan:(items, col) =>{
		for(var i = 0; i < items.length; i++){
			for(var j = 0; j < col.length; j++){
				let dis = collision.dis(items[i], col[j]);
				if(dis < col[j].rad){ 
					items[i].col = true;
					col[j].col = true;					
				}//if
			}//j
		}//i
	}//scan

}//collision
export default collision