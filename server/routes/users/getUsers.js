const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');
const router = express.Router();

router.post('/', (req, res) => {
	// make call to db to get all users
	const queryString = 'Select * from Users;';
	dbms.dbquery(queryString, (err, results) => {
		if (err) {
			console.error(err);
			res.status(400).send(err);
		} else {
			// console.log('results', results);
			res.setHeader('Content-Type', 'application/json');
			dbms.SQLArrayToJSON(results, (json) => {
				res.status(200).json(json);
			});
		}
	});
});

module.exports = router;
