import React from 'react';


const toyM1 = [[1,2,3,4,5],
						 [1,2,3,4,5],
						 [1,2,3,4,5],
						 [1,2,3,4,5],
						 [1,2,3,4,5]];

const toyM2 = [[6,7,8,9,10],
						  [6,7,8,9,10],
						  [6,7,8,9,10],
						  [6,7,8,9,10],
						  [6,7,8,9,10]];

const	ad = (m1, m2) =>  {
//	if(Array.isArray(m1)&&Array.isArray(m2)){
		if((m1.length === m2.length)&&(m1[0].length === m2[0].length)){
			var m3 = [];
			for(var i = 0; i < m1.length; i++){
				m3[i] = [];
				for(var j = 0; j < m1[i].length; j++){
					m3[i][j] = m1[i][j] + m2[i][j]
				};//for j
			};//for i
			return Object.seal(Object.assign([],m3))
		} else {console.error("[A]ij != [B]ij")}//if_2
	//} else{
	//	var warn = 'Following are not Array data type: ';
	//	if(!Array.isArray(m1)){warn += 'M1 '};
	//	if(!Array.isArray(m2)){warn += 'M2'};
	//	console.log(warn)
//	}//if_1
};//add



const  matrixInit = (row,column) =>{
	//Creates an matrix m x n  and seals its size.
	var m = [];
	for(var i = 0;  i < row ; i++){
		m[i] = [];
		for(var j = 0; j< column; j++ ){			
			m[i][j] = 0;
		};//j
	};//i
	return Object.seal(m)
};//matrixInit




class Matrix{
	constructor(mArray){
		if(!Array.isArray(mArray)){throw new Error("Not a matrix: must be an Array data type")};
		
		for(var i = 0; i < mArray.length; i++){
			if(i>0){if(mArray[i].length !== mArray[i-1].length) {
			throw new Error("Not a matrix: all rows must be the same size")}};
			if(!Array.isArray(mArray[i])){throw new Error("Not a matrix: must be Array(s) within an Array")};
			for(var j = 0; j < mArray[i].length; j++){
				if(typeof(mArray[i][j]) !== "number"){throw new Error("Not a matrix: must contain all numbers")}
			}
		};

		this.ij = Object.seal(Object.assign([],mArray));
		this.i = this.ij.length;
		this.j = this.ij[0].length
	};//constructor
	equalTo(m){
		if(!(m instanceof Matrix)){throw new Error("Matrix operations must be done with Martix instances")};
		if((this.i !== m.i)||(this.j!==m.j)){return false};
		for(var i = 0; i < this.i; i++){
			for(var j = 0; j < this.j; j++){
				if(this.ij[i][j] !== m.ij[i][j]){return false}
			}
		};
		return true
	};//equalTo
	add(m){
		if(!(m instanceof Matrix)){throw new Error("Matrix operations must be done with Martix instances")};
		if((this.i !== m.i)||(this.j!==m.j)){throw new Error("Only matrices of equal dimentions can be added")};
		var m2 = [];
		for(var i = 0; i < this.i; i++){
			m2[i] = [];
			for(var j = 0; j < this.j; j++){
				m2[i][j] = this.ij[i][j] + m.ij[i][j]
			};//for j
		};//for i
		return new Matrix(m2);
	};//add
	subtract(m){
		if(!(m instanceof Matrix)){throw new Error("Matrix operations must be done with Martix instances")};
		if((this.i !== m.i)||(this.j!==m.j)){throw new Error("Only matrices of equal dimentions can be subtracted")};
		var m2 = [];
		for(var i = 0; i < this.i; i++){
			m2[i] = [];
			for(var j = 0; j < this.j; j++){
				m2[i][j] = this.ij[i][j] - m.ij[i][j]
			};//for j
		};//for i
		return new Matrix(m2);		
	};//subtract
	scale(n){
		if(typeof(n) !== "number"){throw new Error(`${typeof(n)} data type is not a valid scaler`)};
		var m2 = [];
		for(var i = 0; i < this.i; i++){
			m2[i] = [];
			for(var j = 0; j < this.j; j++){
				m2[i][j] = this.ij[i][j]*n
			};//for j
		};//for i
		return new Matrix(m2)
	};//scale

	product(m){
		if(!(m instanceof Matrix)){throw new Error("Matrix operations must be done with Martix instances")};
		if(this.j !== m.i){throw new Error("MatrixA rows must be the same size as matrixB columns")};
		var m2 = [];
		for(var Ai = 0; Ai < this.i; Ai++){
			m2[Ai] = [];
			for(var Bj = 0; Bj < m.j; Bj++){
				var total = 0;
				for(var Bi = 0; Bi < m.i; Bi++){
					total += this.ij[Ai][Bi] * m.ij[Bi][Bj]
				}//Bi
				m2[Ai][Bj] = total
			}//Bj
		}//Ai
		return new Matrix(m2)
	};//product
	powerOf(exp){
		var m2 = [];
		for(var i = 0; i , this.i; i++){
			for(var j = 0; j<this.j;j++){

			}//j
		}//i


	}//square
	transpose(){
		var m2 = []
		for(var j = 0; j < this.j; j++){
			m2[j] = [];
			for(var i = 0; i < this.i; i++){
				m2[j][i] = this.ij[i][j];
			}//i
		}//j
		this.ij = m2;
		this.i = this.ij.length;
		this.j = this.ij[0].length;
	}//transpose
	product3D(m){
		if(!(m instanceof Matrix)){throw new Error("Matrix operations must be done with Martix instances")};
		if(this.j !== m.i){throw new Error("MatrixA rows must be the same size as matrixB columns")};
		var m2 = [];
		for(var Ai = 0; Ai < this.i; Ai++){
			m2[Ai] = [];
			for(var Bj = 0; Bj < m.j; Bj++){
				var total = 0;
				for(var Bi = 0; Bi < m.i; Bi++){
					total += this.ij[Ai][Bi] * m.ij[Bi][Bj]
				}//Bi
				m2[Ai][Bj] = total
			}//Bj
		}//Ai
		for(var i = 0;i<m2.length;i++){
			if(m2[i][3] !== 0){ m2[i][0] = m2[i][0]/m2[i][3]; m2[i][1] = m2[i][1]/m2[i][3]}
		}
		return new Matrix(m2)}

};//Matrix



export default Matrix;

