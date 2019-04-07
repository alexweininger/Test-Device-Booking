const bodyParser = require('body-parser');
const express = require('express');

const router = express.Router();

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

// parse any type of request using bodyParser.json
router.use(bodyParser.json({ type: '*/*' }));

// Handles requests to create a new user.
router.post('/', (req, res) => {
	const user = req.body;

	const err = isValidUser(user);

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

module.exports = router;
