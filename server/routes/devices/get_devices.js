var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.get('/', (req, res) => {
    let deviceQuery = "SELECT * FROM Devices.device;";
  
    db.dbqueryPromise(deviceQuery).then(results => {;
        //if the insert is successful, pull off the id that was given
        //and send it to the client
        res.json({
            success: true,
            devices: results
        });
    }).catch(err => {
        console.log("There was an error getting the devices:");
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