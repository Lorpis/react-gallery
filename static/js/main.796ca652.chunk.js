(this.webpackJsonptooling=this.webpackJsonptooling||[]).push([[0],{18:function(e,a,t){e.exports=t(36)},23:function(e,a,t){},24:function(e,a,t){},25:function(e,a,t){},26:function(e,a,t){e.exports=t.p+"static/media/react.fbf20f51.png"},27:function(e,a,t){},28:function(e,a,t){},29:function(e,a,t){},30:function(e,a,t){},36:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),i=t(14),r=t.n(i),c=(t(23),t(24),t(25),function(){var e=t(26);return l.a.createElement("div",{className:"flexContainer"},l.a.createElement("img",{alt:"loading",className:"reactIcon",src:e}),l.a.createElement("h1",{className:"header"}," ","= (Lorp.React.Project_Gallery) => {..."," "))}),s=t(2),h=t(3),u=t(6),o=t(4),d=t(1),m=t(5),g=(t(27),{c:"Celsius",f:"Fahrenheit"});function p(e){return 5*(e-32)/9}function v(e){return 9*e/5+32}function C(e,a){var t=parseFloat(e);if(Number.isNaN(t))return"";var n=a(t);return(Math.round(1e3*n)/1e3).toString()}function k(e){return e.celsius>=100?l.a.createElement("p",null,"The water would boil."):l.a.createElement("p",null,"The water would not boil.")}var f=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleChange=t.handleChange.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleChange",value:function(e){this.props.onTemperatureChange(e.target.value)}},{key:"render",value:function(){var e=this.props.temperature,a=this.props.scale;return l.a.createElement("fieldset",null,l.a.createElement("legend",null,"Enter temperature in ",g[a],":"),l.a.createElement("input",{value:e,onChange:this.handleChange}))}}]),a}(l.a.Component),b=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleCelsiusChange=t.handleCelsiusChange.bind(Object(d.a)(t)),t.handleFahrenheitChange=t.handleFahrenheitChange.bind(Object(d.a)(t)),t.state={temperature:"",scale:"c"},t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleCelsiusChange",value:function(e){this.setState({scale:"c",temperature:e})}},{key:"handleFahrenheitChange",value:function(e){this.setState({scale:"f",temperature:e})}},{key:"render",value:function(){var e=this.state.scale,a=this.state.temperature,t="f"===e?C(a,p):a,n="c"===e?C(a,v):a;return l.a.createElement("div",null,l.a.createElement(f,{scale:"c",temperature:t,onTemperatureChange:this.handleCelsiusChange}),l.a.createElement(f,{scale:"f",temperature:n,onTemperatureChange:this.handleFahrenheitChange}),l.a.createElement(k,{celsius:parseFloat(t)}))}}]),a}(l.a.Component),y=t(9),S=(t(28),l.a.Component,t(29),{voltage:"Voltage",amps:"Current",ft:"Length in ft",m:"Length in Meters",kcmils:"Area",metal:"Metal",pvd:"% Voltage Drop",vd:"Voltage Drop",p:"Watts",temp:"Cecius"}),E=[120,208,240,277,347,416,480,600],O=[1,3],j=["copper","aluminum","carbon","constantan","gold","iron","lead","manganin","mercury","nichrome","nickle","platinum","silver","tungsten"],M={copper:{k:10.4,tempCo:.0039},aluminum:{k:17,tempCo:.004},carbon:{k:22e3,tempCo:-4e-4},constantan:{k:295,tempCo:2e-6},gold:{k:14,tempCo:.004},iron:{k:60,tempCo:.0055},lead:{k:126,tempCo:.0043},manganin:{k:265,tempCo:0},mercury:{k:675,tempCo:88e-5},nichrome:{k:675,tempCo:2e-4},nickle:{k:52,tempCo:.005},platinum:{k:66,tempCo:.0036},silver:{k:9.6,tempCo:.0038},tungsten:{k:33.8,tempCo:.005}},V=["Select ","18","16","14","12","10","8","6","4","3","2","1","0","00","000","0000"],x=["Select","1.624","2.583","4.107","6.530","10.383","16.509","26.251","41.740","52.633","66.369","83.690","105.531","133.072","167.800","211.592","250","300","350","400","500","600","700","750","800","900","1000","1250","1500","1750","2000"],N=function(e,a){return String(Math.round(100*e/a))+"%"},w=function(e){e.lengthScale;var a=e.barList.map((function(a){return l.a.createElement("div",{className:a.className,style:{width:"".concat(a.percent)}},a.length," ",e.lengthScale)}));return l.a.createElement("div",{className:"distanceMeter"},a)},L=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleChange=t.handleChange.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleChange",value:function(){}},{key:"render",value:function(){var e=this.props.lengthScale,a=function(e){for(var a,t=[e.overRatedLength,e.ratedLength,e.underRatedLength,-1],n=["overRated","rated","underRated","noVoltage"],l=e.totalLength?e.totalLength:100,i=[],r=0,c=0;c<t.length;c++){var s=t[c]<=0?"No Voltage":t[c],h=s-(c>0?t[c-1]:0);h+r<l?(r+=h,a=N(h,l),i[c]={className:n[c],percent:a,length:s}):l>r?(h=l-r,r=l,a=N(h,l),i[c]={className:n[c],percent:a,length:s}):r>=l&&(a=N(h,l),i[c]={className:n[c],percent:"0%",length:s})}return i}(this.props);return l.a.createElement("div",null,l.a.createElement("legend",null,this.props.legendTitle),l.a.createElement(w,{barList:a,lengthScale:e}))}}]),a}(l.a.Component),B=function(e){var a=0,t=e.list.map((function(e){return l.a.createElement("option",{key:a,value:a++}," ",e," ")}));return l.a.createElement("select",{onChange:e.onChange,onClick:e.onClick},t)},W=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleChange=t.handleChange.bind(Object(d.a)(t)),t.handleClick=t.handleClick.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleChange",value:function(e){this.props.onSelect(e.target.value)}},{key:"handleClick",value:function(){this.props.onClick(this.props.scale)}},{key:"render",value:function(){var e=this.props.scale,a=this.props.items;return l.a.createElement("fieldset",null,l.a.createElement(B,{list:a,onChange:this.handleChange,onClick:this.handleClick}),e)}}]),a}(l.a.Component),A=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleChange=t.handleChange.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleChange",value:function(e){this.props.onValueChange(e.target.value)}},{key:"render",value:function(){var e=this.props.inputValue,a=this.props.unit;return l.a.createElement("fieldset",null,l.a.createElement("legend",null," Enter ",S[a]," "),l.a.createElement("div",null,l.a.createElement("input",{value:e,onChange:this.handleChange})))}}]),a}(l.a.Component),F=function(e,a){var t=M[e].k*(1+M[e].tempCo*(a-20));return Math.round(1e3*t)/1e3},D=function(e,a){return 100*e/a},G=function(e,a){return e/100*a},P=function(e,a,t,n,l,i,r,c){var s=r*n/100*i/(e*(1===a?2:Math.sqrt(3))*t);return s=Number.isNaN(s)?s=0:s,s="m"===c?I(s,R):s,Math.round(100*s)/100},T=function(e){var a=e;if("."!==a.charAt(a.length-1)||a.indexOf(".")<a.length-1){if("0"===a.charAt(a.length-1)&&1===function(e,a){for(var t=0,n=0;n<a.length;n++)a.charAt(n)===e&&t++;return t}(".",a))return a;var t=parseFloat(e);return Number.isNaN(t)?" ":Math.round(1e3*t)/1e3}return a},I=function(e,a,t){var n=parseFloat(e);if(Number.isNaN(n))return" ";var l=a(n,t);return Math.round(1e3*l)/1e3},R=function(e){return e/3.281},q=function(e){return 3.281*e},z=function(e,a){return e/a},J=function(e,a){return e*a},H=function(e,a,t,n,l){var i=3===e?Math.sqrt(3):2;return Math.round(i*a*t*n*1e3/l)/1e3},U=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).handleLChange=t.handleLChange.bind(Object(d.a)(t)),t.handleMetalChange=t.handleMetalChange.bind(Object(d.a)(t)),t.handlePVDChange=t.handlePVDChange.bind(Object(d.a)(t)),t.handleVDChange=t.handleVDChange.bind(Object(d.a)(t)),t.handleWattChange=t.handleWattChange.bind(Object(d.a)(t)),t.handleAmpChange=t.handleAmpChange.bind(Object(d.a)(t)),t.handleFootChange=t.handleFootChange.bind(Object(d.a)(t)),t.handleMeterChange=t.handleMeterChanged.bind(Object(d.a)(t)),t.handleAWGChange=t.handleAWGChange.bind(Object(d.a)(t)),t.handlekcmilsChange=t.handlekcmilsChange.bind(Object(d.a)(t)),t.handleWireClick=t.handleWireClick.bind(Object(d.a)(t)),t.handleVoltageChange=t.handleVoltageChange.bind(Object(d.a)(t)),t.handleVoltageClick=t.handleVoltageClick.bind(Object(d.a)(t)),t.handlePhaseChange=t.handlePhaseChange.bind(Object(d.a)(t)),t.handlePhaseClick=t.handlePhaseClick.bind(Object(d.a)(t)),t.handleMetalChange=t.handleMetalChange.bind(Object(d.a)(t)),t.handleMetalClick=t.handleMetalClick.bind(Object(d.a)(t)),t.handleTempChange=t.handleTempChange.bind(Object(d.a)(t)),t.state={temperature:20,k:10.4,metal:"copper",vdScale:"",vd:0,vdMag:0,voltage:120,amps:0,powMag:0,powScale:"",phase:1,distance:0,disScale:" ",length:0,wireScale:" ",wireMag:0,wireIndex:0,cmils:0,calcScale:""},t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"handleLChange",value:function(e){this.setState({length:e})}},{key:"handleVoltageChange",value:function(e){var a=E[e];this.setState({voltage:a})}},{key:"handleVoltageClick",value:function(e){}},{key:"handleAmpChange",value:function(e){var a=T(e);this.setState({powScale:"amps",powMag:a,amps:a})}},{key:"handleWattChange",value:function(e){var a=T(e),t=I(a,z,this.state.voltage);this.setState({powScale:"p",powMag:a,amps:t})}},{key:"handlePhaseChange",value:function(e){var a=O[e];this.setState({phase:a})}},{key:"handlePhaseClick",value:function(e){}},{key:"handleFootChange",value:function(e){var a=T(e);this.setState({disScale:"ft",distance:a,length:a})}},{key:"handleMeterChanged",value:function(e){var a=T(e),t=I(a,q);this.setState({disScale:"m",distance:a,length:t})}},{key:"handleMetalChange",value:function(e){var a=j[e],t=F(a,this.state.temperature);this.setState({metal:a,k:t})}},{key:"handleTempChange",value:function(e){var a=T(e),t=F(this.state.metal,a);this.setState({temperature:a,k:t})}},{key:"handleWireClick",value:function(e){}},{key:"handleAWGChange",value:function(e){var a=1e3*parseFloat(x[e]),t=parseInt(e);this.setState({calcScale:"CM",wireIndex:t,wireScale:"AWG",cmils:a})}},{key:"handlekcmilsChange",value:function(e){var a=1e3*parseFloat(x[e]),t=parseInt(e);this.setState({calcScale:"CM",wireIndex:t,wireScale:"CM",cmils:a})}},{key:"handleVDChange",value:function(e){var a=T(e),t=a>this.state.voltage?this.state.voltage:a;this.setState({calcScale:"VD",vdScale:"vd",vdMag:t,vd:t})}},{key:"handlePVDChange",value:function(e){var a=T(e),t=I(a=a>100?100:a,G,this.state.voltage);this.setState({calcScale:"VD",vdScale:"pvd",vdMag:a,vd:t})}},{key:"handleMetalClick",value:function(){}},{key:"render",value:function(){var e=this.state.phase,a=this.state.k,t=this.state.amps,n=this.state.length,i=this.state.voltage,r=(this.state.watts,this.state.powScale),c=this.state.powMag,s="p"===r?I(c,z,i*Math.sqrt(e)):c,h="amps"===r?I(c,J,i*Math.sqrt(e)):c,u=this.state.disScale,o=this.state.distance,d="ft"===u?I(o,R):o,m="m"===u?I(o,q):o,g=this.state.vdScale,p=this.state.wireScale,v=this.state.calcScale,C="VD"===v?function(e,a,t,n,l){var i=3===e?Math.sqrt(3):2;return Math.round(i*a*t*n/l)}(e,a,t,n,this.state.vd):this.state.cmils,k="VD"===v?function(e,a){for(var t=0;t<a.length;t++)if(e<a[t])return t}(C/1e3,x):this.state.wireIndex,f=function(e,a,t,n,l,i,r,c){return e(a,t,n,l,i,r,c)}(H,e,a,t,n,C),b="CM"===v?"vd"===g?f:I(f,D,i):this.state.vdMag,y=[x[k],"CM Select"],S=V.length>k?[V[k],"AWG Select"]:["no AWG","AWG Select"],M="pvd"===g?I(b,G,i):b,N="vd"===g?I(b,D,i):b,w="AWG"===p||"VD"===v?y:x,B="CM"===p||"VD"===v?S:V,F=this.state.length,T="m"==u?I(F,R):F,U=1e3*x[k+1],_=1e3*x[k-1];return l.a.createElement("div",null,l.a.createElement("fieldset",null,l.a.createElement("legend",null," Voltage Properties "),l.a.createElement("div",{className:"fieldFlex"},l.a.createElement("div",{className:"flexBox"},l.a.createElement(W,{scale:"Volts",items:E,onSelect:this.handleVoltageChange,onClick:this.handleVoltageClick})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(W,{scale:"Phases",items:O,onSelect:this.handlePhaseChange,onClick:this.handlePhaseClick})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"vd",inputValue:M,onValueChange:this.handleVDChange})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"pvd",inputValue:N,onValueChange:this.handlePVDChange})))),l.a.createElement("fieldset",null,l.a.createElement("legend",null," Instulation properties"),l.a.createElement("div",{className:"fieldFlex"},l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"amps",inputValue:s,onValueChange:this.handleAmpChange})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"p",inputValue:h,onValueChange:this.handleWattChange})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"ft",inputValue:m,onValueChange:this.handleFootChange})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(A,{unit:"m",inputValue:d,onValueChange:this.handleMeterChange})))),l.a.createElement("fieldset",null,l.a.createElement("legend",null," Wire Properties "),l.a.createElement("div",{className:"fieldFlex"},l.a.createElement("div",{className:"flexBox"},l.a.createElement(W,{scale:"Metals",items:j,onSelect:this.handleMetalChange,onClick:this.handleMetalClick})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(W,{scale:"AWG",items:B,onSelect:this.handleAWGChange,onClick:this.handleWireClick})),l.a.createElement("div",{className:"flexBox"},l.a.createElement(W,{scale:"kcmils",items:w,onSelect:this.handlekcmilsChange,onClick:this.handleWireClick})),l.a.createElement(A,{unit:"temp",inputValue:this.state.temperature,onValueChange:this.handleTempChange}))),l.a.createElement(L,{legendTitle:"One wire size larger",lengthScale:this.state.disScale,totalLength:T,overRatedLength:P(a,e,t,i,0,U,3,u),ratedLength:P(a,e,t,i,0,U,5,u),underRatedLength:P(a,e,t,i,0,U,100,u)}),l.a.createElement(L,{legendTitle:"Selected wire size",lengthScale:this.state.disScale,totalLength:T,overRatedLength:P(a,e,t,i,0,C,3,u),ratedLength:P(a,e,t,i,0,C,5,u),underRatedLength:P(a,e,t,i,0,C,100,u)}),l.a.createElement(L,{legendTitle:"One wire size smalerl",lengthScale:this.state.disScale,totalLength:T,overRatedLength:P(a,e,t,i,0,_,3,u),ratedLength:P(a,e,t,i,0,_,5,u),underRatedLength:P(a,e,t,i,0,_,100,u)}))}}]),a}(l.a.Component),_={headerTabs:[{name:"Home",key:"0",children:[{display:!0,feature:U,key:"0.1"}]},{name:"Web Apps",key:"1",children:[{name:"Back",key:"Back",children:[{display:"Back",action:!0,key:"up"}]},{name:"CEC Asist",key:"1.1",children:[{display:!0,key:"1.1.2"}]},{name:"Convertion Calculators",key:"1.2",children:[{display:!0,feature:b,key:"1.2.1"}]},{name:"Fractal Generator",key:"1.3",children:[{display:!0,key:"1.3.1"}]}]},{name:"CSS Styles",key:"2",children:[{name:"Back",key:"Back",children:[{display:"Back",action:!0,key:"up"}]},{name:"Calculators",key:"2.1",children:[{display:!0,action:!0,key:"2.1.1"}]},{name:"Examples",key:"2.2",children:[{display:!0,key:"2.2.1"}]},{name:"Animation",key:"2.3",children:[{name:"Back",key:"Back",children:[{display:"Back",action:!0,key:"up"}]},{name:"Group 1",key:"2.3.1",children:[{display:!0,key:"2.3.1.1"}]},{name:"Group2",key:"2.3.2",children:[{display:!0,key:"2.3.1.2"}]}]}]},{name:"Games",key:"3",children:[{name:"Back",key:"Back",children:[{display:"Back",action:!0,key:"up"}]},{name:"Game1",key:"3.1",children:[{display:!0,key:"3.1.1"}]},{name:"Game2",key:"3.2",children:[{display:!0,key:"3.1.2"}]}]},{name:"About",key:"4",children:[{display:!0,key:"4.1"}]}]},K=function(e){for(var a=[],t=0;t<e.length;t++)a[t]=!1;return a},Q=function(e){function a(e){var t;return Object(s.a)(this,a),(t=Object(u.a)(this,Object(o.a)(a).call(this,e))).state={selectMap:[!0,!1,!1,!1,!1],lastactiveId:null,activeSiblings:_.headerTabs,navList:[],featured:U},t.handleChildClick=t.handleChildClick.bind(Object(d.a)(t)),t}return Object(m.a)(a,e),Object(h.a)(a,[{key:"handleChildClick",value:function(e){var a=this.state,t=e.target.id,n=a.lastactiveId,l=a.selectMap,i=a.navList,r=i.length,c=a.activeSiblings[t].children,s=a.activeSiblings,h=i[r-1];switch(c[0].display){case"Back":i.pop();var u=K(h);this.setState({activeSiblings:h,selectMap:u,navList:i});break;case void 0:var o=K(c);i[r]=s,console.log(s),this.setState({activeSiblings:c,selectMap:o,navList:i,feature:null});break;case!0:a.selectMap[n];for(var d=c[0].feature,m=0;m<l.length;m++)l[m]=!1;l[t]=!0,this.setState({lastactiveId:t,featured:d})}}},{key:"render",value:function(){var e=function(e,a){var t=a.activeSiblings.map((function(t,n){return l.a.createElement("h3",{onClick:e,key:t.key,id:n,className:!1===a.selectMap[n]?"tab":"active"},t.name)}));return l.a.createElement("div",{className:"tabContainer"},t)}(this.handleChildClick,this.state),a=this.state.featured||function(){return l.a.createElement("div",null," Page Missing")};return l.a.createElement("div",null,l.a.createElement("div",{className:"navBarContainer"},e),l.a.createElement("div",null,l.a.createElement(a,null)))}}]),a}(l.a.Component),X=(t(30),[{name:"rgb",colors:[{name:"alpha",type:"range",min:"0",max:"1000",value:"defaultValue",class:"colorSlider",id:"alphaSlider",key:0},{name:"red",type:"range",min:"0",max:"255",value:"defaultValue",class:"colorSlider",id:"redSlider",key:1},{name:"green",type:"range",min:"0",max:"255",value:"defaultValue",class:"colorSlider",id:"greenSlider",key:2},{name:"blue",type:"range",min:"0",max:"255",value:"defaultValue",class:"colorSlider",id:"blueSlider",key:3}]},{name:"hs1",colors:[{name:"alpha",type:"range",min:"0",max:"1",value:"defaultValue",class:"colorSlider",id:"alphaSlider",key:0},{name:"hue",type:"range",min:"0",max:"360",value:"defaultValue",class:"colorSlider",id:"hueSlider",key:4},{name:"saturation",type:"range",min:"0",max:"100",value:"defaultValue",class:"colorSlider",id:"saturationSlider",key:5},{name:"lightness",type:"range",min:"0",max:"100",value:"defaultValue",class:"colorSlider",id:"lightSlider",key:6}]}]),Y=function(e,a,t,n,l){return"rgb"==e?{backgroundColor:"rgba(".concat(l,")")}:{backgroundColor:"hsla(".concat(l,")")}},Z=(l.a.Component,t(17)),$=function(){return l.a.createElement(Z.a,null,l.a.createElement("div",{className:"app"},l.a.createElement(c,null),l.a.createElement(Q,null)))};r.a.render(l.a.createElement($,null),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.796ca652.chunk.js.map