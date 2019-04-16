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
const dbms = require("./routes/dbms");

passport.use(
	new Strategy(function(username, password, cb) {
		findUserByUsername(username, function(err, user) {
			if (err) {
				console.log(err);
				return cb(err);
			}
			if (!user) {
				console.log("error");
				return cb(null, false);
			}
			if (user.password != password) {
				console.log("user", user);
				console.log("wrong password", user.password, password);
				return cb(null, false);
			}
			console.log("here");
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
	console.log("serializeuser", user);

	cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
	console.log("deserializeuser", id);

	findUserById(id, function(err, user) {
		console.log("user returned", user);

		if (err) {
			return cb(err);
		}
		cb(null, user.id);
	});
});

const app = express();

// allows for static page serving
app.use(express.static(__dirname + "/client/public"));

// body parser for post requests
// app.use(bodyParser.json());
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
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type,*");

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader("Access-Control-Allow-Credentials", true);

	// Pass to next layer of middleware
	next();
});

app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true , cookie: {secure: false, sameSite: false}}));

// initalize passport.js
app.use(passport.initialize());

// persistent login sessions
app.use(passport.session());

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

function loggedIn(req, res) {
  console.log('loggedin req.user: ', req.user);
}

app.post("/users", require('connect-ensure-login').ensureLoggedIn(), getUsersRouter);

// app.use('/users', getUsersRouter);
app.use("/new_user", newUserRouter.router);

app.get("/helloWorld", (req, res) => {
	res.status(200).send("Hello World!");
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), function(req, res) {
	console.log("login success", req.user);
  req.user.password = undefined;
	res.status(200).send(req.user);
});

function findUserById(id, callback) {
	process.nextTick(() => {
		dbms.dbquery(`Select * from Users where id='${id}' limit 1;`, (err, results) => {
			if (err) {
				console.error(err);
				callback(err, undefined);
			} else {
				SQLArrayToJSON(results, json => {
					console.log("got user: ", json);
					callback(undefined, json);
				});
			}
		});
	});
}

function findUserByUsername(id, callback) {
	process.nextTick(() => {
		dbms.dbquery(`Select * from Users where email='${id}' limit 1;`, (err, results) => {
			if (err) {
				console.error(err);
				callback(err, undefined);
			} else {
				SQLArrayToJSON(results, json => {
					console.log("found user by username", json);
					callback(undefined, json);
				});
			}
		});
	});
}

function SQLArrayToJSON(sql, callback) {
	const arr = [];
	Object.keys(sql).forEach(key => {
		const rowObj = {};
		const row = sql[key];
		Object.keys(row).forEach(keyc => {
			rowObj[keyc] = row[keyc];
		});
		arr.push(rowObj);
	});
	callback(arr[0]);
}



module.exports = app;
