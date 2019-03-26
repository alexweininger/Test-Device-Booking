const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const app = express();
app.use(express.static(__dirname + '/client/public'));

//body parser for posts

app.use(bodyParser.json());

const officeQuery = "SELECT * FROM Devices.office;";
const usersQuery = "SELECT * FROM Devices.users;";

const connection = mysql.createConnection({
  host: '35.185.195.184',
  user: 'student',
  password: 'student',
  database: 'Devices'
});

/*connection.connect(function (err) {
    (err) ? console.log(err) : console.log(connection);
});*/

app.use('/users', (req, res) => {
  connection.query(usersQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});

app.use('/new_user', require('./routes/users/newUser'));

app.get('/Offices', (req, res) => {
  connection.query(officeQuery, (err, results) => {
    if (err) {
      return res.send(err);
    } else {
      return res.json({
        data: results
      });
    }
  });
});


app.use('/new_office', require('./routes/new_office.js'));

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
