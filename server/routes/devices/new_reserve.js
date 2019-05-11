var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);
//var db = require("../dbmsTest.js");

router.post("/", (req, res) => {
  const reserved = req.body;

  //TODO make sure the reserve is unique

  let query =
    "INSERT INTO atbl_Booking (StartDate, FinishDate, fk_user_id_reg, fk_device_ser_nr) " +
    "VALUES ('{startDate}', '{finishDate}', '{ID}', '{sNumber}');";

  query = query
    .replace("{startDate}", reserved.startDate)
    .replace("{finishDate}", reserved.finishDate)
    .replace("{ID}", reserved.ID)
    .replace("{sNumber}", reserved.sNumber);

  db.dbqueryPromise(query)
    .then(results => {
      //if the insert is successful, pull off the id that was given
      //and send it to the client
      res.json({
        success: true,
        Number: results.insertId
      });
    })
    .catch(err => {
      console.log("There was an error inserting a new date in reserve:");
      console.log("---------------------------------");
      console.log(err);
      console.log("---------------------------------");

      //if the insert is unsuccessful, notify the client
      res.json({
        success: false
      });
    });
});

module.exports = router;
