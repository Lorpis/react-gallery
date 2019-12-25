import React from 'react';
import './AppStyles.css';
import Header from '../components/Header';
import MainTabs from '../components/navBar/MainTabs';
import Boil from '../exercises/IsBoiling.js';
import voltageDrop from '../components/voltageDropCal/voltageDrop.js'
import Color from '../components/cssCals/cssTools/ColorMixer.js'
import { HashRouter, Rout, Link, Switch } from 'react-router-dom';

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