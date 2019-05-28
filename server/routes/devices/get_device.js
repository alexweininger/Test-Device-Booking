var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

//var db = require("../dbmsTest.js");

router.get("/", (req, res) => {
  let deviceQuery =
    "SELECT atbl_Device.*, .atbl_Office.City  FROM atbl_Device, atbl_Office" +
    " WHERE atbl_Device.fk_office_id = atbl_Office.id_Office AND atbl_Device.Status = '1';";

  db.dbqueryPromise(deviceQuery)
    .then(results => {
      //console.log("======Devices======");
      //console.log(results);

      res.setHeader("Content-Type", "application/json");
      SQLArrayToJSON(results, json => {
        res.status(200).json(json);
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

router.get("/:sNumber", (req, res) => {
  const sNumber = req.params.sNumber;
  let deviceQuery =
    "SELECT atbl_Device.*, .atbl_Office.City  FROM atbl_Device, atbl_Office" +
    " WHERE atbl_Device.fk_office_id = atbl_Office.id_Office AND atbl_Device.Status = '1'" +
    " AND atbl_Device.Serial_Number = '" +
    sNumber +
    "' LIMIT 20;";

  db.dbqueryPromise(deviceQuery)
    .then(results => {
      //console.log("======Devices======");
      //console.log(results);

      res.setHeader("Content-Type", "application/json");
      SQLArrayToJSON(results, json => {
        res.status(200).json(json);
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
