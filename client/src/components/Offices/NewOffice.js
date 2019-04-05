import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NewOffice extends React.Component {
	constructor(props){
		super(props);
		
		this.state= {
			office : {
				country : "USA",
				city : "Portland",
				address : "32945"
			},
			message : null
		};
	}
	
	render(){
		return (
			<div>
				<Typography variant= {'h4'}>
					Add New Office
				</Typography>
				<TextField label={"Country"}
							defaultValue= {this.state.office.country}
						   onChange= {event => this.updateOffice('country', event)} />
				<TextField label={"City"}
							defaultValue= {this.state.office.city}
						   onChange= {event => this.updateOffice('city', event)} />
				<TextField label={"Address"}
							defaultValue= {this.state.office.address}
						   onChange= {event => this.updateOffice('address', event)} />
				
				<div />
				
				<Button onClick= {() => this.addOffice()}>
					Create
				</Button>
				<Button onClick= {() => this.props.returnToList()}>
					Cancel
				</Button>
				<Typography variant= {'body1'}>
					{this.state.message}
				</Typography>
			</div>
		);
   }
   
   addOffice(){
	   //attempt to add this office
	   let success= this.props.addOffice(this.state.office);
	   
	   //if we added the office, go back to the list
	   if(success){
		  this.props.returnToList(); 
	   }
	   //otherwise, show the error message
	   else{
		   this.setState({
			   office : this.state.office,
			   message : 'Invalid Office'
		   });
	   }
   }
   
   /* update the state to reflect that a field should be changed
    * be the given event
    * the component does not need to be rerendered
	*/
   updateOffice(field, event){
	   //this gives a warning, but ignore it because the state
	   //is not used for rendering
	   this.state.office[field]= event.target.value;
   }
}

export default NewOffice;