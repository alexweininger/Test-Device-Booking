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
		this.state = {pageToShow : "info"}
	}
	
	//sets state variable pageToShow to page
	setPageToShow(page){
		const newState={
			pageToShow : page
		}
		this.setState(newState);
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
					<EditOffice office = {this.props.office}
						returnToInfo= {() => this.setPageToShow('info')}/>
				);
		}
	};
		
}


export default OfficeInfo;