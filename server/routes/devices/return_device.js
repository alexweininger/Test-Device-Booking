var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);
//var db = require("../dbmsTest.js");

router.post("/", (req, res) => {
  const reserved = req.body;

  //TODO make sure the reserve is unique

  let query =
    `UPDATE atbl_Device
    SET Available=1
    WHERE Serial_Number="${reserved.sNumber}"`;

  db.dbqueryPromise(query)
    .then(results => {
      //if the insert is successful, pull off the id that was given
      //and send it to the client
      res.json({
        success: true,
        Number: results.Serial_Number
      });
    })
    .catch(err => {
      console.log("There was an error inserting a new date in return device:");
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
