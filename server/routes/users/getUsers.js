const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');
const router = express.Router();

function SQLArrayToJSON(sql, callback) {
	const arr = [];
	Object.keys(sql).forEach((key) => {
		const rowObj = {};
		const row = sql[key];
		Object.keys(row).forEach((keyc) => {
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


// CREATE TABLE Users
//     (
//     firstName varchar(255),
//     lastName varchar(255),
//     email varchar(255),
//     slackUsername varchar(255),
//     id int(20),
//     officeId int(11),
//     role int(2) -- 0: normal user, 1: admin
//	   password varchar(255) --encrypted password
// 	);

// 	INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role, password)
// VALUES ('Niraj', 'Mali', 'nirajmali@aol.com', 'everest', '303', '003', '0', '*********');

// INSERT INTO Users (firstName, lastName, email, slackUsername, id, officeId, role, password)
// VALUES ('Andrew', 'Lang', 'andrew_lang_98@hotmail.com', 'langa', '305', '003', '0', '*********'),
//  ('Benji', 'Dog', 'benjithedog@hotmail.com', 'benji', '306', '003', '0', '*********'),
//  ('Big', 'Chungus', 'chugus@big.com', 'chugus', '307', '003', '0', '*********');
