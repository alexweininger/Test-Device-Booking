import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

class EditOffice extends React.Component{
	constructor(props){
		super(props);
		
		this.state = {
			id: this.props.office.id,
			country: this.props.office.country,
			city: this.props.office.city,
			address: this.props.office.address
		}
	}
	
	render(){
		console.log(this.props);
		return (
			<div>
				<Typography variant= {'headline'}>
					Edit Office
				</Typography>
				<TextField label={"Country"}
							defaultValue= {this.props.office.country}
						   onChange= {event => this.updateState('country', event)} />
				<TextField label={"City"}
							defaultValue= {this.props.office.city}
						   onChange= {event => this.updateState('city', event)} />
				<TextField label={"Address"}
							defaultValue= {this.props.office.address}
						   onChange= {event => this.updateState('address', event)} />
				
				<div />
				
				<Button onClick= {() => this.props.updateOfficeInfo(this.state)}>
					Submit
				</Button>
				<Button onClick= {() => this.props.returnToInfo()}>
					Cancel
				</Button>
			</div>
		);		
	}
	updateState(field, event){
		this.state[field] = event.target.value;
	}
}


export default EditOffice;