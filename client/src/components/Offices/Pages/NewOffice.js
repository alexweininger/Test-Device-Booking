import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class NewOffice extends React.Component{
	constructor(props){
		super(props);
		
		this.state= {
			country: null,
			city: null,
			address: null
		}
	}
	
	render(){
		return (
			<div>
				<Typography variant= {'headline'}>
					Add New Office
				</Typography>
				<TextField label={"Country"} />
				<TextField label={"City"} />
				<TextField label={"Address"} />
				
				<div />
				
				<Button onClick= {() => this.props.returnToList()}>
					Create
				</Button>
				<Button onClick= {() => this.props.returnToList()}>
					Cancel
				</Button>
			</div>
		);
	}
}

export default NewOffice;