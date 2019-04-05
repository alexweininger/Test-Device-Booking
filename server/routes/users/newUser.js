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

	let err = isValidUser(user);

	if (err) {
		res.status(400).send(err);
	} else {
		const insert = 'INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role)';
		const values = ` VALUES ('${user.firstName}', '${user.lastName}', '${user.email}', '${user.slackUsername}', '${user.id}', '${user.officeId}', '${user.role}');`
		dbms.dbquery(insert + values, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User added successfully.');
			}
		});
	}
});

function isValidUser(user) {
	if (!user) {
		return 'User is not defined.';
	}
	const keys = ['lastName', 'firstName'];
	let err;
	keys.forEach((key) => {
		if (!user[key]) {
			err = `user.${key} is not defined.`;
		}
	});
	return err;
}

// user object:
// {
// lastName: '',
// firstName: '',
// slackUsername: '',
// employID: '',
// officeID: '',
// username: '',
// password: ''
// }
//

module.exports = router;
