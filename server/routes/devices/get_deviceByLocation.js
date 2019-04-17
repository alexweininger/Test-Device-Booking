var express = require('express');
var router = express.Router();

var db = require('../dbms.js');



router.get('/', (req, res) => {
    let location = 'London';
    const locationQuery = "SELECT * FROM atbl_Device " +
    "INNER JOIN atbl_Office ON atbl_Device.`fk_office_id`= atbl_Office.`id_Office`" +
    "WHERE atbl_Office.`City`='" + location + "';";

    db.dbqueryPromise(locationQuery).then(results => {;
        //console.log("======Devices By Location======");
        //console.log(results);

        res.json({
            success: true,
            devices: results
        });
    }).catch(err => {
        console.log("There was an error getting the offices:");
        console.log("---------------------------------");
        console.log(err);
        console.log("---------------------------------");

        res.json({
            success: false,
        });
    });
});

module.exports = router;