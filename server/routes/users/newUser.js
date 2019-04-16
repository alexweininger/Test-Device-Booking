const bodyParser = require('body-parser');
const express = require('express');
const dbms = require('../dbms');

const router = express.Router();

// parse any type of request using bodyParser.json
router.use(bodyParser.json({ type: '*/*' }));

// Handles requests to create a new user.
router.post('/', (req, res) => {
	const user = req.body;

	const err = isValidUser(user);

	if (err) {
		res.status(400).send(err);
	} else {

		if (user.role === undefined) {
			user.role = 0;
		}

		const insert = 'INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role, password)';
		const values = ` VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.slackUsername}', '${user.employeeId}', '${user.officeId}', '${user.role}', '${user.password}');`
		dbms.dbquery(insert + values, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User added successfully.');
			}
		});
	}
});


// validates that the initial user profile is set up
function isValidUser(user) {
	if (!user) {
		return 'User is not defined.';
	}
	const keys = ['lastName', 'firstName', 'email', 'employeeId', 'officeId', 'password'];
	let err;
	keys.forEach((key) => {
		if (!user[key]) {
			err = `user.${key} is not defined.`;
		}
	});
	return err;
}

module.exports = {router, isValidUser};
