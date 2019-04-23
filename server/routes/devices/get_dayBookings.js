var express = require("express");
var router = express.Router();
//StartDate >= NOW() AND

var db = require("../dbms.js");
//console.log(ID);
router.get("/", (req, res) => {
  const availableQuery = "SELECT * FROM Device_Booking.atbl_Booking WHERE  FinishDate <= CURDATE() AND fk_user_id_reg>0";

  db.dbqueryPromise(availableQuery)
    .then(results => {
      //console.log("======Available devices======");
      //console.log(results);

      res.json({
        success: true,
        bookings: results
      });
    })
    .catch(err => {
      console.log("There was an error getting the Booking information:");
      console.log("---------------------------------");
      console.log(err);
      console.log("---------------------------------");

      res.json({
        success: false
      });
    });
});


module.exports = router;
