const express = require('express');
const mysql = require('mysql');  

const app = express();
app.use(express.static(__dirname + '/client/public'));

//body parser for posts
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const officeQuery = "SELECT * FROM Devices.office;";

const connection = mysql.createConnection({
    host: '35.185.195.184',
    user: 'student',
    password: 'student',
    database: 'Devices'
});

/*connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});*/

app.get('/Offices', (req, res) => {
    connection.query(officeQuery, (err, results) => {
        if (err) {
            return res.send(err);
        }
        else {
            return res.json({
                data: results
            });
        }
    });
});

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
  ];
  res.json(customers);
});

app.use('/poop', require('./routes/thing.js'));
app.use('/new_office', require('./routes/new_office.js'));

const port = 5000;

app.listen(port, () => 'Server running on port ${port}');
