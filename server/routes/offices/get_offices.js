var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.get('/', (req, res) => {
    let officeQuery = "SELECT * FROM Devices.office;";

    db.dbqueryPromise(officeQuery).then(results => {;
        // if the insert is successful, pull off the id that was given
        // and send it to the client

        // Now format the results into a office directory
        let office, i;
        let rtrnOffices = {};
        for (i in results) {
            rtrnOffices[i] = {
                id: results[i].id_Office,
                country: results[i].Country,
                city: results[i].City,
                address: results[i].Address
            };
        }
        res.json({
            success: true,
            offices: rtrnOffices
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