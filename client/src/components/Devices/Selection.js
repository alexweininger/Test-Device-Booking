import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Location from './Location';
import Brands from './Brands';

const styles = theme => ({
  root: {
    backgroundColor: '#F6F6F6',
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    display: 'block',
  },
  formControl: {
    width: 275,
    margin: theme.spacing.unit * 3,
    overflowY: 'auto',
    height: '7cm',
  },

});

class SelectionGroup extends React.Component {
  state = {
    value: '',
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel style={{fontWeight: 'bold', color: '#595959'}} disabled >BRANDS</FormLabel>
            <Brands/>
          </FormControl>
        
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel style={{fontWeight: 'bold', color: '#595959'}} disabled >LOCATION</FormLabel>
            <Location/>
        </FormControl>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel style={{fontWeight: 'bold', color: '#595959'}} disabled >AVAILABILITY</FormLabel>
            <FormControlLabel control={<Checkbox value="checkedC" />} label="Show all" />
            <FormControlLabel control={<Checkbox value="checkedC" />} label="Available" />
        </FormControl>
      </div>
    );
  }
}

SelectionGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectionGroup);