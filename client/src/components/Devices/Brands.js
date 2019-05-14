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
	
	render(){
		const { checked } = this.props;
		return (
			<div>
				<form>
					{this.state.brands.map(brand => 
					(<Checkbox
								label={brand.Brand}
								isChecked={ checked[brand.Brand] }
					/>))}
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
