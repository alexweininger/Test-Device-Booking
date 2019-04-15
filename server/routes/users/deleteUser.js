"use strict";
const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');

var router = express.Router();
router.use(bodyParser.json({ type: '*/*' }));


router.post('/', function (req, res) {
	console.log('editUser: request recieved');
	// in the request body of edit user should be the entire updated user object as keys and values
	const id = req.body.id;
	const adminId = req.body.id; // some how check if admin???

	const err = isValidId(id);

	if (err) {
		res.status(400).send(err);
	} else {
		const deleteQuery = `DELETE FROM Users WHERE id=${id};`;
		res.status(200);
		return;
		dbms.dbquery(deleteQuery, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User deleted successfully.');
			}
		});
	}
});

// make sure id is an admin id
function isValidId(id) {
	if (!id) {
		return 'No id was provided in the body of the http request.';
	} else {
		// todo check id
		return id;
	}
	let err;
	return err;
}

function isValidId

module.exports = router;
