import React from 'react';
import './AppStyles.css';
import Header from '../components/Header';
import MainTabs from '../components/navBar/MainTabs';
import DragDrop from '../components/CECAssist/distribution/dragNDrop.js';
//import Boil from '../exercises/IsBoiling.js';
//import voltageDrop from '../components/CECAssist/voltageDropCal/voltageDrop.js';
//import VoltageDropMain from '../components/CECAssist/voltageDropCal/VoltageDropMain.js';
//import Color from '../components/cssCals/cssTools/ColorMixer.js';
import { HashRouter, Rout, Link, Switch } from 'react-router-dom';
//classes need to be caps to work
const App  = () => {

	
	return(
		<HashRouter>
			<div className = 'app'>
				<Header/>
				<MainTabs/>	
			</div>
		</HashRouter>
		);
}

export default App;