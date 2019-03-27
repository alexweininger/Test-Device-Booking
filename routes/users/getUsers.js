"use strict";
const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('./dbms');

var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.post('/', function (req, res) {
	console.log('getUsers: request recieved');

	// make call to db to get all users
	dbms.dbquery('Select * from Users;', (err, results) => {
		if (err) {
			console.error(err);
			res.status(400).send(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			SQLArrayToJSON(results, (json) => {
				res.status(200).json(json);
			});
		}
	});
});

// make sure id is an admin id
function isValidId(id) {
	if (!id) {
		return 'No id was provided in the body of the http request.';
	}
	let err;
	return err;
}

function SQLArrayToJSON(sql, callback) {
	let arr = [];
	Object.keys(sql).forEach(function (key) {
		let rowObj = {};
		var row = sql[key];
		Object.keys(row).forEach(function (keyc) {
			var col = row[keyc];
			rowObj[keyc] = row[keyc];
		});
		arr.push(rowObj);
	});
	callback(arr);
}

module.exports = router;


// CREATE TABLE Users
//     (
//     firstName varchar(255),
//     lastName varchar(255),
//     email varchar(255),
//     slackUsername varchar(255),
//     id int(20),
//     officeId int(11),
//     role int(2) -- 0: normal user, 1: admin
//	   password varchar(255) --encrypted password
// 	);

// 	INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role, password)
// VALUES ('Niraj', 'Mali', 'nirajmali@aol.com', 'everest', '303', '003', '0', '*********');
