const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();

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


app.use('/new_office', require('./routes/new_office.js'));

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
