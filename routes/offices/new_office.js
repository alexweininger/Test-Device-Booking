var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.post('/', (req, res) => {
	const office= req.body;
	
	//TODO make sure the office is unique
	
	let query= 'INSERT INTO office (Country, City, Address) ' +
			   'VALUES ({country}, {city}, {address});';
	
	query= query.replace('{country}', office.country)
		   .replace('{city}', office.city)
		   .replace('{address}', office.address);
	
	console.log(query);
	
	db.dbqueryPromise(query).then(results => {
		console.log(results);
	}).catch(err => {
		console.log("There was an error:");
		console.log(err);
	});
				
	res.sendStatus(200);
});

module.exports= router;