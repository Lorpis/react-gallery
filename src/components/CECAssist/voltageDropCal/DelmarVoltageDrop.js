import React,   { useLayoutEffect, useState } from 'react';
import  NumInput from '../assets/NumInput';
import IndexSelect from '../assets/IndexSelect';
import LineGraph from './LineGraph'
import  './voltageDropStyles.css';
import unitTag from '../tables/unitTag.js';
import kValues from '../tables/kValues.js';
import wireSizes from '../tables/wireSizes.js';
import voltages from '../tables/voltages.js'




/********************Voltage Drop constants**********************/
/*variable for html display*/


const decplace  = 1000;//th   defaut decimal place

//pulldown list items

const phases = [1, 3];
const metals = Object.keys(kValues);

//CEC given standard wire sizes for pulldown
const gauges = wireSizes['gauges'];
const kcmils = wireSizes['kcmils'];


/**************voltage drop graphical display*********************************/


function useWindowSize() {
	const [size, setSize] = useState([0, 0]);
	useLayoutEffect(() => {
		function updateSize() {
			setSize([window.innerWidth, window.innerHeight]);
		}
	window.addEventListener('resize', updateSize);
	updateSize();
	return () => window.removeEventListener('resize', updateSize);
	}, []);
	return  size;
}

function ShowWindowDimensions(props) {
	const [width, height] = useWindowSize();
	return  <span>Window size: {width} x {height}</span>;
}




/********************Voltage Drop: root class***************************************/
/***********Voltage Drop functions************/

/*rough draft. to do => rearange algibracly with stae machine**/

const kCalc = (metal, temp) => {
	let kValue = kValues[metal]['k'];
	let tempCo = kValues[metal]['tempCo'];
	let output = kValue*(1 + (tempCo*(temp - 20)))
	return   Math.round(output * 1000) / 1000
}

const toPVDfromVD = (vd, volts) => {return (vd*100)/volts}
const toVDfromPVD =(pvd, volts) => {return (pvd/100)*volts}
const multiple = (phase) => {return phase === 3? Math.sqrt(3):2 }

const toLengthFromPVD = (k, phase, amps, volts, ft, cm, pvd, disScale)  => {
	let m = multiple(phase);
	let vd = (pvd*volts)/100
	let length =  (vd*cm)/(k*m*amps)
	length = Number.isNaN(length) ? length = 0: length;
	length = disScale === 'm' ? tryConvert(length, toMeters): length;
	return  Math.round(length*100)/100;
}

// general convertion
const tryConvert = (measure, convert, volts) => {
	const input = parseFloat(measure);
	if(Number.isNaN(input)){
		return ' '
		} else {
	const output = convert(input, volts);
	return Math.round(output * 1000) / 1000;
		}
}

//distance convertions
const toMeters = (feet) => { return feet / 3.281};
const toFeet = (meters)=> { return meters * 3.281};

//power/amps  convertions
const toAmps = (watts, volts) => {return watts/volts}
const toWatts = (amps, volts) => {return amps*volts};

//convert cm
const kcmToCm = (kcmils) =>{return kcmils*1000};
const cmToKcm = (cm) => {return cm/1000};

const getIndexNum = (item, list) => {
	for (var i=1; i < list.length; i++) {	
		if (item <= list[i]) {return i;}
	}
	return 1
};

const getIndexValue = (item, list)=>{
	for(var i = 1; i < list.length; i++){
		if(item <= list[i]) {return parseFloat(list[i]);}
	}
	return 0
};

const tryCalculate  = (convert, phase, k, amps, length, volts, cmils, vd) => {
	var output = convert(phase,k, amps, length, volts, cmils, vd);
	return output;
};

//result either Vdrop or wiresize cmil or fd scale
const vdToCmils = (phase, k, amps, length, vd) => {
	let multiple = phase === 3 ? Math.sqrt(3):2;
	let value = Math.round((multiple*k*amps*length)/vd);
	return  value 
};

const cmilsToVd = (phase, k, amps, length, cmils) => {
	if(Number.isNaN(cmils)){return ''}
	let multiple = phase === 3 ? Math.sqrt(3):2;
	return Math.round((multiple*k*amps*length *1000)/cmils)/1000
};

/************parent class ********************/
class VoltageDrop extends React.Component{
	constructor(props){
		super(props);
		//field
		this.handleLChange = this.handleLChange.bind(this);
		this.handleMetalChange = this.handleMetalChange.bind(this);
		this.handlePVDChange = this.handlePVDChange.bind(this);
			//power
		this.handleVDChange = this.handleVDChange.bind(this);
		this.handleWattChange = this.handleWattChange.bind(this);
		this.handleAmpChange = this.handleAmpChange.bind(this);
			//distances
		this.handleFootChange = this.handleFootChange.bind(this);
		this.handleMeterChange = this.handleMeterChanged.bind(this);
		//select
		this.handleAWGChange = this.handleAWGChange.bind(this);
		this.handlekcmilsChange = this.handlekcmilsChange.bind(this);
		this.handleVoltageChange = this.handleVoltageChange.bind(this);
		this.handlePhaseChange = this.handlePhaseChange.bind(this);

		//wire properties
		this.handleMetalChange = this.handleMetalChange.bind(this);
		this.handleTempChange = this.handleTempChange.bind(this);


		this.state = {
			//wire poperties
			temperature:20,
			k:10.4,
			metal:'copper', 

			//votage drop 
			vdScale:'vd',
			vd:0, 
			vdMag:0,//selected value

			//power
			voltage: 120, 
			amps:0, 
			powMag: 0,//selected value
			powScale: '',//amps or watts
			phase:1,

			//distance 
			distance: 0,//selected value
			disScale: ' ',//length ft for calc
			length: 0, 


			//wire sizes
			wireScale:' ', //AWG or CM
			wireMag:0,
			wireIndex:0,  //Position in paralel wire size lists
			cmils:0,
			calcScale:''//VD or CM
		}
	}

	componentDidMount(){

	}
	componentWillUnmount() {

	 }

	//***fields***
	handleLChange(event){
		this.setState({length:event});
	}

	//Votages
	handleVoltageChange(event){
		let voltage = voltages[event]
		this.setState({voltage});
	}

	//installation
			//power
	handleAmpChange(event){
		let amps = event;
		this.setState({powScale:'amps', powMag:amps,  amps});
	}

	handleWattChange(event){
		let powMag =event;
		let amps = tryConvert(powMag , toAmps, this.state.voltage ); 
		this.setState({powScale: 'p', powMag, amps })
	}

	handlePhaseChange(event){
		let phase = phases[event]
		this.setState({phase})
	}	
			//distance
	handleFootChange(event){
		let length = event;
		this.setState({disScale:'ft',distance:length, length});
	};

	handleMeterChanged(event){
		let distance = event;
		let length = tryConvert(distance, toFeet);
		this.setState({disScale:'m',distance, length});
	};

	//Wire Properties
	handleMetalChange(event){
		let metal = metals[event]
		let k = kCalc(metal, this.state.temperature)
		this.setState({metal,k});
	}

	handleTempChange(event){	
		let temperature=event;
		let k = kCalc(this.state.metal, temperature)	
		this.setState({temperature, k})
	}


	//***selects***

	handleAWGChange(event){
		let cmils= parseFloat(kcmils[event])*1000;
		let wireIndex = parseInt(event);
		let wireScale = 'AWG';
		this.setState({calcScale:'CM', wireIndex, wireScale, cmils});
	}

	handlekcmilsChange(event){
		let cmils= parseFloat(kcmils[event])*1000;
		let wireIndex = parseInt(event)
		let wireScale = 'CM';
		this.setState({calcScale:'CM', wireIndex, wireScale, cmils});
	}

	handleVDChange(event){
		var vdMag = event;
		let vd = vdMag > this.state.voltage ? this.state.voltage:vdMag ;
		this.setState({calcScale: 'VD', vdScale:'vd', vdMag:vd, vd});	
	}
	
	handlePVDChange(event){
		var vdMag = event;
		vdMag = vdMag > 100?100:vdMag;
		let  vd = tryConvert(vdMag, toVDfromPVD, this.state.voltage)

		this.setState({calcScale:'VD', vdScale: 'pvd', vdMag, vd})	
	};


	render(){
		//calc variables


		const phase = this.state.phase;
		const k = this.state.k;
		const amps = this.state.amps;
		const length = this.state.length;
		const volts = this.state.voltage;
		//const watts = this.state.watts;

    	//power field
    	const  powScale = this.state.powScale;
    	const powMag = this.state.powMag;
     	const ampInput = powScale === 'p' ? 
     		tryConvert(powMag , toAmps, volts*Math.sqrt(phase) ): powMag;
    	const wattInput = powScale === 'amps' ? 
    		tryConvert(powMag , toWatts, volts*Math.sqrt(phase)) : powMag;  	

		//distance field
		const disScale = this.state.disScale;
		const distance = this.state.distance;
   		const meters = disScale === 'ft' ? tryConvert(distance, toMeters ): distance;
    	const feet = disScale === 'm' ? tryConvert(distance, toFeet) : distance;

    	//toggle between voltage drop and wire size and toggle each within
		const vdScale =  this.state.vdScale;
		const wireScale = this.state.wireScale;
		const calcScale = this.state.calcScale;
		const rawCm = vdToCmils(phase, k, amps, length, this.state.vd);
		let rawKcm = rawCm/1000;
		let indexedKcm = getIndexValue(rawKcm, kcmils) ;
		const indexedCm = indexedKcm*1000;

	    const cmils = calcScale === 'VD' ?  indexedCm:this.state.cmils;
	
		const wireIndex = calcScale ==='VD' ? getIndexNum(cmToKcm(cmils), kcmils):this.state.wireIndex;

		//converts voltage drop from a constant to a variable of wire size
		const wireVdMag = cmilsToVd(phase, k, amps, length, cmils);

		const vdMag = calcScale === "CM" ? 
			(vdScale === 'vd' ? wireVdMag: tryConvert(wireVdMag,toPVDfromVD, volts)):
			this.state.vdMag;

		//converts  wire size from a constant to a variable of voltage drop
		const conKcmils = [kcmils[wireIndex], 'CM Select'];
		const conAWG = gauges.length > wireIndex ? [gauges[wireIndex], 'AWG Select']: ['no AWG', 'AWG Select'];

		//toggles master/slave for convertion and calcs based on state
    	const vd = vdScale === 'pvd' ? tryConvert(vdMag,toVDfromPVD, volts): vdMag;
    	const pvd = vdScale === 'vd' ? tryConvert(vdMag, toPVDfromVD, volts): vdMag;

    	//toggles master/slave for convertion and calcs based on state
		const milsState =  wireScale  ===  'AWG' || calcScale === 'VD' ? conKcmils: kcmils;
		const AWGState = wireScale  === 'CM'|| calcScale === 'VD'  ? conAWG: gauges;

    	//wire range bars
    	const ft = this.state.length;
    	const totalLength = disScale === 'm' ? tryConvert(ft, toMeters):ft;
    	var biggerCM = kcmToCm(kcmils[wireIndex + 1]);
    	var smallerCM = kcmToCm(kcmils[wireIndex - 1]);
   
												

		return(
			<div> 
				<fieldset >
					<legend> Voltage Properties </legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>
							<IndexSelect 
								scale = {unitTag['volts']}
								items= {voltages}
								onSelect = {this.handleVoltageChange}/>
						</div>

						<div className = 'flexBox'>		
							<IndexSelect 
								scale = {unitTag['phase']}
								items = {phases}
								onSelect = {this.handlePhaseChange}/>	
						</div>

						<div className = 'flexBox'>		
							<NumInput 
							unit = {unitTag['vd']}
							inputValue = {vd}
							onValueChange = {this.handleVDChange}/>
						</div>

						<div className = 'flexBox'>		
							<NumInput 
							decplace = {decplace}
							unit = {unitTag['pvd']}
							inputValue = {pvd}
							onValueChange = {this.handlePVDChange}/>
						</div>



				</div>
			</fieldset>
			<fieldset >
				<legend> Instulation properties</legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>

							<NumInput
							decplace = {decplace}
							unit = {unitTag['amps']} 
							inputValue = {ampInput}
							onValueChange = {this.handleAmpChange}/>
						</div>
						<div className = 'flexBox'>
							<NumInput 
							decplace = {decplace}
							unit = {unitTag['watts']}
							inputValue = {wattInput}
							onValueChange = {this.handleWattChange}/>



						</div>
						<div className = 'flexBox'>
							<NumInput 
								decplace = {decplace}
								unit = {unitTag['feet']}
								inputValue = {feet}
								onValueChange = {this.handleFootChange}/>
						</div>
						<div className = 'flexBox'>
							<NumInput 
								decplace = {decplace}
								unit = {unitTag['meters']}
								inputValue = {meters}
								onValueChange = {this.handleMeterChange}/>
						</div>			
					</div>
			</fieldset>
			<fieldset >
				<legend> Wire Properties </legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>
							<IndexSelect 
								scale = ''
								items = {metals}
								onSelect = {this.handleMetalChange}/>
						</div>
						<div className = 'flexBox'>
							<IndexSelect  
								scale= {unitTag['gauge']}
								items = {AWGState}
								onSelect = {this.handleAWGChange}
							/>								
						</div>
						<div className = 'flexBox'>
							<IndexSelect
								scale= {unitTag['kcmils']}
								items = {milsState}
								onSelect = {this.handlekcmilsChange}
								onClick = {this.handleWireClick} 
							/>
						</div>
							<NumInput 
							decplace = {decplace}
							unit = {unitTag['temp']}
							inputValue = {this.state.temperature}
							onValueChange = {this.handleTempChange}
						/>
					</div>
			</fieldset>
					<LineGraph
					legendTitle = {`Voltage drops (3% and 5%) over ${totalLength}${disScale}`}
					lengthScale =  {this.state.disScale}
					totalLength = {totalLength}
					section1 = {toLengthFromPVD(k, phase, amps, volts, ft, cmils,3,disScale)}
					section2 = {toLengthFromPVD(k, phase, amps, volts, ft, cmils, 5,disScale)}
					section3 = {toLengthFromPVD(k, phase, amps, volts, ft, cmils, 100,disScale)}
					/>
	</div>
			);
	}
}


export default VoltageDrop ;