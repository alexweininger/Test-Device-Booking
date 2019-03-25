import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NewOffice extends React.Component {
	constructor(props){
		super(props);
		
		this.state= {
			country : null,
			city : null,
			address : null
		};
	}
	
	render(){
		return (
			<div>
				<Typography variant= {'headline'}>
					Add New Office
				</Typography>
				<TextField label={"Country"}
							defaultValue= {this.state.country}
						   onChange= {event => this.updateState('country', event)} />
				<TextField label={"City"}
							defaultValue= {this.state.city}
						   onChange= {event => this.updateState('city', event)} />
				<TextField label={"Address"}
							defaultValue= {this.state.address}
						   onChange= {event => this.updateState('address', event)} />
				
				<div />
				
				<Button onClick= {() => this.props.addOffice(this.state)}>
					Create
				</Button>
				<Button onClick= {() => this.props.returnToList()}>
					Cancel
				</Button>
			</div>
		);
   }
   
   /* update the state to reflect that a field should be changed
    * be the given event
    * the component does not need to be rerendered
	*/
   updateState(field, event){
	   //this gives a warning, but ignore it because the state
	   //is not used for rendering
	   this.state[field]= event.target.value;
   }
}

export default NewOffice;