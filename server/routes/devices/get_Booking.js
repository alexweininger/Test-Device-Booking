var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.get("/:query", (req, res) => {
  console.log("req ", req.params);

  const availableQuery = `SELECT * FROM atbl_Booking 
                            ${req.params.query}         
                              ORDER BY StartDate ASC
                              `;
                              console.log(availableQuery+"-------------------");
  db.dbqueryPromise(availableQuery)
    .then(results => {
      
      console.log("======Today's bookings======");
      console.log(results);

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
