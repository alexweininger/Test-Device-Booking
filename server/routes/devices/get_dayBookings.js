var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.get("/:deviceId", (req, res) => {
  console.log("req ", req.params);

  const availableQuery = `SELECT *, CONVERT_TZ(StartDate,'+00:00','+3:00') AS StartDate, 
                                    CONVERT_TZ(FinishDate,'+00:00','+3:00') AS FinishDate 
                          FROM atbl_Booking 
                          WHERE year(StartDate)=year(now()) 
                            AND month(StartDate)=month(now()) 
                            AND day(StartDate)=day(now()) 
                            AND year(FinishDate)=year(now()) 
                            AND month(FinishDate)=month(now()) 
                            AND day(FinishDate)=day(now()) 
                            AND fk_device_ser_nr=${req.params.deviceId}          
                            ORDER BY StartDate ASC
                              `;

  db.dbqueryPromise(availableQuery)
    .then(results => {
      console.log("======Today's bookings======"+req.params.deviceId);
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
