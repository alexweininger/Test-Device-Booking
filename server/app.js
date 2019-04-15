// app.js is the main server side script

const express = require("express");

const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

var passport = require("passport");
var Strategy = require("passport-local").Strategy;
var flash = require("connect-flash");
var morgan = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const dbms = require('./routes/dbms');
passport.use(
	new Strategy(function(username, password, cb) {
		findUserByUsername(username, function(err, user) {
			if (err) {
				return cb(err);
			}
			if (!user) {
				return cb(null, false);
			}
			if (user.password != password) {
				return cb(null, false);
			}
			return cb(null, user);
		});
	})
);

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	findUserById(id, function(err, user) {
		if (err) {
			return cb(err);
		}
		cb(null, user[0].id);
	});
});

const app = express();

// allows for static page serving
app.use(express.static(__dirname + "/client/public"));

// body parser for post requests
app.use(bodyParser.json());
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
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

// initalize passport.js
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

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

// use connect-flash for flash messages stored in session
app.use(flash());

app.use("/new_office", require("./routes/offices/new_office.js"));
app.use("/edit_office", require("./routes/offices/edit_office.js"));
app.use("/get_offices", require("./routes/offices/get_offices.js"));

const officeQuery = "SELECT * FROM Devices.office;";

app.get("/Offices", (req, res) => {
	connection.query(officeQuery, (err, results) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			data: results
		});
	});
});

let getUsersRouter = require("./routes/users/getUsers");
let newUserRouter = require("./routes/users/newUser");

app.post('/users', require('connect-ensure-login').ensureLoggedIn(), getUsersRouter);

// app.use('/users', getUsersRouter);
app.use("/new_user", newUserRouter.router);


app.get("/helloWorld", (req, res) => {
	res.status(200).send("Hello World!");
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
	res.redirect("/");
});

function findUserById(id, callback) {
  dbms.dbquery(`Select * from Users where id='${id}' limit 1;`, (err, results) => {
		if (err) {
			console.error(err);
			callback(err, undefined);
		} else {
			SQLArrayToJSON(results, (json) => {
        console.log(json);
				callback(undefined, json);
			});
		}
	});
}

function findUserByUsername(id, callback) {
  dbms.dbquery(`Select * from Users where email='${id}' limit 1;`, (err, results) => {
		if (err) {
			console.error(err);
			callback(err, undefined);
		} else {
			SQLArrayToJSON(results, (json) => {
        console.log(json);
				callback(undefined, json);
			});
		}
	});
}

function SQLArrayToJSON(sql, callback) {
	const arr = [];
	Object.keys(sql).forEach((key) => {
		const rowObj = {};
		const row = sql[key];
		Object.keys(row).forEach((keyc) => {
			rowObj[keyc] = row[keyc];
		});
		arr.push(rowObj);
	});
	callback(arr);
}

module.exports = app;
