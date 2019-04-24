var express = require("express");
var router = express.Router();
//StartDate >= NOW() AND

var db = require("../dbms.js");
//console.log(ID);
router.post("/", (req, res) => {
  const reservations = req.body;
  let startDate = reservations;
  console.log(startDate);
  const query =
    "SELECT * FROM Device_Booking.atbl_Booking WHERE Device_Booking.atbl_Booking.StartDate = '" +
    startDate +
    "'";

  //query = query.replace("{startDate}", "2019-02-13 04:50:10");

  db.dbqueryPromise(query)
    .then(results => {
      //console.log("======Available devices======");
      //console.log(results);

      res.json({
        success: true,
        reservations: results
      });
    })
    .catch(err => {
      console.log("There was an error getting the Reservation:");
      console.log("---------------------------------");
      console.log(err);
      console.log("---------------------------------");

      res.json({
        success: false
      });
    });
});

module.exports = router;
