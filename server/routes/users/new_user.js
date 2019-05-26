var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);
//var db = require("../dbmsTest.js");

router.post("/", (req, res) => {
  const user = req.body;

  //TODO make sure the reserve is unique

  const insert =
    "INSERT INTO atbl_Users (FirstName, LastName, Email, SlackUsername, ID, OfficeID, Role, Password)";
  const values = ` VALUES ('${user.firstName}', '${
    user.lastName
  }', '${user.email - signup}', '${user.slackUsername}', '${
    user.employeeId
  }', '${user.officeId}', '${user.Role}', '${user.password - signup}');`;
  db.dbquery(insert + values, (err, results) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("User added successfully.");
    }

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
});
module.exports = router;