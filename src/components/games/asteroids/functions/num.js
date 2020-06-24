import React from 'react';

const numbers = {
	roundTo:(num, place)=>{return Math.round(num*place)/place},//roundto
	randRange:(min, max) => {
  		return Math.floor(Math.random() * (max - min + 1) ) + min;
	},//randRange
	coinToss:() => {if(Math.random() >= .5){return 1} else{return -1}}
}//numbers


export default numbers;