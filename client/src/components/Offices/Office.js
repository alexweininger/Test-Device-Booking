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
				id: 1,
				country : "USA",
				city : "Portland",
				address : "5118 N Yale St."
			};
		case 2:
			return {
				id: 2,
				country : "Lietuva",
				city : "Vilnius",
				address : "Zalgirio 135"
			};
		case 3:
			return {
				id: 3,
				country : "Lietuva",
				city : "Kaunas",
				address : "Juozapaviciaus 11D"
            };
        case 4:
            return {
				id: 4,
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
		this.editOffice = this.editOffice.bind(this);
		this.addOffice = this.addOffice.bind(this);

		const offices = {1: createMockOffice(1), 2: createMockOffice(2), 3: createMockOffice(3), 4: createMockOffice(4)}
        
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

    getOfficesFromDb() {
        fetch('/')
        .then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (data) {
            console.log({ Offices: data });
            return data;
        }).catch(err => {
            console.log('caught it!', err);
        });
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
							{Object.keys(this.state.offices).map(officeID => 
								this.renderOffice(this.state.offices[officeID],i++))};
								{/*{this.state.offices.keys.map(office => this.renderOffice(office,i++))}*/}
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
								returnToList= {() => this.setPageToShow('list')}
								editOffice= {this.editOffice}/>
				);
			case 'new':
				return (
					<NewOffice returnToList= {() => this.setPageToShow('list')}
							   addOffice= {this.addOffice}
					/>
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
		console.log("callded_");
		if(!this.officeCanBeAdded(office)){
			return false;
		}

		//send office to the DB
		const request = new Request('/new_office',{
			method: 'POST',
			body: JSON.stringify(office),
			headers: {"Content-Type": "application/json"}
		});

		fetch(request).then(res => res.json()).then(result => {
			//if we successfully updated the DB
			if(result.success){
				//add the office
				office.id= result.officeId;
				this.state.offices[result.officeId]= office;
				this.updateState({
					offices : this.state.offices
				});
			}
		});

		return true;
	}
	
	/* return whether this office is a valid office to add to the list
	 * checks that each entry is non-null, 
	 * and that this is not a duplicate office
	 */
	officeCanBeAdded(office){
		//we must have all three properties
		if(!office.country || !office.city || !office.address){
			return false;
		}
		
		let country= office.country.trim().toLowerCase();
		let city= office.city.trim().toLowerCase();
		let address= office.address.trim().toLowerCase().replace('.',"");
		
		//check if this entry office is already in the list
		for(let officeId in this.state.offices){
			let currOffice= this.state.offices[officeId];
			
			//if this office matches the input office
			if(country == currOffice.country.trim().toLowerCase()
				&& city == currOffice.city.trim().toLowerCase()
				&& address == currOffice.address.trim().toLowerCase().replace('.','')){
				
				return false;
			}
		}
		
		return true;
	}

	/* edit the office selected
	 */
	editOffice(office){
		console.log(office);
		console.log("Inside Edit Office");
		//TODO - no duplicate offices
		//we must have all three properties
		if(!office.country || !office.city || !office.address){
			console.log("bad office");
			return false;
		}

		//send updated office to the server
		const request = new Request('/edit_office',{
			method: 'POST',
			body: JSON.stringify({
				officeToChange: (this.state.officeToShow.id),
				updatedOffice: (office)
			}),
			headers: {"Content-Type": "application/json"}
		});
		var officeId = this.state.officeToShow.id;
		fetch(request).then(res => {
			//if we successfully updated the DB
			if(res.ok){	
				this.state.offices[this.state.officeToShow.id] = office;
				console.log("Edited " + office);
				this.setPageToShow("info");
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
