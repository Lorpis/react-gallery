import React from 'react';
import './asteroids.css';
import Ship from './objects/Ship.js';
import num from './functions/num.js';
import Bullet from './objects/Bullets.js';
import Asteroid from './objects/Asteroid.js';
import col from './functions/collision';


const gameSettings = {
	screenSize:{w:800, h:300 },
	frameRate:60,//fps
	frameMS:() => {return (1000/gameSettings.frameRate).toFixed(3)},
}
const mapList = (items,method) => {
	var mapped = [];
	for(var i = 0;i< items.length;i++){
		mapped.push(eval('items[i].'+method))
	};
	return mapped
}
class Asteroids extends React.Component{
	constructor(props){
		super(props);

	

		this.asteroids = [new Asteroid(), new Asteroid(), new Asteroid()]
		this.ship = new Ship({x:100,y:100},0);
		this.bullets = [];
		this.posMap = {ship:this.ship.pos, bullets:this.bullets, asteroids:this.asteroids}
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.state = {
			ship:this.ship,
			mousePos:{x:0,y:0},
			shipPos:{x:0,y:0},
			bullets:[],
		};
	}//constructor

	componentDidMount() {
	this.frame = setInterval( () => this.tick(), gameSettings.frameMS());
	}//componentDidMount

	componentWillUnmount() {clearInterval(this.frame);}
	tick(){
		col.scan(this.bullets, this.asteroids);
		col.scan([this.ship], this.asteroids);
		mapList(this.bullets, 'upDate()');
		mapList(this.asteroids, 'upDate()');
		this.ship.upDate()
		this.setState({ bullets:this.bullets })
	}//tick

	handleKeyDown(e){
		if(e.keyCode===32){
			this.bullets.push(this.ship.shot());
		}		
	}

	handleMouseMove(e){
		let mousePos = {x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY};
		this.ship.angle = Math.atan2(mousePos.y - this.ship.pos.y, mousePos.x - this.ship.pos.x);
		this.setState({mousePos})
	}

	handleClick(e){
		this.ship.thrust();
	}

	render(){
		const ss = gameSettings.screenSize;
		const mouse =  this.state.mousePos;
		const matrix = this.m1;





		return(
		
			<div>{mapList(this.asteroids, 'col.toString()')}
			<div className = 'gameWindow'
			tabIndex="0"
			onMouseMove = {this.handleMouseMove}
			onKeyDown = {this.handleKeyDown}
			style = {{width: ss.w, height:ss.h}}
			onClick = {this.handleClick}>


				<svg height="100%" width="100%">
					{this.ship.svg()}
					{mapList(this.bullets, 'svg(i)')}
					{mapList(this.asteroids, 'svg(i)')}
			
  					<line x1= {this.ship.pos.x} y1={this.ship.pos.y} x2={this.ship.pos.x+this.ship.vec.x*15} y2={this.ship.pos.y + this.ship.vec.y*15} stroke="blue" strokeWidth="2" />
  					<line x1= {this.ship.pos.x} y1={this.ship.pos.y} x2={mouse.x} y2={mouse.y } stroke="green" strokeWidth="2" />
				</svg>


			</div>
</div>

			)

	}//render

};//asteroids

export default Asteroids 