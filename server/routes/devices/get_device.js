var express = require("express");
var router = express.Router();

var db = require("../dbms.js");

router.get("/", (req, res) => {
  let deviceQuery =
    "SELECT * FROM Device_Booking.atbl_Device ORDER BY Brand ASC;";

  db.dbqueryPromise(deviceQuery)
    .then(results => {
      //console.log("======Devices======");
      //console.log(results);

      res.json({
        success: true,
        devices: results
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
