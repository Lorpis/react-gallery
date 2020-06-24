import num from './num.js'
//A collection of functions that manipulate game objects


const translate = {
	//object is a list of svg points to manipulate, angle in rads
	rotate: (object, angle) => {
		const tm = [[num.roundTo(Math.cos(angle), 1000),num.roundTo(Math.cos((Math.PI/2)+angle), 1000)],
					 	[num.roundTo(Math.sin(angle), 1000), num.roundTo(Math.sin((Math.PI/2)+angle), 1000)]];
		return object.map((point) => {
			let x = point[0]*tm[0][0] + point[1]*tm[0][1];
			let y = point[0]*tm[1][0] + point[1]*tm[1][1];
			return [x,y]
		})
	},//rotate
	offSet:(object, pos)=>{
		var poss = [pos.x, pos.y]
		var newOb = []
		var newP = []
		for(var p = 0; p < object.length; p++){
			for(var ax = 0; ax < object[p].length; ax++){
				newP[ax] = object[p][ax]+poss[ax];	
			}//ax
			newOb[p] = Object.assign([],newP)	
		}//p
		return newOb;
	},//offset
	scale:(m, s) => {
		var m2 = [];
		for(var i = 0; i < m.length; i++){
			m2[i] = [];
			for(var j = 0; j < m[i].length; j++){
				
				m2[i][j] = m[i][j]*s
			};//for j
		};//for i
		return m2
	},//scale
	angle2p:(p1,p2)=>{
		return num.roundTo(Math.atan2(p2[1] - p1[1], p2[0] - p1[0]), 100);
	}
}//translate

export default translate;