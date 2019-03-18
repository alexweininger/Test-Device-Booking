import React from 'react';
import ReactDOM from 'react-dom';
import './Office.css';

import OfficeInfo from './OfficeInfo.js';

//material UI imports
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import ArrowBack from '@material-ui/icons/ArrowBack';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

/* create one of three different mocked office datas
 * @param i which office data to return
 */
function createMockOffice(i){
	switch(i){
		default:
		case 1:
			return {
				country : "USA",
				city : "Portland",
				address : "5118 N Yale St."
			};
		case 2:
			return {
				country : "Lietuva",
				city : "Vilnius",
				address : "Zalgirio 135"
			};
		case 3:
			return {
				country : "Lietuva",
				city : "Kaunas",
				address : "Juozapaviciaus 11D"
			};
	}
}




/* renders a single table row with information for a single office
 * that can be added to a table of OfficeItems
 * @param props an object with properties for this office item including
				office - an object with data for this office
				onClick - a function to execute when this table row is clicked
 */
function OfficeItem(props) {
	return (
		<TableRow className="officeItem" onClick= {() => props.onClick()}>
			<TableCell className= "officeEntry">{props.office.country} </TableCell>
			<TableCell className= "officeEntry"> {props.office.city} </TableCell>
			<TableCell className= "officeEntry"> {props.office.address} </TableCell>
		</TableRow>
	);
}

/* A high level component that is able to render,
 * -the list of offices
 * -the office details
 */
class Offices extends React.Component {
	constructor(props) {
		super(props);
		
		const offices= [createMockOffice(1), createMockOffice(2), createMockOffice(3)]
		
		this.state= {
			//an array of objects with data about each office
			offices : offices,
			
			//the office to currently display details for,
			//null if the list should be shown
			officeToShow : null,
		}
	}
	
	/* render a single office list entry
	 * @param office the data for this list entry to display
	 * @param i a key for iterating these list entries
	 */
	renderOffice(office, i){
		return (
			//when an office item is clicked, show its details
			<OfficeItem office= {office}
						key= {i}
						onClick= {() => this.setOfficeToShow(office)}/>
		);
	}
	
	/* render the entire list of offices as a table */
	renderOfficeList(){
		let i= 0;
		return (
			<div>
				<Table>
					<TableBody>
							{/*render the list of offices, they are table rows*/}
							{this.state.offices.map(office => this.renderOffice(office,i++))}
					</TableBody>
				</Table>
				<Button>Add New</Button>
			</div>
		);
	}
	
	render(){
		//if we have not selected an office, show the office list
		if(!this.state.officeToShow){	
			return this.renderOfficeList();
		}
		
		//if we have selected an office, show the office info
		return (
			<OfficeInfo office= {this.state.officeToShow}
						returnToList= {() => this.setOfficeToShow(null)}/>
		);
	}
	
	/* set the office to display details for
	 * @param office the office object for which the details page
	 *					should be displayed. null if the office list
	 *					should be shown
	 */		
	setOfficeToShow(office){
		const newState= {
			offices : this.state.offices,
			officeToShow: office
		}
		
		this.setState(newState);
	}
}

// ========================================

export default Offices;
