var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.post('/', (req, res) => {
	const office= req.body;
	
	db.dbqueryPromise('select * from office').then(results => {
		console.log(results);
	}).catch(err => {
		console.log("There was an error");
	});
				
	res.sendStatus(200);
});

module.exports= router;