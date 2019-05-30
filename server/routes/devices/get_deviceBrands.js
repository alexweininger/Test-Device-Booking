var express = require("express");
var router = express.Router();

//var db = require("../dbms.js");

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.get("/", (req, res) => {
  let brandQuery =
    "SELECT DISTINCT Brand FROM Device_Booking.atbl_Device ORDER BY Brand ASC;";

  db.dbqueryPromise(brandQuery)
    .then(results => {
      //console.log("======Brands======");
      //console.log(results);

      res.json({
        success: true,
        brands: results
      });
    })
    .catch(err => {
      console.log("There was an error getting the devices:");
      console.log("---------------------------------");
      console.log(err);
      console.log("---------------------------------");

      res.json({
        success: false
      });
    });
});

module.exports = router;
