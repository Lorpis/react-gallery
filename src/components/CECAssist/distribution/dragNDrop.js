import React from 'react';
import ReactDOM from 'react-dom';
import  './distribution.css';

class AppDragDropDemo extends React.Component {  
	constructor(props){
		super(props);
		this.onDragOver = this.onDragOver.bind(this);
		
		this.onDrop = this.onDrop.bind(this);

		this.state = {             
			tasks: [
				{
				name:"Learn Angular",
				category:"wip",
				bgcolor: "yellow"},
				{
				name:"Learn React",
				category:"wip",
				bgcolor: "red"},
				{
				name:"Learn python",
				category:"complete",
				bgcolor: "green"},

				{
				name:"C#",
				category:"complete",
				bgcolor: "orange"}
			]
		}
	}
	onDragStart (ev, id) {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

	onDragOver(e) {
		e.preventDefault (); 
	}

	 onDrop(ev, cat) {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }
           return task;
       });
       
       this.setState({
         
           tasks
       });
    }


	render() { 
		var task = { 
			wip: [],                
			complete: []          
		}          
	this.state.tasks.forEach ((t) => { 
		task[t.category].push(
			<div       
				key={t.name}
				onDragStart={(e)=>this.onDragStart(e, t.name)}
				draggable                                                   
				className="draggable"                          
				style={{backgroundColor: t.bgcolor}}>                                
				{t.name}                    
			</div>);         
	}); 


	return (
		<div className="container-drag">     
			<div className="dndheader"> DRAG & DROP DEMO</div>
		    <div className = "field"> 

				<div className="wip"        
					onDragOver={(e)=>this.onDragOver(e)}                           
					onDrop={(e)=>{this.onDrop(e, "wip")}}>                         
					<span className="task-header">WIP</span>                          
					{task.wip}                     
				</div>   

				<div className=" "      
					onDragOver={(e)=>this.onDragOver(e)}                          
					onDrop={(e)=>this.onDrop(e, "complete")}>                           
					<span className="task-header">COMPLETED</span>                           
					{task.complete}                     
				</div>

			</div>
		</div>
		);
	}
};

export default AppDragDropDemo;

		/*
	render () { 
		var tasks = {
			option:[],
			placed:[]
		}


		this.state.tasks.forEach((item) => {	  
			return (      
				<div> 
				DRAG & DROP DEMO
				</div> 
			)//return
		} );//foreach
	}//render															
};//class

export default AppDragDropDemo;
*/