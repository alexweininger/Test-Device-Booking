var express = require("express");
var router = express.Router();

//var db = require('../dbms.js');
const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";
var db = require(`../${dataBase}`);

router.get("/:filter", (req, res) => {
  const filterQuery = req.params.filter;

  const Query =
    "SELECT * FROM atbl_Device " +
    "LEFT JOIN atbl_Office ON atbl_Device.`fk_office_id`= atbl_Office.`id_Office` " +
    filterQuery +
    ";";

  db.dbqueryPromise(Query)
    .then(results => {
      //console.log("======Devices By Location======");
      //console.log(results);

      res.setHeader("Content-Type", "application/json");
      SQLArrayToJSON(results, json => {
        res.status(200).json(json);
      });

      console.log("+++++" + Query);
    })
    .catch(err => {
      console.log("There was an error getting the offices:");
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
