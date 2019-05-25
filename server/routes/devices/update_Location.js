var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.post("/", (req, res) => {
  const device = req.body;

  let query = `UPDATE atbl_device
        SET fk_office_id = ${device.fk_office_id}
        WHERE Serial_Number="${device.Serial_Number}"`;

  console.log("Query\n\n\n\n" + query + "\n\n\n\n\n");

  db.dbqueryPromise(query)
    .then(results => {
      res.json({
        success: true,
        Number: results.insertId
      });
    })
    .catch(err => {
      console.log("There was an error inserting a new device:");
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
