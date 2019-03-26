"use strict";
const bodyParser = require("body-parser");
var express = require('express');
var router = express.Router();
router.use(bodyParser.json({ type: '*/*' }))

// parse some custom thing into a Buffer
router.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
router.use(bodyParser.text({ type: 'text/html' }))
router.use(bodyParser.json());
// respond with "hello world" when a GET request is made to the homepage
router.post('/', function (req, res) {
	console.log('request recieved', req.body);

	const user = req.body;
	let err = isValidUser(user);
	if (err) {
		res.send(400).send(err);
	} else {
		console.log(user.lastName, user.firstName, user.email, user.slackName, user.id, user.officeId);
		res.send(200, 'User added to database.');
	}
});

function isValidUser(user) {
	if (!user) {
		return 'User is not defined.';
	}
	const keys = ['lastName', 'firstName'];
	let err;
	keys.forEach(key => {
		if (!user[key]) {
			err = `user.${key} is not defined.`;
		}
	});
	return err;
}

module.exports = router;
