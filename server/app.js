// app.js is the main server side script

const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
var passport = require("passport");
const dbconfig = require("./config/database");
const connection = mysql.createConnection(dbconfig.connection);
const bcrypt = require("bcrypt-nodejs");
const LocalStrategy = require("passport-local").Strategy;
var flash = require("connect-flash");
var morgan = require("morgan");
var session = require("express-session");
var cookieParser = require("cookie-parser");
const dbms = require("./routes/dbms");

connection.query(`USE ${dbconfig.database}`);

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
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true, cookie: { secure: false, sameSite: false } }));

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

let newUserRouter = require("./routes/users/newUser");

function loggedIn(req, res, next) {
	res.locals.login = req.isAuthenticated();
	console.log("loggedin req.user: ", req.user, req.body, req.isAuthenticated());
}

app.use("/users", require("./routes/users/getUsers"));
app.use("/new_user", newUserRouter.router);
app.use("/edit_user", require("./routes/users/editUser"));
app.use("/delete_user", require("./routes/users/deleteUser"));

app.post("/signup", passport.authenticate("SignUp"), (req, res) => {
	res.status(200).send("Sign up successful.");
});

app.get("/helloWorld", (req, res) => {
	res.status(200).send("Hello World!");
});

app.post("/login", passport.authenticate("local-login", { failureRedirect: "/login" }), function(req, res) {
	console.log("login success", req.user);
	req.user.password = undefined;
	res.status(200).send(req.user);
});

// function to convert a sql result set to json single object
function SQLArrayToJSONSingleObject(sql, callback) {
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

function findUserById(id, callback) {
	process.nextTick(() => {
		dbms.dbquery(`Select * from Users where id='${id}' limit 1;`, (err, results) => {
			if (err) {
				console.error(err);
				callback(err, undefined);
			} else {
				SQLArrayToJSONSingleObject(results, json => {
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
				SQLArrayToJSONSingleObject(results, json => {
					console.log("found user by username", json);
					callback(undefined, json);
				});
			}
		});
	});
}

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	console.log("deserializeUser id: ", id);
	connection.query("SELECT * FROM Users WHERE id = ? ", [id], (err, rows) => {
		console.log("deserializeUser got back row[0]: ", rows[0]);
		done(err, rows[0]);
	});
});

passport.use(
	"local-login",
	new LocalStrategy(
		{
			usernameField: "username",
			passwordField: "password",
			passReqToCallback: true
		},

		(req, email, password, done) => {
			console.log("username (email): ", email);
			console.log("password: " + password);
			connection.query(`SELECT * FROM Users WHERE email = '${email}';`, (err, rows) => {
				console.log("Rows: " + rows);

				if (err) {
					console.log("Error from query: ", err);
					return done(err);
				}

				if (!rows.length) {
					console.log("NO USERS FOUND");
					return done(null, false, req.flash("loginMessage", "No user found."));
				}
				console.log("password: " + password + " rows: " + rows[0].password);
				let cryptedpassword = bcrypt.hashSync(rows[0].password, null, null);
				if (!bcrypt.compareSync(password, cryptedpassword)) {
					console.log("password is incorrect");
					return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
				}

				console.log("Login successful.");
				return done(null, rows[0]);
			});
		}
	)
);

module.exports = app;
