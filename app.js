//app.js
const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan = require('morgan');
var session  = require('express-session');
var cookieParser = require('cookie-parser');

require('./config/passport')(passport); // pass passport for configuration

app.use(cors());
app.use(express.static(__dirname + '/client/public'));

//body parser for posts

app.use(bodyParser.json());

const officeQuery = "SELECT * FROM Devices.office;";

let getUsersRouter = require('./routes/users/getUsers');
let newUserRouter = require('./routes/users/newUser');

app.use('/users', getUsersRouter);
app.use('/new_user', newUserRouter);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.use(flash()); // use connect-flash for flash messages stored in session

require('./routes/users/passportRoute.js')(app, passport);


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


app.get('/helloWorld', (req, res) => {
  res.status(200).send('Hello World!');
})
module.exports = app;
