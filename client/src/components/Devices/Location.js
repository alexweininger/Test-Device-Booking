import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

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
            locations: []
		}

		this.getLocationsFromServer();
    }
	
	/*state = {
		locations:[]
	}
	componentDidMount(){
		this.getLocations();
	}

	getLocations = _=> {

		fetch('/get_officeLocation')
		.then(response => console.log(response))
		.then(({response}) => this.setState({locations: 'response.locations'}))
		.catch(error => console.log(error));
	} 

	showLocations = location => <div key={location.id}>{location.name}</div>
*/
	/*renderLocation(location, i){
		return (
			<LocationItem location= {location}
						key= {i}
						/>
		);
	}

	renderLocationList(){
		let i = 0;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>City</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(this.state.locations).map( ID =>
							this.renderLocation(this.state.locations[ID],i++))}
					</TableBody>
				</Table>
			</div>
		);
	}*/

	render(){

		/*switch(this.state.pageToShow){
			case 'list':
				return this.renderLocationList();
			default:
				return (
					<div>
						Error: unexpected pageToShow in Location.js<br/>
						pageToShow= {this.state.pageToShow}
					</div>
				);
		}*/

		//const { locations } = this.state;
		return (
			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>City</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
								{Object.keys(this.state.locations).map(location => 
									<TableRow>
										<TableCell>{location}</TableCell>
									</TableRow>)}
					</TableBody>
				</Table>
			</div>
			
			/*{Object.keys(this.state.locations).map(ID => 
				this.renderLocation(this.state.locations[ID],i++))}*/
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
			this.setState({locations : result});
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
                const officeList = result.locations;
                // Reformat the offices by iterating through them all
                let location, i;
                for (i in locationList) {
                    location = locationList[i];  // current office pointer
                    rtrnList[i] = {
                        city: location.City
                    };
                }
                console.log(rtrnList);
                this.updateState({ locations: rtrnList });
            }
            else {
                console.log("Error");
            }
        }).catch(err => {
            console.log(err);
        });*/
	
	}
}

export default Locations;
