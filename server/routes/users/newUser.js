"use strict";
const bodyParser = require("body-parser");
var express = require('express');

var router = express.Router();

// parse any type of request using bodyParser.json
router.use(bodyParser.json({ type: '*/*' }));

// Handles requests to create a new user.
router.post('/', function (req, res) {
	const user = req.body;

	let err = isValidUser(user);

	if (err) {
		res.status(400).send(err);
	} else {
		res.status(200).send('Profile created successfully.');
	}
});

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
