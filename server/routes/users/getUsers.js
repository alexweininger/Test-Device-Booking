const bodyParser = require("body-parser");
const dbms = require('../dbms');
var express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
	// make call to db to get all users
	const queryString = 'Select * from Users;';
	dbms.dbquery(queryString, (err, results) => {
		if (err) {
			console.error(err);
			res.status(400).send(err);
		} else {
			res.setHeader('Content-Type', 'application/json');
			dbms.SQLArrayToJSON(results, (json) => {
				res.status(200).json(json);
			});
		}
	});
});

module.exports = router;
