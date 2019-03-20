import React from 'react';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import EditOffice from './EditOffice';
/* render a component for the office details
 * @param props an object with properties for this office including
				-office an object with data about the office to display
				-returnToList a function to call when the "back to list" button
								is pressed
				-onDataChange a function to call when the office is edited
								calls with signiture onDataChange(office : object)
								where office is the new data for the office
 */
class OfficeInfo extends React.Component{
	constructor(props) {
		super(props);
		this.showEditOffice = this.showEditOffice.bind(this);
		this.state = {officeToShow : "Info"}
	}
	
	showEditOffice(){
		this.setState({officeToShow: "Edit"});
	}
		
	renderEditOffice(){
		return(
			<EditOffice office = {this.props.office}/>
		);	
	}
	
	renderOfficeInfo(){
		return (
			<div>
				<Button>
					<ArrowBack />
					Back to the list
				</Button>
				<div className= "space"></div>
				<table className= "box">
					<tbody>
						<tr>
							<td className= "label">Country:</td>
							<td className= "data">{this.props.office.country}</td>
						</tr>
						<tr>
							<td className= "label">City:</td>
							<td className= "data">{this.props.office.city}</td>
						</tr>
						<tr>
							<td className= "label">Address:</td>
							<td className= "data">{this.props.office.address}</td>
						</tr>
					</tbody>
				</table>
				<Button onClick={this.showEditOffice}>
					Edit Office
				</Button>
			</div>
		);
	}
	
	render(){
		if(this.state.officeToShow === "Edit"){
			return this.renderEditOffice();
		}
		else if(this.state.officeToShow === "Info"){
			return this.renderOfficeInfo();
		}
	};
		
}


export default OfficeInfo;