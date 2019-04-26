var express = require("express");
var router = express.Router();

var db = require("../dbms.js");

router.get("/", (req, res) => {
  let deviceQuery =
    "SELECT Device_Booking.atbl_Device.*, Device_Booking.atbl_Office.City  FROM Device_Booking.atbl_Device, Device_Booking.atbl_Office WHERE Device_Booking.atbl_Device.fk_office_id = Device_Booking.atbl_Office.id_Office LIMIT 20;";

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
