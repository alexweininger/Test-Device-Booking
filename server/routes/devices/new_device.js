var express = require('express');
var router = express.Router();

var db = require('../dbms.js');

router.post('/', (req, res) => {
	const device= req.body;

 let query= "INSERT INTO device (Brand, Model, Description, Image," +
                " Serial_Number, Status, Name, Month/Year, OS, Category,"+
                " Subcategory, Purchased_on, Vendor, Tax_rate, fk_office_id ) " +
			          "VALUES ('{Brand}', '{Model}', '{Description}', '{Image}',"+
                " '{Serial_Number}', '{Status}', '{Name}', '{Month/Year}',"+
                " '{OS}', '{Category}', '{Subcategory}', '{Purchased_on}',"+
                " '{Vender}', '{Tax_rate}', '{fk_office_id}');";

	query= query.replace('{Brand}', device.Brand)
  .replace('{Model}', device.Model)
  .replace('{Image}', device.Description)
  .replace('{Serial_Number}', device.Serial_Number)
  .replace('{Status}', device.Status)
  .replace('{Name}', device.Name)
  .replace('{Month/Year}', device[Month/Year])
  .replace('{OS}', device.OS)
  .replace('{Category}', device.Category)
  .replace('{Subcategory}', device.Subcategory)
  .replace('{Purchased_on}', device.Purchased_on)
  .replace('{Vendor}', device.Vendor)
  .replace('{Tax_rate}', device.Tax_rate)
  .replace('{fk_office_id}', deevice.fk_office_id);


	db.dbqueryPromise(query).then(results => {
		//if the insert is successful, pull off the id that was given
		//and send it to the client
		res.json({
			success : true,
		});

	}).catch(err => {
		console.log("There was an error inserting a new device:");
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
