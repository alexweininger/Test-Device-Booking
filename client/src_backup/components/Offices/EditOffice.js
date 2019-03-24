import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

function EditOffice(props){
	return(
		<div>
			<div className= "space"></div>
			<table className= "box">
				<tbody>
					<tr>
						<td className= "label">Country:</td>
						<td className= "data">
							<TextField
								id="Country"
								margin="normal"
								defaultValue={props.office.country}
							/>
						</td>
					</tr>
					<tr>
						<td className= "label">City:</td>
						<td className= "data">
							<TextField
								id="City"
								margin="normal"
								defaultValue={props.office.city}
							/>
						</td>
					</tr>
					<tr>
						<td className= "label">Address:</td>
						<td className= "data">
							<TextField
								id="Address"
								margin="normal"
								defaultValue={props.office.address}
							/>
						</td>
					</tr>
				</tbody>
			</table>
			<Button onClick = {() => props.returnToInfo()}>
				Submit
			</Button>
			<Button onClick = {() => props.returnToInfo()}>
				Cancel
			</Button>
		</div>
	);
	
}

export default EditOffice;