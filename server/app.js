// app.js is the main server side script

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

// this enables server side logging for all requests and routes
app.use(morgan('dev'));

// this enables requests from this specific location
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(cors());

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// allows for static page serving
app.use(express.static(__dirname + '/client/public'));

// body parser for post requests
app.use(bodyParser.json());


app.use('/new_office', require('./routes/offices/new_office.js'));
app.use('/edit_office', require('./routes/offices/edit_office.js'));
app.use('/get_offices', require('./routes/offices/get_offices.js'));
app.use('/get_devices', require('./routes/devices/get_devices.js'));
app.use('/add_device', require('./routes/devices/add_device.js'));

const officeQuery = 'SELECT * FROM Devices.office;';

app.get('/Offices', (req, res) => {
	connection.query(officeQuery, (err, results) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			data: results,
		});
	});
});

let getUsersRouter = require('./routes/users/getUsers');
let newUserRouter = require('./routes/users/newUser');

app.use('/users', getUsersRouter);
app.use('/new_user', newUserRouter);

// parse cookies from the browser
app.use(cookieParser());

// extended body parsing for requests
app.use(bodyParser.urlencoded({
  extended: true
}));

// session handler
app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } )); // session secret

 // initalize passport.js
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// use connect-flash for flash messages stored in session
app.use(flash());

require('./routes/users/passportRoute.js')(app, passport);

app.get('/helloWorld', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;
