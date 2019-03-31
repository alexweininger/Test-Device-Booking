//app.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/client/public'));

//body parser for posts

app.use(bodyParser.json());

const officeQuery = "SELECT * FROM Devices.office;";

let getUsersRouter = require('./routes/users/getUsers');
let newUserRouter = require('./routes/users/newUser');

app.use('/users', getUsersRouter);
app.use('/new_user', newUserRouter);

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


app.use('/new_office', require('./routes/offices/new_office.js'));


app.get('/helloWorld', (req, res) => {
    res.status(200).send('Hello World!');
})
module.exports = app;
