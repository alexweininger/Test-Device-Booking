import React from 'react';

//import './Office.css';
import  Media from "./Media.js";
import DeviceInfo from './DeviceInfo.js';
import Media from "./Media.js";
//import NewOffice from './NewOffice';

//material UI imports
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


function createMockDevice(i){
	switch(i){
		default:
		case 1:
			return {
				brand : "USA",
				model : "Portland",
                Os : "5118 N Yale St.",
                location : "Wilno",
                custody : "John Snow",
                available : "true",
                active : "3000-01-01 11:11:11.123",
                id : 497,
                group : "Tablet Apple",
                subgroup : "Soup",
                description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                check_in_due : null,
                pruchase_date : "2018-01-01 11:11:11.123",
                vendor : "Ka randu ta jamu",
                tax_rate : "Demo Tax: 10.0%"
			};
	}
}


function DeviceItem(props) {
	return (
		<TableRow className="officeItem" onClick= {() => props.onClick()}>
			<TableCell className= "officeEntry">{props.office.brand} </TableCell>
			<TableCell className= "officeEntry"> {props.office.model} </TableCell>
			<TableCell className= "officeEntry"> {props.office.Os} </TableCell>
            <TableCell className= "officeEntry"> {props.office.location} </TableCell>
            <TableCell className= "officeEntry"> {props.office.custody} </TableCell>
            <TableCell className= "officeEntry"> {props.office.available} </TableCell>
            <TableCell className= "officeEntry"> {props.office.active} </TableCell>
            <TableCell className= "officeEntry"> {props.office.id} </TableCell>
            <TableCell className= "officeEntry"> {props.office.group} </TableCell>
            <TableCell className= "officeEntry"> {props.office.subgroup} </TableCell>
            <TableCell className= "officeEntry"> {props.office.description} </TableCell>
            <TableCell className= "officeEntry"> {props.office.vendor} </TableCell>
            <TableCell className= "officeEntry"> {props.office.tax_rate} </TableCell>
		</TableRow>
	);
}

class Devices extends React.Component {
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

        const devices = [createMockOffice(1)]
		
		this.state= {
			//an array of objects with data about each office
            devices: devices,
			
			//the current page to show, one of
			//'list', 'info', 'new'
			pageToShow : 'list',
			
			//the office to currently display details for
			//iff pageToShow == 'info'
			officeToShow : null
		}
    }


    renderDevice(device, i){
		return (
			//when an office item is clicked, show its details
			<Media device= {device}
						key= {i}
						onClick= {() => this.setDeviceToShow(device)}/>
		);
    }
    
    renderDeviceList(){
		let i= 0;
		return (
			<div>
				<Table>
					<TableBody>
							{/*render the list of offices, they are table rows*/}
							{this.state.devices.map(device => this.renderDevice(device,i++))}
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
				return this.renderDeviceList();
			case 'info':
				return (
					<DeviceInfo office= {this.state.officeToShow}
								returnToList= {() => this.setPageToShow('list')}/>
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

    getDevicesFromDB() {
        const request = new Request('/get_devices', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        });

        fetch(request).then(res => res.json()).then(result => {
            //if success then update the office list
            if (result.success) {
                console.log(result.devices);
                return true;
            }
            else {
                console.log("Error");
                return false;
            }
        }).catch(err => {
            console.log(err);
            return false;
        });
    }
    
    setDeviceToShow(device){
        this.updateState({
            deviceToShow : device,
            pageToShow : 'info'
        });
    }
    
    setPageToShow(page){
        this.updateState({pageToShow : page});
    }


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


export default Devices;

