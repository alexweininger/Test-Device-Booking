import React from 'react';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

function NewOffice(props){
	return (
		<div>
			<Typography variant= {'headline'}>
				Add New Office
			</Typography>
			<TextField label={"Country"} />
			<TextField label={"City"} />
			<TextField label={"Address"} />
			
			<div />
			
			<Button onClick= {() => props.returnToList()}>
				Create
			</Button>
			<Button onClick= {() => props.returnToList()}>
				Cancel
			</Button>
		</div>
	);
}

export default NewOffice;