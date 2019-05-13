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
    //ISch = this.state.isChecked;
  }

  render() {
    const { label, isChecked } = this.props;

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