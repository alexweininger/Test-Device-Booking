var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.get('/:filter', (req, res) => {
    const filterQuery= req.params.filter;

    const Query = "SELECT * FROM atbl_Device " +
    "LEFT JOIN atbl_Office ON atbl_Device.`fk_office_id`= atbl_Office.`id_Office` " + filterQuery + ";";

    db.dbqueryPromise(Query).then(results => {;
        //console.log("======Devices By Location======");
        //console.log(results);

        res.json({
            success: true,
            devices: results
        });
        console.log("+++++" + Query);
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