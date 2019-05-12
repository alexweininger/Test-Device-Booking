var express = require("express");
var router = express.Router();
//StartDate >= NOW() AND

//var db = require("../dbms.js");

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";
var db = require(`../${dataBase}`);

//console.log(ID);
router.post("/", (req, res) => {
  const reservations = req.body;
  let startDate = reservations;
  console.log(startDate);
  const query = `SELECT * FROM Device_Booking.atbl_Booking WHERE Device_Booking.atbl_Booking.StartDate = ${
    req.params.startDate
  }`;

  //query = query.replace("{startDate}", "2019-02-13 04:50:10");

  db.dbqueryPromise(query)
    .then(results => {
      //console.log("======Available devices======");
      //console.log(results);

      res.setHeader("Content-Type", "application/json");
      SQLArrayToJSON(results, json => {
        res.status(200).json(json);
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
  function SQLArrayToJSON(sql, callback) {
    const arr = [];
    Object.keys(sql).forEach(key => {
      const rowObj = {};
      const row = sql[key];
      Object.keys(row).forEach(keyc => {
        rowObj[keyc] = row[keyc];
      });
      arr.push(rowObj);
    });
    callback(arr);
  }
});

module.exports = router;
