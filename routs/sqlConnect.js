const express = require('express');
const mysql = require('mysql');

const officeQuery = "SELECT * FROM Devices.office;";

const connection = mysql.createConnection({
    host: '35.185.195.184',
    user: 'student',
    password: 'student',
    database: 'Devices'
});

connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});

app.get('/Office', (req, res) => {
    connection.query(officeQuery, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            app.send()
            return res.json({
                data: results
            });
        }
    });
});