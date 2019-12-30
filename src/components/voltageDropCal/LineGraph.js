import React from 'react';
import  './voltageDropStyles.css';


/*make a bar  and with up to 4 limits overlaped
	props are:
					legendTitle = 'html title'
					lengthScale = unit mesure on bar
					totalLength = display length limit
					section1 = {toLengthFromPVD(k, phase, amps, volts, ft, biggerCM, 3,disScale)}
					section2 = {toLengthFromPVD(k, phase, amps, volts, ft, biggerCM, 5,disScale)}
					section3 = {toLengthFromPVD(k, phase, amps, volts, ft, biggerCM, 100,disScale)}
*/
const makePercent = (item, outOf)  =>{ 
	return  String(Math.round(100*item/outOf)) + '%'
}

const barList = (props) => {
	let lengths = [props.section1, props.section2, props.section3, -1];
	let classNames = ['section1','section2', 'section3', 'section4'];
	let totalLength = props.totalLength ? props.totalLength*1.25: 100;
	var barlist = []
	var usedUp = 0;
	var percent;
	for (var i = 0; i < lengths.length; i++){
		let length = lengths[i] <= 0 ? 'No Voltage':lengths[i];
		let last = i > 0 ? lengths[i-1]: 0 
		let sectionLength = length - last;
		if ((sectionLength + usedUp) < totalLength){
			usedUp += sectionLength;
			percent = makePercent(sectionLength, totalLength);
			barlist[i] = {className:classNames[i], percent:percent, length:length}
		} else  if (totalLength > usedUp) { 
			sectionLength = totalLength - usedUp
			usedUp = totalLength
			percent = makePercent(sectionLength, totalLength)
			barlist[i] = {className:classNames[i], percent:percent, length:length}
		} else if (usedUp  >=  totalLength  ){
			percent = makePercent(sectionLength, totalLength)
			barlist[i] = {className:classNames[i], percent:'0%', length:length}}
		
	}
	return barlist
}


const LimitBarEl = (props) => {
	var key = 0;
	let limitMap = props.barList.map((bar) =>
		<div 
		key = {`barEl${key++}`} 
		className = {bar['className']}
		style = {{width: `${bar['percent']}`}}> 
		{bar['length']} {props['lengthScale']}
		</div>
		)
		return (
			<div className = 'distanceMeter'>
				{limitMap}
			</div>		
		)}	


class LineGraph extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(){}


	render(){ 
		const lengthScale = this.props.lengthScale;

		var barlist = barList(this.props)
		return(
			<div className = 'liniarGragh' style = {{ display: 'flex', flexDirection: 'column', height: "1em"}}>
				<div sclassName = 'liniarTitle' style = {{	backgroundColor: 'yellow',
				background: 'linearGradient(90deg, rgba(6,180,244,0.6640952845982142) 80%, rgba(9,118,121,1) 80%, rgba(0,2,36,1) 100%)'}}






				>{this.props.legendTitle}</div>
				<LimitBarEl
					barList = {barlist}
					lengthScale = {lengthScale}/>


					
			</div>
			);
	}
}



export default LineGraph