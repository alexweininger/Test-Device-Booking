const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');
const router = express.Router();

function SQLArrayToJSON(sql, callback) {
  const arr = [];
  Object.keys(sql).forEach(key => {
    const rowObj = {};
    const row = sql[key];
    Object.keys(row).forEach(keyc => {
      rowObj[keyc] = row[keyc];
    });
    arr.push(rowObj);
  });
  callback(arr);
}

// respond with "hello world" when a GET request is made to the homepage
router.post('/', (req, res) => {

	console.log('getUsers: request recieved');

	// make call to db to get all users
	dbms.dbquery('Select * from Users;', (err, results) => {
		if (err) {
			console.error(err);
			res.status(400).send(err);
		} else {
			// console.log('results', results);
			res.setHeader('Content-Type', 'application/json');
			SQLArrayToJSON(results, (json) => {
				res.status(200).json(json);
			});
		}
	});
});

module.exports = router;
