import React from 'react';
import './miscStyles.css';
const User = {name:"Sara Conner"}


function Welcome() {
  return (
  	<div>
  		<h1>Hello, {User.name}</h1>
  		<p>The machines are on the rise</p>
  		</div>
  		);
}




//experts to App as jsx element => Index as
//ReactDOM.render(<App />, document.getElementById('root'));
 export default Welcome;