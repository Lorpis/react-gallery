import React from 'react';

const tD3Vd = {
    18:function(amps){return Math.round(((24.2/amps)*10))/10},
    16:function(amps){return Math.round((38.5/amps)*10)/10},
    14:function(amps){return Math.round((61.4/amps)*10)/10},
    12:function(amps){return Math.round((97.6/amps)*10)/10},
    10:function(amps){return Math.round((155/amps)*10)/10},
    8:function(amps){return Math.round((246.6/amps)*10)/10},
    6:function(amps){return Math.round((329/amps)*10)/10},
    4:function(amps){return Math.round((624.49/amps)*10)/10},
    3:function(amps){return Math.round((786/amps)*10)/10},
    2:function(amps){return Math.round((992/amps)*10)/10},
    1:function(amps){return Math.round((1250/amps)*10)/10},
    0:function(amps){return Math.round((1576.5/amps)*10)/10},
    00:function(amps){return Math.round((1987.75/amps)*10)/10},
    000:function(amps){return Math.round((2507/amps)*10)/10},
    0000:function(amps){return Math.round((3162/amps)*10)/10}
}

export default tD3Vd
