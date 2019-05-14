import React from "react";
import Checkbox from "./Checkbox";
class Locations extends React.Component {

	constructor(props) {
		super(props);

		this.state= {
			offices: []
		}

		this.getLocationsFromServer();
		}
	

	render(){
		const { checked } = this.props;
		return (
			<div>
				<form>
					{this.state.offices.map(office => 
					(<Checkbox
					    label={ office.city }
						isChecked={ checked[office.city] }
					/>))}
				</form>
		</div>
		)
	}


	getLocationsFromServer(){
		const request = new Request('/get_officeLocation', {
			method : 'GET'
		});

		fetch(request).then(res => res.json()).then(result => {
			console.log('locations: ', result);
			if(result.success){
				this.setState({
					offices : result.offices
				});
			}
		});
	}
}

export default Locations;
