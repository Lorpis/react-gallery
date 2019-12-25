import React from 'react';


//Tab family tree list[
	// ansestor's [list of {objects, , , parents:[object list {,,,children's:[object list] } ] },  ,  , ] ,,]  
	//loop into until it hits a terminating child on their family tree, then run some command.

const navObjs ={ headerTabs: [

	{name:'Home', key: 0, 
		'children':[  <h1>Home Page</h1>  ]
	}, 
 	{name:'Web Apps', key:1, 
 		'children':[ 
 			{name:'CEC Asist', key:1.1,
 				'children': [ { display:<h1>CEC Asist Page</h1>  } ]
 			},
 			{name:'Convertion Calculators', key:1.2,
 				'children': [ { display:<h1>Convertion Calculators Page</h1>  }  ]
 			},
 			{name:'Fractal Generator', key:1.3,
 				'children': [ { display:<h1>Fractal Generator Page</h1>  }  ]
 			},
 		]
 	},
 	{name:'CSS Styles', key:2, 
 		'children':[ 

 			{name:'Calculators', key:2.1,
 				'children': [ { display:<h1>Calculators Page</h1>  } ]
			},
 			{name:'Examples', key:2.2,
 				'children': [ { display:<h1>Examples Page</h1>  } ]
			},			
 			{name:'Animation', key:2.3,
 				'children': [ { display:<h1>Animation Page</h1>  } ]
			},					
 		]
 	},
 	{name:'Games', key:3, 
 		'children':[ 
 			{name:'Game1', key:3.1,
 				'children': [ { display:<h1>Game1 Page</h1>  } ] 
 			},
 			{name:'Game2', key:3.2,
 				'children': [ { display:<h1>Game2 Page</h1>  } ] 
 			},	
		]
 	},
 	{name:'CSS Styles', key:4, 
 		'children':[ 
 			{name:'CEC Asist', key:4.1,
 				'children': [ { display:<h1>CSS Style Page</h1>  } ] 
			},
 		]
 	},
 	{name:'About', key:5, 
 		'children':[ { display: <h1>About Page</h1>  } ]
 	}]
 ];
export default navObjs;



