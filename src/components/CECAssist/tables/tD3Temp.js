import React from 'react';

//{ temp celcius { loaded%:distance factor}}

const tD3Temp = {
	60:{ 100:1.00,    90:1.02,      80:1.04,    70:1.06,     60:1.07,   50:1.09,    40:1.10},
	75:{  100: 0.96,  90:1.00,     80:1.00,    70:1.03,     60:1.06,   50:1.07,    40:1.09},
	85:{  100:0.91,    90:0.90,    80:1.00,    70:1.00,    60: 1.04,  50: 1.06,   40:1.08},
	90:{  100:0.91,    90:0.90,    80:1.00,    70:1.00,    60: 1.04,  50: 1.06,   40:1.08},
	110:{  100:0.85,   90:0.90,    80:0.95,   70:1.00,    60:1.02,   50: 1.05,    40:1.07},
	125:{  100:0.82,   90:0.87,   80:0.92,    70:0.97,   60:1.00,   50:1.04,    40:1.07},
	200:{100:0.68,   90:0.76,   80:0.83,    70:0.96,   60:0.96,  50:1.00,    40:1.04},

};

export default tD3Temp