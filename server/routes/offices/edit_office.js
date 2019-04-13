var express = require('express');
var router = express.Router();

var database = require('../dbms');
router.post('/', (req, res) => {
	const office= req.body;
	
	var query = "UPDATE office " + 
		"SET Country = '(country)', City = '(city)', Address = '(address)' " +
		"WHERE id_Office = (id)";
	query = query.replace("(country)", office.updatedOffice.country);
	query = query.replace("(city)", office.updatedOffice.city);
	query = query.replace("(address)", office.updatedOffice.address);
	query = query.replace("(id)", office.officeToChange);
	
	console.log(query);
	database.dbquery(query, callBack);
	res.send(200);
});

function callBack(error, data){
	console.log("Callback function");
	console.log(error);
	console.log(data);
}

module.exports= router;