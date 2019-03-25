import React from 'react';

import './Office.css';

import OfficeInfo from './OfficeInfo.js';
import NewOffice from './NewOffice';

//material UI imports
import Button from '@material-ui/core/Button';
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
        case 4:
            return {
                country: "USA",
                city: "Portland",
                address: "Test Address"
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
		
		/*const request = new Request('/poop',{
			method: 'POST',
			body: JSON.stringify({foo: "bar"}),
			headers: {"Content-Type": "application/json"}
		});
			
		fetch(request).then(res => res.text()).then(text => {
			console.log(text);
			this.updateState({pageToShow : 'other'});
		});*/

        const offices = [createMockOffice(1), createMockOffice(2), createMockOffice(3), createMockOffice(4)]
		
		this.state= {
			//an array of objects with data about each office
            offices: offices,
			
			//the current page to show, one of
			//'list', 'info', 'new'
			pageToShow : 'list',
			
			//the office to currently display details for
			//iff pageToShow == 'info'
			officeToShow : null
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
				{/*when the new office button is clicked, go to new office page*/}
				<Button onClick= {()=>{this.setPageToShow('new')}}>
					Add New
				</Button>
			</div>
		);
	}
	
	render(){		
		switch(this.state.pageToShow){
			case 'list':
				return this.renderOfficeList();
			case 'info':
				return (
					<OfficeInfo office= {this.state.officeToShow}
								returnToList= {() => this.setPageToShow('list')}/>
				);
			case 'new':
				return (
					<NewOffice returnToList= {() => this.setPageToShow('list')}
							   addOffice= {this.addOffice}/>
				);
			default:
				return (
					<div>
						Error: unexpected pageToShow in Office.js<br/>
						pageToShow= {this.state.pageToShow}
					</div>
				);
		}
	}
	
	/* add the given office to the database
	 */
	addOffice(office){
		//TODO - no duplicate offices
		//we must have all three properties
		if(!office.country || !office.city || !office.address){
			console.log("bad office");
			return false;
		}
		
		//send office to the DB
		const request = new Request('/new_office',{
			method: 'POST',
			body: JSON.stringify(office),
			headers: {"Content-Type": "application/json"}
		});
		
		fetch(request).then(res => {
			//if we successfully updated the DB
			if(res.ok){
				//add the office
				this.updateState({
					offices : this.state.offices.append(office)
				});
				console.log("added " + office);
			}
		});
		
		return true;
	}
	
	setOffices(offices) {
        this.updateState({offices : offices});
    }
	
	/* set the office to display details for
	 * also sets  pageToShow to 'info'
	 * @param office the office object for which the details page
	 *					should be displayed.
	 */
	setOfficeToShow(office){
		this.updateState({
			officeToShow : office,
			pageToShow : 'info'
		});
	}
	
	/* set the page to show
	 * @param page should be one of
				'list' - show the list
				'info' - show the office info for this.state.officeToShow
				'new'  - show the new office page
	 */
	 setPageToShow(page){
		 this.updateState({pageToShow : page});
	 }
	 
	 /* set the new state, changing only those pieces of state passed in
	  * as an object 'changes', i.e, to change just offices, call
	  * updateState({offices : newOffices}),
	  * to change page to show and office to show, call
	  * updateState({pageToShow : newPage, officeToShow : newOffice})
	  */
	 updateState(changes){
		 //copy the state
		 var newState= {};
		 
		 let key;
		 for(key in this.state){
			 newState[key]= this.state[key];
		 }
		 
		 //make updates
		 for(key in changes){
			 newState[key]= changes[key];
		 }

		 this.setState(newState);
	 }
}

// ========================================

export default Offices;

