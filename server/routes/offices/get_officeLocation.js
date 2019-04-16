var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.get('/', (req, res) => {
    let officeQuery = "SELECT DISTINCT city FROM Devices.office;";

    db.dbqueryPromise(officeQuery).then(results => {;
        console.log("======Locations======");
        console.log(results);
        //if the insert is successful, pull off the id that was given
        //and send it to the client
        res.json({
            success: true,
            offices: results
        });
    }).catch(err => {
        console.log("There was an error getting the offices:");
        console.log("---------------------------------");
        console.log(err);
        console.log("---------------------------------");

        //if the insert is unsuccessful, notify the client
        res.json({
            success: false,
        });
    });
});

module.exports = router;