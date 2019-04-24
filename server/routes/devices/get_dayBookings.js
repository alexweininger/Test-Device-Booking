var express = require("express");
var router = express.Router();
//StartDate >= NOW() AND
const ID=2;
var db = require("../dbms.js");

router.get("/", (req, res) => {

//
  const availableQuery = "SELECT * FROM Device_Booking.atbl_Booking WHERE StartDate>=NOW() AND StartDate<= CURDATE()+1 AND FinishDate >= NOW() AND FinishDate <= CURDATE()+1 AND fk_device_ser_nr=0048292044 ORDER BY StartDate ASC" ;

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
