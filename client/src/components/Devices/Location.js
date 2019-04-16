import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';

/*function LocationItem(props) {
	return (
		<TableRow className="locationItem">
			<TableCell className= "locationEntry">{props.location.name} </TableCell>
		</TableRow>
	);
}*/

class Locations extends React.Component {

	constructor(props) {
		super(props);

		this.state= {
            offices: []
		}

		this.getLocationsFromServer();
    }
	

	render(){
		const offices = this.state.offices || [];

		return (
			<div>
				{offices.map(office => 
				
				<FormControlLabel style={{marginRight: 85}} control={<Checkbox value="checkedC" />} label={office.city}>
					
				</FormControlLabel>
				)}
			</div>
		)
	}

	/*updateState(changes){
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
	}*/

	getLocationsFromServer(){
		const request = new Request('/get_officeLocation', {
			method : 'GET'
		});

		fetch(request).then(res => res.json()).then(result => {
			console.log('result ', result);
			if(result.success){
				this.setState({
					offices : result.offices
				});
			}
		});

		/*const request = new Request('/get_officeLocation', {
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
                        city: office.City
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
	*/
	}
}

export default Locations;
