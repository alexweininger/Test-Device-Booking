import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

class Locations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      offices: []
    };

    this.getLocationsFromServer();
  }

  render() {
    const offices = this.state.offices || [];

    return (
      <div>
        {offices.map(office => (
          <FormControlLabel
            style={{ marginRight: 85 }}
            control={<Checkbox value="checkedC" />}
            label={office.city}
          />
        ))}
      </div>
    );
  }

  getLocationsFromServer() {
    const request = new Request("/get_officeLocation", {
      method: "GET"
    });

    fetch(request)
      .then(res => res.json())
      .then(result => {
        console.log("result ", result);
        if (result.success) {
          this.setState({
            offices: result.offices
          });
        }
      });
  }
}

export default Locations;
