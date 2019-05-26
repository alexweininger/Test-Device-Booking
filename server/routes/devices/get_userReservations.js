var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.get("/:id", (req, res) => {
  console.log("req ", req.params);

  const availableQuery = `SELECT fk_device_ser_nr, StartDate, FinishDate, fk_user_id_reg 
  FROM atbl_Booking 
  LEFT JOIN atbl_users 
  ON fk_user_id_reg = atbl_users.id
  LEFT JOIN atbl_device
  ON fk_device_ser_nr = Serial_Number
  
            WHERE year(StartDate)=year(CONVERT_TZ(now(),'+00:00','+3:00')) 
            AND month(StartDate)=month(CONVERT_TZ(now(),'+00:00','+3:00')) 
            AND day(StartDate)=day(CONVERT_TZ(now(),'+00:00','+3:00')) 
            AND year(FinishDate)=year(CONVERT_TZ(now(),'+00:00','+3:00')) 
            AND month(FinishDate)=month(CONVERT_TZ(now(),'+00:00','+3:00')) 
            AND day(FinishDate)=day(CONVERT_TZ(now(),'+00:00','+3:00'))
            AND TIMESTAMPDIFF(minute, CONVERT_TZ(now(),'+00:00','+3:00'), StartDate) <=15
            AND TIMESTAMPDIFF(minute, CONVERT_TZ(now(),'+00:00','+3:00'), StartDate) >0
            AND Available = 1 
            AND atbl_users.id = ${req.params.id}
  
  ORDER BY StartDate ASC
                              `;
  //console.log(availableQuery);
  db.dbqueryPromise(availableQuery)
    .then(results => {
      console.log("======Today's bookings======" + req.params.id);
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