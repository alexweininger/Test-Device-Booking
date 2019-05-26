import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import BookDevice from "./BookDevice.js";
import { NavLink } from "react-router-dom";
import ReserveDevice from "./ReserveDevice";

const styles = {
  card: {
    maxWidth: 300,
    height: 420,
    marginRight: 20,
    marginBottom: 20
  },
  media: {
    width: 275,
    height: 180
  },
  button: {
    margin: 5,
    padding: 10
  },
  link: {
    textDecoration: "none",
    textAlign: "center"
  }
};

function availability(available){
  if(available == 1){
    return <Typography style={{color: "green"}}>Available</Typography>
  }
  else return <Typography style={{color: "red"}}>Unavailable</Typography>
}

class Media extends React.Component {
  state = {
    value: ""
  };

  render() {
    const { classes, text, text2, available, images, sNumber } = this.props;
    return (
      <Card className={classes.card}>
        <NavLink className={classes.link} to={`${sNumber}`}>
          <CardActionArea style={{ height: 320 }}>
            <CardMedia className={classes.media} image={images} />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h6">
              {availability(available)}
                {text}
              </Typography>
              <Typography component="p">{text2}</Typography>
            </CardContent>
          </CardActionArea>
        </NavLink>
        <CardActions>
          <ReserveDevice sNumber={sNumber} available={available}/>
          <BookDevice sNumber={sNumber} available={available} />
        </CardActions>
      </Card>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Media);
