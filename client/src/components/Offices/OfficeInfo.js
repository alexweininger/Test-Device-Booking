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
		this.state = {
						pageToShow : "info",
						office: this.props.office
					}
		this.updateOfficeInfo = this.updateOfficeInfo.bind(this);
	}
	
	//sets state variable pageToShow to page
	setPageToShow(page){
		const newState={
			pageToShow : page
		}
		this.setState(newState);
	}
		
	updateOfficeInfo(office){
		
		//call update state
		this.updateState(office);
		this.props.editOffice(office);
	}
	//returns Office Info page
	renderOfficeInfo(){
		return (
			<div>
				<Button onClick= {() => this.props.returnToList()}>
					<ArrowBack />
					Back to the list
				</Button>
				<div className= "space"></div>
				<table className= "box">
					<tbody>
						<tr>
							<td className= "label">Country:</td>
							<td className= "data">{this.state.office.country}</td>
						</tr>
						<tr>
							<td className= "label">City:</td>
							<td className= "data">{this.state.office.city}</td>
						</tr>
						<tr>
							<td className= "label">Address:</td>
							<td className= "data">{this.state.office.address}</td>
						</tr>
					</tbody>
				</table>
				<Button onClick={() => {this.setPageToShow('edit')}}>
					Edit Office
				</Button>
			</div>
		);
	}
	
	//renders appropriate page based on state variable pageToShow
	render(){
		switch(this.state.pageToShow){
			case 'info':
				return this.renderOfficeInfo();
			case 'edit':
				return (
					<EditOffice office = {this.state.office}
						returnToInfo= {() => this.setPageToShow('info')} 
						updateOfficeInfo = {this.updateOfficeInfo}
					/>
				);
			default:
				return (
					<div>
						Error: unxpected pageToShow in OfficeInfo<br/>
						pageToShow= {this.state.pageToShow}
					</div>
				);
		}
	};
	
	updateState(officeUpdate){
		 //copy the state
		 var newState= {
				pageToShow : "info",
				office: officeUpdate
		};
		 
		
		this.setState(newState);
	 }
}


export default OfficeInfo;