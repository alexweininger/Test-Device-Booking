import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@material-ui/core/Button';

function createMockOffice(i){
	switch(i){
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

function OfficeInfo(props){
	return (
		<>
			<Button onClick= {() => props.onClick()}>Back to the list</Button>
			<div className= "space"></div>
			<table className= "box">
				<tr>
					<td className= "label">Country:</td>
					<td className= "data">{props.office.country}</td>
				</tr>
				<tr>
					<td className= "label">City:</td>
					<td className= "data">{props.office.city}</td>
				</tr>
				<tr>
					<td className= "label">Address:</td>
					<td className= "data">{props.office.address}</td>
				</tr>
			</table>
		</>
	);
}

class OfficeItem extends React.Component{
	render(){
		return (
			<div className="officeItem" onClick= {() => this.props.onClick()}>
				<span className= "officeEntry">{this.props.office.country} </span>
				<span className= "officeEntry"> {this.props.office.city} </span>
			</div>
		);
	}
}

class Offices extends React.Component {
	constructor(props) {
		super(props);
		
		const offices= [createMockOffice(1), createMockOffice(2), createMockOffice(3)]
		
		this.state= {
			offices : offices,
			
			officeToShow : null,
		}
	}
	
	renderOffice(office){
		return (
			<OfficeItem office= {office}
						onClick= {() => this.setOfficeToShow(office)}/>
		);
	}
	
	render(){
		if(!this.state.officeToShow){
			return (
				<>
					{this.state.offices.map(office => this.renderOffice(office))}
				</>
			);
		}
		
		return (
			<OfficeInfo office= {this.state.officeToShow} 
						onClick= {() => this.setOfficeToShow(null)}/>
		);
	}
	
	editOffice(office){
		//TODO - no duplicate offices
		//we must have all three properties
		if(!office.country || !office.city || !office.address){
			console.log("bad office");
			return false;
		}

		//send office to the DB
		const request = new Request('/edit_office',{
			method: 'POST',
			body: JSON.stringify(office),
			headers: {"Content-Type": "application/json"}
		});

		fetch(request).then(res => {
			//if we successfully updated the DB
			if(res.ok){
				//add the office
				this.state.offices.push(office);
				this.updateState({
					offices : this.state.offices
				});
				console.log("added " + office);
				this.setPageToShow("list");
			}
		});

	
	setOfficeToShow(office){
		console.log(this);
		const newState= {
			offices : this.state.offices,
			officeToShow: office
		}
		
		this.setState(newState);
	}
}


export default (Offices);
