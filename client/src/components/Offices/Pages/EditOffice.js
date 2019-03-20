import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ArrowBack from '@material-ui/icons/ArrowBack';
class EditOffice extends React.Component {

  
  render() {
    return (
      <div>
		<Button onClick>
		<Button>
			<ArrowBack />
			Back to Office Info
		</Button>
		<h3>Edit Device Information</h3>
		<form>
        <TextField
          id="Country"
          label="Country"
          margin="normal"
		  defaultValue={this.props.office.country}
        />
		<TextField
          id="City"
          label="City"
          margin="normal"
		  defaultValue={this.props.office.city}
		/>
		<TextField
          id="Address"
          label="Address"
          margin="normal"
		  defaultValue={this.props.office.address}
        />
      </form>
		<Button>Submit</Button>
      </div>
    );
  }
}



export default EditOffice;