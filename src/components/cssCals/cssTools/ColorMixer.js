import React from 'react';
import './colorMixStyle.css';

var colorStyle = {
	backgroundColor: 'gray'
}

const colorSliderObj =[ 
	{name:'rgb', colors:[
		{name:'alpha', type:'range', min:'0', max:'1000', value:'defaultValue', class:'colorSlider', id:'alphaSlider', key:0},
		{name: 'red', type:'range', min:'0', max:'255', value:'defaultValue',  class:'colorSlider', id:'redSlider', key:1},
		{name: 'green', type:'range', min:'0', max:'255', value:'defaultValue',  class:'colorSlider', id:'greenSlider', key:2},
		{name:'blue', type:'range', min:'0', max:'255', value:'defaultValue',  class:'colorSlider', id:'blueSlider', key:3}	
		]
	},
	{name:'hs1', colors:[
		{name:'alpha', type:'range', min:'0', max:'1', value:'defaultValue', class:'colorSlider', id:'alphaSlider', key:0},
		{name:'hue', type:'range', min:'0', max:'360', value:'defaultValue',  class:'colorSlider', id:'hueSlider', key:4},
		{name:'saturation',type:'range', min:'0', max:'100', value:'defaultValue',  class:'colorSlider', id:'saturationSlider', key:5},
		{name:'lightness', type:'range', min:'0', max:'100', value:'defaultValue',  class:'colorSlider', id:'lightSlider', key:6}
		]
	}
]

		
	

const ColorSliders = (changeHandler, obj) => {
	let sliders = obj.colors.map(( slider)=>
				<input
					type ={slider.type}
					min = {slider.min}
					max = {slider.max}
					
					className = {slider.class}
					id = {slider.id}
					key = {slider.key}
					onChange = {changeHandler} />
	);	
	return(
		<div className = "sliderContainer">
			
			{sliders}
		</div>
	);
}


const paint = (type, rh, gs, bl, a) => {
	let color = null;
	if(type == 'rgb') {
		color ={backgroundColor:`rgba(${rh,gs,bl,a})`};
		return( color);

	} else {
		color = {backgroundColor:`hsla(${rh,gs,bl,a})`};
		return(color);
	}
}

class ColorMixer extends React.Component {
	constructor (props){
		super(props);
		this.state = {
			name:'rgb',
			colorMode:false,
			activeColorMode:colorSliderObj[0],
			activeColorName:'rgb',
			redValue:null,
			greenValue:null,
			blueValue:null,
			hueValue:null,
			saturationValue:null,
			lightValue:null,
			alpha:null
		}
		this.rgbList = [this.state.redValue, this.state.greenValue, this.state.blueSlider, this.state.alpha];
		this.hs1 = [this.state.hueValue, this.state.saturationValue, this.state.lightValue,this.state.alpha];
		
		this.changeHandler = this.changeHandler.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		};

		changeHandler(event){
			let state = this.state
			console.log(this.hs1)
			switch(event.target.id){
				case 'alpha':
					let alpha = (event.target.value*.001)
					this.setState({ 'alpha': alpha})

				 case 'redSlider':
					 this.setState({ redValue: event.target.value, name:'rgb' })
					
					break;
				case 'greenSlider':
					this.setState({greenValue:event.target.value, name:"rgb" });
					
					break;
				case 'blueSlider':
					this.setState({blueValue:event.target.value , name:"rgb"})
					
					break;
				case 'hueSlider':
					this.setState({hueValue:event.target.value,  name:'hs1'})
					
					break;
				case 'saturationSlider':
					this.setState({saturationValue:event.target.value, name:'hs1'})
					
					break;
				case 'lightSlider':
					this.setState({ lightValue:event.target.value, name:'hs1'})
					
					
					break;
				default: break;			
			};
			
		};


		clickHandler(event){
			let id = event.target.id;

			switch(id){
				case 'colorModeToggle':
					let thisMode = !this.state.colorMode;
					let activeColor = colorSliderObj[thisMode? 1:0];
					let  name = activeColor.name;
					this.setState({
						colorMode: thisMode,
						activeColorMode: activeColor,
						activeColorName: name
					}); console.log(id); break;

					default: break;	
			}
		}



		render(){
			let colorSetting = this.state.activeColorName.toUpperCase();
			let colorMode = ColorSliders(this.changeHandler, this.state.activeColorMode);
			let newColor = null;
			let state = this.state
			if(this.state.name == 'hs1'){
				newColor =  paint('hs1', this.state.hueValue, this.state.saturationValue, this.state.lightValue, this.state.alpha);
			}else {newColor =  paint('rgb',this. state.redValue,this.state.blueValue, this.state.greenValue, this.state.alpha);}
			console.log(newColor)
			return(
				<div className = 'colorToolMainContainer'>this may take a while
					<div className = 'colorToolTopContainer'>
						<div onClick = {this.clickHandler} 
							className = 'colorInputToggle' 	id = 'colorModeToggle'>{colorSetting}
						</div>
					</div>

					<div className = 'colorToolBottomCon' style ={newColor}>
						{colorMode}
						<div className = 'colorDisplay' >something</div>
					</div>



				</div>)
		}
}

export default ColorMixer;