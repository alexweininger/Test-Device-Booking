var express = require('express');
var router = express.Router();

var db = require('../dbms.js');



router.get('/', (req, res) => {
    let brand = 'Prodder';
    const brandQuery = "SELECT * FROM Device_Booking.atbl_Device WHERE Brand='" + brand + "';";

    db.dbqueryPromise(brandQuery).then(results => {;
        //console.log("======Devices By Brand======");
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