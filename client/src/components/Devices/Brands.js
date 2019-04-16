import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from '@material-ui/core/Checkbox';


class Brands extends React.Component {

	constructor(props) {
		super(props);

		this.state= {
            brands: []
		}

		this.getBrands();
    }
	

	render(){
		const brands = this.state.brands || [];

		return (
			<div>
				{brands.map(brand => 
				
				<FormControlLabel style={{marginRight: 90}} control={<Checkbox value="checkedC" />} label={brand.Brand}>
					
				</FormControlLabel>
				)}
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
