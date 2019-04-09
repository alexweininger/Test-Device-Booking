var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.post('/', (req, res) => {
    
    const newDevice = req.body;

    console.log("===============");
    console.log(newDevice);

    let query = "INSERT INTO device " +
        "VALUES ('{brand}', '{model}', '{description}', '{image}', '{serial_num}', '{status}', " +
        "'{name}', Date('{month_year}'), '{os}', '{category}', '{subcategory}', Date('{purchased_on}'), " +
        "'{vendor}', '{tax_rate}', '{fk_office_id_device}');";

    query = query.replace('{brand}', newDevice.brand)
        .replace('{model}', newDevice.model)
        .replace('{description}', newDevice.description)
        .replace('{image}', newDevice.image)
        .replace('{serial_num}', newDevice.serial_num)
        .replace('{status}', newDevice.status)
        .replace('{name}', newDevice.name)
        .replace('{month_year}', newDevice.month_year)
        .replace('{os}', newDevice.os)
        .replace('{category}', newDevice.category)
        .replace('{subcategory}', newDevice.subcategory)
        .replace('{purchased_on}', newDevice.purchased_on)
        .replace('{vendor}', newDevice.vendor)
        .replace('{tax_rate}', newDevice.tax_rate)
        .replace('{fk_office_id_device}', newDevice.fk_office_id_device);

    console.log("Testing============");
    console.log(query);
    db.dbqueryPromise(query).then(results => {

        res.json({
            success: true,
            deviceID: results.insertId
        });

    }).catch(err => {
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