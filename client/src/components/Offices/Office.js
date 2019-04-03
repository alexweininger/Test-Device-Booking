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
import TableHead from '@material-ui/core/TableHead';

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

  	this.getOfficesFromDb();

		this.state= {
			//an array of objects with data about each office
            offices: {},

			//the current page to show, one of
			//'list', 'info', 'new'
			pageToShow : 'list',

			//the office to currently display details for
			//iff pageToShow == 'info'
			officeToShow : null
		}
    }

    setOffices(data) {
        this.state.offices = {
            country: data.Country,
            city: data.City,
            address: data.Address
        };
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
                    <TableHead>
                        <TableRow>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Address</TableCell>
                        </TableRow>
                    </TableHead>
					<TableBody>
							{/*render the list of offices, they are table rows*/}
							{Object.keys(this.state.offices).map(officeID => 
								this.renderOffice(this.state.offices[officeID],i++))};
								
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
				console.log(this.state);
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
				this.getOfficesFromDb();
				this.setPageToShow("info");
			}
		});

		return true;
    }

    /* Gets all the offices from the db, then updates the state.
     * If there is an error it will be displayed in the console
     */
    getOfficesFromDb() {
        const request = new Request('/get_offices', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        // Create a list to return.
        let rtrnList = {};

        fetch(request).then(res => res.json()).then(result => {
            //if success then update the office list
            if (result.success) {
                const officeList = result.offices;
                // Reformat the offices by iterating through them all
                let office, i;
                for (i in officeList) {
                    office = officeList[i];  // current office pointer
                    rtrnList[i] = {
                        id: office.id_Office,
                        country: office.Country,
                        city: office.City,
                        address: office.Address
                    };
                }
                console.log(rtrnList);
                this.updateState({ offices: rtrnList });
            }
            else {
                console.log("Error");
            }
        }).catch(err => {
            console.log(err);
        });
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

export default Offices;
