var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.post('/', (req, res) => {
	const office= req.body;

	//TODO make sure the office is unique

	let query= "INSERT INTO office (Country, City, Address) " +
			   "VALUES ('{country}', '{city}', '{address}');";

	query= query.replace('{country}', office.country)
		   .replace('{city}', office.city)
		   .replace('{address}', office.address);

	db.dbqueryPromise(query).then(results => {
		//if the insert is successful, pull off the id that was given
		//and send it to the client
		res.json({
			success : true,
			officeId : results.insertId
		});

	}).catch(err => {
		console.log("There was an error inserting a new office:");
		console.log("---------------------------------");
		console.log(err);
		console.log("---------------------------------");

		//if the insert is unsuccessful, notify the client
		res.json({
			success : false
		});
	});
});

module.exports= router;
