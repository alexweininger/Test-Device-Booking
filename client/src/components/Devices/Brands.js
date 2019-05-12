import React from 'react';
import Checkbox from "./Checkbox";


class Brands extends React.Component {

	constructor(props) {
		super(props);

		this.state= {
						brands: []
		}

		this.getBrands();
    }	
	
		createCheckboxes = () => (
			this.state.brands.map(brand => 
				(<Checkbox
					    label={brand.Brand}
						key={brand.Brand}
				/>))
		)
	

	render(){
		return (
			<div>
				<form>
					{this.createCheckboxes()}
				</form>
		</div>
		)
	}

	getBrands(){
		const request = new Request('/get_deviceBrands', {
			method : 'GET'
		});

		fetch(request).then(res => res.json()).then(result => {
			console.log('result ', result);
			if(result.success){
				this.setState({
					brands : result.brands
				});
			}
		});

	}
}

export default Brands;
