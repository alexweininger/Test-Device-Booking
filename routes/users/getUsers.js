"use strict";
const bodyParser = require("body-parser");
var express = require('express');
var dbms = require('./dbms');

var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.post('/', function (req, res) {
	console.log('request recieved', req.body);

	const id = req.body;
	let err = isValidId(id);
	if (err) {
		res.status(400).send(err);
	} else {
		console.log(id);

		// make call to db to get all users
		dbms.dbquery('Select * from Users;', (err, results) => {
			if (err) {
				console.error(err);
				res.status(400).send(err);
			}
			console.log(results);
			res.status(200).json(results);
		});
	}
});

// make sure id is an admin id
function isValidId(id) {
	if (!id) {
		return 'No id was provided in the body of the http request.';
	}
	let err;
	return err;
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
// 	);

// 	INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role)
// VALUES ('Niraj', 'Mali', 'nirajmali@aol.com', 'everest', '303', '003', '0');
