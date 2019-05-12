import React, { Component, PropTypes } from 'react';
import CheckBox from "@material-ui/core/Checkbox";

class Checkbox extends Component {
  state = {
    isChecked: false,
  }

  toggleCheckboxChange = () => {

    this.setState(({ isChecked }) => (
      {
        isChecked: !isChecked,
      }
    ));
  }

  render() {
    const { label } = this.props;
    const { isChecked } = this.state;

    return (
      <div className="checkbox">
            <CheckBox value={label}
                      checked={isChecked}
                      onChange={this.toggleCheckboxChange} />
          {label}
      </div>
    );
  }
}



export default Checkbox;