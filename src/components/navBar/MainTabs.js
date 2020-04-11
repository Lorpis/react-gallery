import React from 'react';
import  './tabStyles.css';
import ConCalc from '../../exercises/IsBoiling.js';
import Home from '../home/Home.js';
import Grid from '../CECAssist/Grid';
import VoltageDrop from '../CECAssist/voltageDropCal/VoltageDropMain.js';
import DragDrop from '../CECAssist/distribution/dragNDrop.js';

const ConCalc1= ConCalc;







// tests to see if a page in passed
const xmlTest = (prop) => {
	const fail = () => {return <div> Page Missing</div>}
	if(!prop) {return fail}
	else	{return prop;}
	
}

	
// const App = () => <div>Hello</div>;


//{Tab family tree : [
	// ansestor's [list of {objects, , , parents:[object list {,,,children's:[object list] } ] },  ,  , ] ,,] } 
	//loop into until it hits a terminating child on their family tree, then run some command.
	//.display true terminate and does some action
	//Back on every first child's .display makes a back button


const navObjs ={ 
headerTabs: [

	{name:'Home',   key: '0', 
		children:[  {display:true, feature:DragDrop, key:'0.1'}]
	}, 
 	{name:'Web Apps', key:'1', 
 		children:[ 
 			{name:"Back", key:"Back",
 				children:[ {display:"Back", action:true,  key:'up'} ]
 			},
 			{name:'CEC Asist', key:'1.1',
 				children: [ {display:true, feature:VoltageDrop, key:'1.1.2'} ]
 			},
 			{name:'Convertion Calculators', key:'1.2',
 				children: [ { display:true, feature:ConCalc, key:'1.2.1'  }  ]
 			},
 			{name:'Fractal Generator', key:'1.3',
 				children: [ {display:true, key:'1.3.1'  }  ]
 			},
 		]
 	},
 	{name:'CSS Styles', key:'2', 
 		children:[
 			{name:"Back", key:"Back",
 				children:[ {display:"Back", action:true, key:'up'} ]
 			},		 
 			{name:'Calculators', key:'2.1',
 				children: [ { display:true, action:true,  key:'2.1.1' } ]
			},
 			{name:'Examples', key:'2.2',
 				children: [ { display:true, key:'2.2.1'} ]
			},			
 			{name:'Animation', key:'2.3',
 				children: [
 					{name:"Back", key:"Back",
 						children:[ {display:"Back", action:true, key:'up'} ]
 					},
		 			{name:'Group 1', key:'2.3.1',
		 				children: [ { display:true, key:'2.3.1.1'  } ] 
		 			},
		 			{name:'Group2', key:'2.3.2',
	 				children: [ { display:true, key:'2.3.1.2'  } ] 
	 				}, 					
 				]
			},					
 		]
 	},
 	{name:'Games', key:'3', 
 		children:[
 			{name:"Back", key:"Back",
 				children:[ {display:"Back", action:true, key:'up'} ]
 			},
 			{name:'Game1', key:'3.1',
 				children: [ { display:true, key:'3.1.1'  } ] 
 			},
 			{name:'Game2', key:'3.2',
 				children: [ { display:true, key:'3.1.2'  } ] 
 			},	
		]
 	},
 	{name:'About', key:'4', 
 		children:[ { display:true, key:'4.1'  } ]
 	}]
 }


/******************Dynamic Tab Setup Functions**************/
/***Truth list for nav bar select toggle***/
const TruthList = (tabsList) => {
	let truthList = []
	for (var i = 0; i < tabsList.length; i++){
		truthList[i] = false
	}
	return truthList;
}
/***maps the generation and produced an xml display output  ***/
const  Tabs = (clickHandler, state) => {
	let tabEls =state.activeSiblings.map((tab, index) => 
		<h3  
			onClick = {clickHandler} 
			key = {tab.key} 
			id = {index} 
			className = {state.selectMap[index] === false ? 'tab' : 'active'}>
			{tab.name}  
		</h3>
	);	
	return (
		<div className = 'tabContainer'> 
			{tabEls}
		</div>
	);
}


/**************************class***********************/
class NavBar extends React.Component {
	constructor(props) {
		super(props);
		//selectMap list looks like => [false, false, false, ....]
		//activeSilblings is a list of siblings parellel to selectMap
		//navlist is a list of immediate family members (family node)
		//feature is the members resulting  page (performance)
		this.state = {
			selectMap: [true, false, false, false, false],//TruthList(navObjs.headerTabs), 
			lastactiveId: null,
			activeSiblings:navObjs.headerTabs,
			navList:[],
			featured:DragDrop
			}
		this.handleChildClick = this.handleChildClick.bind(this);	
	};

	handleChildClick(event) {
	//moves up and down the family tree and displays performances
		/***setting up variables for code readability***/
		let state = this.state;
		let id = event.target.id;
		let lastId = state.lastactiveId;
		let truthList = state.selectMap;
		let navList = state.navList;


		//getting family tree node of selected.
		//the Oldest in the family tree have no .display;
		//childless members have a .display;
		//node parents have a "back"  .display child value.
		let navlength = navList.length;
		let nextGen = state.activeSiblings[id].children;
		let thisGen = state.activeSiblings;
		let lastGen = navList[navlength -1];


		/***puting variable to work***/
		switch(nextGen[0].display){
			case 'Back':
				navList.pop()
				let lastGenTruthList = TruthList(lastGen)
				this.setState({
					activeSiblings:lastGen,
					selectMap:lastGenTruthList,
					navList:navList				
				});	break;

			case undefined:
			//if family member has children, lets see them
				let nextGenTruthList = TruthList(nextGen);
				//let navLista = navList
				navList[navlength] = thisGen
				console.log(thisGen)
				this.setState({
					activeSiblings:nextGen,
					selectMap:nextGenTruthList,
					navList:navList,
					feature:null
				});	break;

			case  true:
			// toggle between childless family member's performances.

				//getting last selected sibling's truth index to toggle
				let lastChildState =  state.selectMap[lastId];
				let feature = nextGen[0].feature
				//Toggle switch logic to confine select change to two siblings
				//last one sits down/performs when you ask another sibling

				for ( let i = 0; i < truthList.length; i++){
					truthList[i] = false;
				};
				truthList[id] = true;

				/*
				if(id !== lastId) {truthList[id] = !truthList[id]}
				//next sibling sits up and down if you keep asking.
				//last sibling stays seated.
				switch(id === lastId && lastChildState === false){
					case true: truthList[lastId] = true;break;
					case false: truthList[lastId] = false;break;
					default: break;
				}*/






				//updating state	
				this.setState({
					lastactiveId: id,
					featured: feature

				}); break

			default: break; 
		} //switch					
	}//event
	

	render(){
		// console.log(this.state.navList, 'list of visited arrays');
		// console.log(this.state.navList.length, 'number of visits');
		//console.log(this.state.activeSiblings, "new tabs render")
		//console.log(this.state.selectMap, "updated active state");
		let currentNavebar = Tabs(this.handleChildClick, this.state);
		let Featured = xmlTest(this.state.featured);

		return(
			<div>
				<div className = 'navBarContainer'>		
					{currentNavebar}					
				</div>
				<div>
					<Featured/>	
				</div>		
			</div>
		);
	}
}

export default NavBar;

