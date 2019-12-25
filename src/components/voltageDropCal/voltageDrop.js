import React from 'react';
import  './voltageDropStyles.css';





/********************Voltage Drop constants**********************/
/*input variable*/
const unitType = {
	voltage:'Voltage',
	amps:'Current',
	ft:'Length in ft',
	m:'Length in Meters',
	kcmils:'Area',
	metal:'Metal',
	pvd:'% Voltage Drop',
	vd:'Voltage Drop',
	p:'Watts',
	temp:'Cecius',


};

//pulldown list items
const voltages = [120, 208, 240, 277, 347, 416, 480, 600];
const phases = [1, 3];

const metals = ['copper', 'aluminum', 'carbon', 'constantan', 'gold', 'iron', 'lead', 'manganin', 'mercury', 'nichrome', 'nickle', 'platinum', 'silver', 'tungsten']
const kValues = {copper:{k:10.4, tempCo:0.0039}, 
						  aluminum:{k:17, tempCo:0.004},
						  carbon:{k:22000, tempCo:-0.0004}, 
						  constantan:{k:295, tempCo:0.000002},
						  gold:{k:14, tempCo:0.004}, 
						  iron:{k:60, tempCo:0.0055},
						  lead:{k:126, tempCo:0.0043}, 
						  manganin:{k:265, tempCo:0},
						  mercury:{k:675, tempCo:0.00088}, 
						  nichrome:{k:675, tempCo:0.0002},
						  nickle:{k:52, tempCo:0.005}, 
						  platinum:{k:66, tempCo:0.0036},
						  silver:{k:9.6, tempCo:0.0038}, 
						  tungsten:{k:33.8, tempCo:0.005}
						  }//mil-foot


//CEC given standard wire sizes for pulldown
const gauges = ['Select ','18','16','14',
						   '12','10','8',
						   '6','4','3',
						   '2','1','0',
						   '00','000','0000',]
const kcmils = ['Select','1.624','2.583','4.107',
						'6.530','10.383','16.509',
						'26.251','41.740','52.633',
						'66.369','83.690','105.531',
						'133.072','167.800','211.592',
						'250','300','350',
						'400','500','600',
						'700','750','800',
						'900','1000','1250',
						'1500','1750','2000']


/**************voltage drop graphical display*********************************/
const makePercent = (item, outOf)  =>{ 
	return String(Math.round(100*item/outOf)) + '%'
}

const barList = (l1,l2,l3,l4) => {
	let lT = l1 +  l2 +  l3 + l4;
	let p1 = makePercent(l1, lT);
	let p2= makePercent(l2, lT);
	let p3 = makePercent(l3, lT);
	let p4 = makePercent(l4, lT);

 return ([{ className: 'overRated', percent:p1, length:l1},
 			  {className: 'rated', percent:p2, length:l2},
 			  {className: 'underRated', percent:p3, length:l3},
	 		  {className: 'noVoltage', percent:p4, length:l4}]

	)
}
const LimitBarEl = (props) => {
	let lengthScale = props['lengthScale']
	let limitMap = props.barList.map((bar) =>
		<div  
		className = {bar['className']}
		style = {{width: `${bar['percent']}`}}> 
		{bar['length']}{lengthScale}
		</div>
		)
		return (
			<div className = 'distanceMeter'>
				{limitMap}
			</div>		
		)}	


class Result extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(){}


	render(){ 
		
		console.log(this.props)
		const lengthScale = this.props.lengthScale;
		var barlist = barList(this.props.overRatedLength,	this.props.ratedLength,	this.props.underRatedLength,this.props.noVoltageLength)
	




		return(
			<div>
				<legend>this.props.legendTitle}</legend>
				<LimitBarEl
					barList = {barlist}
					lengthScale = {lengthScale}/>
			</div>
			);
	}
}

/*************Pulldown Menues: kcmils child class of Voltage Drop *********************/
/*********pulldown functions***********************/
/*pull down list insert function*/

const MenuList = (props) => {
	let amps = 0;
	let listItem = props.list.map((item)=>
		<option key = {amps} value = {amps++}> {item} </option>
		);
	return (
		<select
				onChange = {props.onChange}
				onClick = {props.onClick}>
				{listItem}
		</select>
		);
}

/*************classs******************************/
class Select extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	
	}

	handleChange(event){
		this.props.onSelect(event.target.value);
	}
	handleClick(){
		this.props.onClick(this.props.scale)
	}

	render(){
		const scale = this.props.scale
		const items = this.props.items

		return(
			<div>
			<MenuList  
				list = {items}
				onChange = {this.handleChange}
				onClick = {this.handleClick}
			/>{scale}
			</div>
			);
	}
}

/********************Field input:  kcmils child of Volscalee Drop****************************/
/********input feild functions*****************/

/********class******************************/
class Input extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		//an attempt to serialize the event within child
		/*this.props.onValueChange([voltage.target.value, this.props.unit]);*/

    	this.props.onValueChange(event.target.value);
 
		//this.props.onValueChange(event.target.value);


	};

	render(){
		const fieldValue = this.props.inputValue
		const unit = this.props.unit;
		return (
			<fieldset >
				<legend> Enter { unitType[unit] } </legend>
				<div >
					<input
						value = {fieldValue}
						onChange = {this.handleChange} />
				</div>				
			</fieldset>
		);
	}
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

const toPVD = (volts, vd) => {return vd/volts}
const toVDfromPVD =(volts, pvd) => {return volts*(pvd/100)}

const toKcmils = (k,  length, amps, multiple) =>{}
const toLength = (k, kcmils, amps, multiple) => {}
const vdCalc = (k, kcmils, amps, length, mutiple,) => {}

const VoltageDropCalc = (props) => {
	let metal = props.metal;
	let k = kValues[metal];
	let cmils = parseInt(props.kcmils)*1000;
	let vd = (2*k*props.amps*props.length)/cmils
	let pvd = 100*vd/ props.volts
	


	return <p> The voltage drop  is {vd}Volts, making it a {pvd}persent voltage drop</p>;
}


const isNumberKey = (number) => {
	let str = number;
	if ( str.charAt(str.length -1) === '.'  &&  !(str.indexOf('.') < str.length-1)) { return str} 
	else {
		const input = parseFloat(number);
		if(Number.isNaN(input)){return ' '}
		else {return input}	
		}
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



//starting '0's

//distance convertions
const toMeters = (feet) => { return feet / 3.281};
const toFeet = (meters)=> { return meters * 3.281};

//power/amps  convertions
const toAmps = (watts, volts) => {return watts/volts}
const toWatts = (amps, volts, phase) => {return amps*volts}
	




 



/************parent class ********************/
class voltageDropInputs extends React.Component{
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
		this.handleWireClick = this.handleWireClick.bind(this);
		this.handleVoltageChange = this.handleVoltageChange.bind(this);
		this.handleVoltageClick = this.handleVoltageClick.bind(this);
		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.handlePhaseClick = this.handlePhaseClick.bind(this);
		//wire properties
		this.handleMetalChange = this.handleMetalChange.bind(this);
		this.handleMetalClick = this.handleMetalClick.bind(this);
		this.handleTempChange = this.handleTempChange.bind(this);


		this.state = {
			temperature:20,
			k:10.4,
			multiple:2,

			
			lm: ' ', //length meters
			metal:'copper', //Metal


			//votage drop representation
			vdScale:'',
			vd:0, //votage drop
			vdMag:0, //%voltage drop

			//power
			voltage: 120, //volts
			amps:0, //current
			powMag: 0,
			powScale: '',
			phase:1,


			//distance 
			distance: 0,
			disScale: ' ',
			length: 0, //length ft for calc


			//wire sizes
			wireScale:' ', //AWG or mils
			AWGState:gauges, // alt states input /output lists
			milsState: kcmils,
			wireIndex:' ',  //Position in paralel wire size lists
			cmils:0,

			calcScale:''
		}
	}

	componentDidMount(){
		console.log('mounted')
	}
	componentWillUnmount() {
		console.log('unmount');
	 }

	/*an attempt to work with one change handler
	handleChange(voltage){
		const value = voltage[0];
		const unit = voltage[1];
		this.setState({unit:value});
		console.log(value)
		console.log(unit)

	}*/

	//***fields***


	handleLChange(event){
		this.setState({length:event});
	}



	//Votages
	handleVoltageChange(event){
		let voltage = voltages[event]
		this.setState({voltage});
	}
	handleVoltageClick(event){}


	handleVDChange(event){
		let vd = isNumberKey(event)
		this.setState({calcScale: 'vd', vdScale:'vd', vdMag:vd, vd});
	}
	
	handlePVDChange(event){
		let vdMag = isNumberKey(event);
		let vd = tryConvert(vdMag, toVDfromPVD, this.state.voltage)
		this.setState({calcScale:'vd', vdScale: 'pvd', vdMag, vd})
	};


	//installation
			//power
	handleAmpChange(event){/////////////////////////////////////////////////////////////////
		let amps = isNumberKey(event);
		this.setState({powScale:'amps', powMag:amps,  amps});
	}
	handleWattChange(event){
		let powMag = isNumberKey(event);
		let amps = tryConvert(powMag , toAmps, this.state.voltage*Math.sqrt(this.state.phase) ); 
		this.setState({powScale: 'p', powMag, amps })
	}
	handlePhaseChange(event){
		let phase = phases[event]
		let mutiple = phase === 3 ? Math.sqrt(3):2;
		this.setState({phase, mutiple})
	}	
	handlePhaseClick(event){}


			//distance
	handleFootChange(event){
		let number = isNumberKey(event);
		this.setState({disScale:'feet',distance:number, length:number});
	};
	handleMeterChanged(event){
		let number = isNumberKey(event);
		let length = tryConvert(number, toFeet);
		this.setState({disScale:'meters',distance:number,length:length });
	};

	//Wire Properties
	handleMetalChange(event){
		let metal = metals[event]
		let k = kCalc(metal, this.state.temperature)
		this.setState({metal,k});
	}
	handleTempChange(event){	
		let temperature= isNumberKey(event);
		let k = kCalc(this.state.metal, temperature)	
		this.setState({temperature, k})
	}



	//***selects***
	 handleWireClick(event){	
	 	if (this.state.wireScale !== event){
			this.setState({wireScale:event});
			} 
		let wireIndex = this.state.wireIndex
		let milsState =  this.state.wireScale ==='AWG' ? [kcmils[wireIndex]]: kcmils;
		let AWGState = this.state.wireScale === 'kcmils' ? [gauges[wireIndex]]: gauges
		this.setState({calcScale:'mils', AWGState, milsState});

		

	}
	


	handleAWGChange(event){
		let cmils= parseFloat(kcmils[event])*1000;
		this.setState({cmils});
		this.setState({wireIndex:event});
	}

	handlekcmilsChange(event){
		let cmils = parseFloat(kcmils[event])*1000;
		this.setState({cmils});
		this.setState({wireIndex:event});
	}







	handleMetalClick(){}





	render(){
		console.log(this.state.calcScale)
    	//power field
    	const  powScale = this.state.powScale;
    	const powMag = this.state.powMag;
    	const volts = this.state.voltage;
    	const phase = this.state.phase;
     	const ampInput = powScale === 'p' ? tryConvert(powMag , toAmps, volts*Math.sqrt(phase) ): powMag;
    	const wattInput = powScale === 'amps' ? tryConvert(powMag , toWatts, volts*Math.sqrt(phase)) : powMag;  	


		//distance field
		const  disScale = this.state.disScale;
		const distance = this.state.distance;
   		const meters = disScale === 'feet' ? tryConvert(distance, toMeters ): distance;
    	const feet = disScale === 'meters' ? tryConvert(distance, toFeet) : distance;

    	//voltage drop feilds
    	const vdScale = this.state.vdScale;
    	const vdMag = this.state.vdMag;
    	const vd = vdScale === 'pvd' ? tryConvert(vdMag,toVDfromPVD, volts): vdMag;
    	const pvd = vdScale === 'vd' ? tryConvert(vdMag, toPVD, volts): vdMag;
		


    	 // const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
   // const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
		//formula variables


		//wire size select
		const AWGState =this.state.AWGState;
		const milsState = this.state.milsState;



	
	
		//var stateGauge = this.state.wireScale === 'kcmils' ? [gauges[wireIndex]]: gauges
		//var stateKcmil = this.state.wireScale ==='AWG' ? [kcmils[wireIndex]]: kcmils

											

		return(
			<div> 
				<fieldset >
					<legend> Voltage Properties </legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>
							<Select 
								scale = 'Volts'
								items= {voltages}
								onSelect = {this.handleVoltageChange}
								onClick = {this.handleVoltageClick}/>
						</div>

						<div className = 'flexBox'>		
							<Select 
								scale = 'Phases'
								items = {phases}
								onSelect = {this.handlePhaseChange}
								onClick = {this.handlePhaseClick}/>	
						</div>
						<div className = 'flexBox'>		
							<Input 
							unit = "vd"
							inputValue = {vd}
							onValueChange = {this.handleVDChange}/>
						</div>
						<div className = 'flexBox'>		
							<Input 
							unit = "pvd"
							inputValue = {pvd}
							onValueChange = {this.handlePVDChange}/>
						</div>



				</div>
			</fieldset>
			<fieldset >
				<legend> Instulation properties</legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>

							<Input
							unit = "amps" 
							inputValue = {ampInput}
							onValueChange = {this.handleAmpChange}/>
						</div>
						<div className = 'flexBox'>
							<Input 
							unit = "p"
							inputValue = {wattInput}
							onValueChange = {this.handleWattChange}/>



						</div>
						<div className = 'flexBox'>
							<Input 
								unit = "ft"
								inputValue = {feet}
								onValueChange = {this.handleFootChange}/>
						</div>
						<div className = 'flexBox'>
							<Input 
								unit = "m"
								inputValue = {meters}
								onValueChange = {this.handleMeterChange}/>
						</div>			
					</div>
			</fieldset>
			<fieldset >
				<legend> Wire Properties </legend>
					<div className = 'fieldFlex'>
						<div className = 'flexBox'>
							<Select 
								scale = 'Metals'
								items = {metals}
								onSelect = {this.handleMetalChange}
								onClick = {this.handleMetalClick}/>
						</div>
						<div className = 'flexBox'>
							<Select  
								scale= 'AWG'
								items = {AWGState}
								onSelect = {this.handleAWGChange}
								onClick = {this.handleWireClick}
								/>
						</div>
						<div className = 'flexBox'>
							<Select
								scale= 'kcmils'
								items = {milsState}
								onSelect = {this.handlekcmilsChange}
								onClick = {this.handleWireClick} 
								/>
						</div>

							<Input 
							unit = "temp"
							inputValue = {this.state.temperature}
							onValueChange = {this.handleTempChange}/>
					</div>
			</fieldset>


		





				<VoltageDropCalc
					metal = {this.state.metal}
					volts = {this.state.voltage}
					amps= {this.state.amps}
					length = {this.state.length}
					phase = {this.state.phase}
					kcmils = {this.state.kcmils}
				/>

				<Result
					legendTitle = 'One wire size smaller'
					lengthScale = 'm'
					overRatedLength = {10}
					ratedLength = {15}
					underRatedLength = {20}
					noVoltageLength = {25}
					/> 

					<Result
					legendTitle = 'Selected wire size'
					lengthScale = 'm'
					overRatedLength = {25}
					ratedLength = {20}
					underRatedLength = {15}
					noVoltageLength = {10}
					/>
				<Result
					legendTitle = 'One wire size larger'
					lengthScale = 'm'
					overRatedLength = {10}
					ratedLength = {15}
					underRatedLength = {20}
					noVoltageLength = {25}
					/> 


	</div>

			);
	}
}


export default voltageDropInputs ;