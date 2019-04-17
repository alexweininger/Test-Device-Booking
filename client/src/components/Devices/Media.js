import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ReactDOM from "react-dom";
import DeviceInfo from "./DeviceInfo.js";
import BookDevice from "./BookDevice.js";
import { labeledStatement } from "@babel/types";
import Reserve from "./Reserve.js";

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
  }
};

class Media extends React.Component {
  state = {
    value: ""
  };

  render() {
    const {
      classes,
      text,
      text2,
      brand1,
      model1,
      os1,
      location1,
      custody1,
      available1,
      active1,
      sNumber1,
      group1,
      subgroup1,
      description1,
      check_in1,
      purchaseDate1,
      vendor1,
      taxRate1
    } = this.props;

    return (
      <Card className={classes.card}>
        <Button
          onClick={() =>
            ReactDOM.render(
              <DeviceInfo
                classes={classes}
                brand={brand1}
                model={model1}
                os={os1}
                location={location1}
                custody={custody1}
                available={available1}
                active={active1}
                sNumber={sNumber1}
                group={group1}
                subgroup={subgroup1}
                description={description1}
                check_in={check_in1}
                purchaseDate={purchaseDate1}
                vendor={vendor1}
                taxRate={taxRate1}
              />,
              document.getElementById("root")
            )
          }
        >
          <CardActionArea style={{ height: 320 }}>
            <CardMedia
              className={classes.media}
              image={require("../Data/image.jpg")}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h6">
                {text}
              </Typography>
              <Typography component="p">{text2}</Typography>
            </CardContent>
          </CardActionArea>
        </Button>

        <CardActions>
          <Reserve />
          <BookDevice />
        </CardActions>
      </Card>
    );
  }
}

Media.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Media);
