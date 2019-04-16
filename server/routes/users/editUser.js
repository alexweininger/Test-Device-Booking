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

	let err = isValidUser(user);

	if (err) {
		res.status(400).send(err);
	} else {
		const insert = 'INSERT INTO atbl_Users (firstName, lastName, email, slackUsername, id, officeId, role)';
		const values = ` VALUES ('${user.FirstName}', '${user.LastName}', '${user.Email}', '${user.SlackUsername}', '${user.ID}', '${user.OfficeId}', '${user.Role}');`
		dbms.dbquery(insert + values, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User added successfully.');
			}
		});
	}

	// Update Users
	const update = `
	UPDATE atbl_Users
	Set FirstName='${user.FirstName}', LastName='${user.LastName}', Email='${user.Email}', SlackUsername='${user.SlackUsername}', OfficeId='${user.OfficeId}, Role='${user.Role}'
	WHERE ID='${user.ID}';
	`;

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
	const keys = ['lastName', 'firstName', ];
	let err;
	keys.forEach(key => {
		if (!user[key]) {
			err = `user.${key} is not defined.`;
		}
	});
	return err;
}

module.exports = router;
