// app.js is the main server side script

const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var passport = require("passport");
var flash = require("connect-flash");
var morgan = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");

require("./config/passport")(passport); // pass passport for configuration

// this enables server side logging for all requests and routes
app.use(morgan("dev"));

// this enables requests from this specific location
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cors());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// allows for static page serving
app.use(express.static(__dirname + "/client/public"));

// body parser for post requests
app.use(bodyParser.json());

app.use("/new_office", require("./routes/offices/new_office.js"));
app.use("/edit_office", require("./routes/offices/edit_office.js"));
app.use("/get_offices", require("./routes/offices/get_offices.js"));
app.use(
  "/get_officeLocation",
  require("./routes/offices/get_officeLocation.js")
);

app.use("/new_office", require("./routes/offices/new_office.js"));
app.use("/edit_office", require("./routes/offices/edit_office.js"));
app.use("/get_offices", require("./routes/offices/get_offices.js"));
app.use(
  "/get_officeLocation",
  require("./routes/offices/get_officeLocation.js")
);

app.use("/get_deviceBrands", require("./routes/devices/get_deviceBrands.js"));
app.use("/get_userBookings", require("./routes/devices/get_userBookings.js"));
app.use("/update_Location", require("./routes/devices/update_Location.js"));
app.use("/new_device", require("./routes/devices/new_device.js"));
app.use("/get_device", require("./routes/devices/get_device.js"));
app.use("/get_Booking", require("./routes/devices/get_Booking.js"));
app.use("/get_dayBookings", require("./routes/devices/get_dayBookings.js"));
app.use("/new_reserve", require("./routes/devices/new_reserve.js"));
app.use("/get_selectedDay", require("./routes/devices/get_selectedDay.js"));
app.use(
  "/get_deviceByFilter",
  require("./routes/devices/get_deviceByFilter.js")
);
app.use("/return_device", require("./routes/devices/return_device.js"));
app.use("/new_booking", require("./routes/devices/new_booking.js"));
app.use(
  "/update_DeviceAvailability",
  require("./routes/devices/update_DeviceAvailability.js")
);
app.use("/get_closestBooking", require("./routes/devices/get_closestBooking"));
app.use("/get_userReservations", require("./routes/devices/get_userReservations.js"));
/*const officeQuery = 'SELECT * FROM Devices.office;';

app.get('/Offices', (req, res) => {
	connection.query(officeQuery, (err, results) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			data: results,
		});
	});
});*/
app.use("/new_user", require("./routes/users/new_user.js"));
app.use("/get_LoginUser", require("./routes/users/get_LoginUser.js"));
let getUsersRouter = require("./routes/users/getUsers");
let newUserRouter = require("./routes/users/newUser");
let getDevicesRouter = require("./routes/devices/get_device.js");
let newDeviceRouter = require("./routes/devices/get_device.js");
let getDayRouter = require("./routes/devices/get_dayBookings.js");

app.use("/users", getUsersRouter);
app.use("/users", newUserRouter);
app.use("/devices", getDevicesRouter);
app.use("/devices", newDeviceRouter);
app.use("/devices", getDayRouter);

// parse cookies from the browser
app.use(cookieParser());

// extended body parsing for requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// session handler
app.use(
  session({
    secret: "vidyapathaisalwaysrunning",
    resave: true,
    saveUninitialized: true
  })
); // session secret

// initalize passport.js
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

// use connect-flash for flash messages stored in session
app.use(flash());

require("./routes/users/passportRoute.js")(app, passport);

app.get("/helloWorld", (req, res) => {
  res.status(200).send("Hello World!");
});
app.get("/get_device", (req, res) => {
  return res.json(devices);
});
app.get("/get_dayBookings", (req, res) => {
  return res.json(days);
});

module.exports = app;
