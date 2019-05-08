"use strict";
const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');

var router = express.Router();
router.use(bodyParser.json({ type: '*/*' }));
// respond with "hello world" when a GET request is made to the homepage
router.post('/', function (req, res) {
	console.log('editUser: request recieved');
	// in the request body of edit user should be the entire updated user object as keys and values
	const user = req.body.user;
	const adminId = req.body.id; // some how check if admin???
	console.log("user: " + user);
	console.log("body: " + req.body)
	
	let err = isValidUser(user);

	if (err) {
		res.status(400).send(err);
	} else {
		const update = `UPDATE Users Set firstName='${user.firstName}', lastName='${user.lastName}', email='${user.email}', slackUsername='${user.slackUsername}', officeId='${user.officeId}', role='${user.role}' WHERE id='${user.id}'`;
		console.log("email: " + user.email);
		dbms.dbquery(update, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User added successfully.');
			}
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

function isValidUser(user) {
	if (!user) {
		return 'User is not defined.';
	}
	const keys = ['lastName', 'firstName',];
	let err;
	keys.forEach(key => {
		if (!user[key]) {
			err = `user.${key} is not defined.`;
		}
	});
	return err;
}

module.exports = router;
