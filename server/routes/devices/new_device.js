var express = require("express");
var router = express.Router();

const dataBase = process.env.NODE_ENV === "test" ? "dbmsTest.js" : "dbms.js";

var db = require(`../${dataBase}`);

router.post("/", (req, res) => {
  const device = req.body;

  let query =
    "INSERT INTO atbl_device (Brand, Model, Description, Image," +
    " Serial_Number, Status, Name, Release_date, OS, Category," +
    " Subcategory, Purchased_on, Vendor, Tax_rate, fk_office_id, Available) " +
    "VALUES ('{Brand}', '{Model}', '{Description}', '{Image}'," +
    " '{Serial_Number}', '{Status}', '{Name}', '{Release_date}'," +
    " '{OS}', '{Category}', '{Subcategory}', '{Purchased_on}'," +
    " '{Vendor}', '{Tax_rate}', '{fk_office_id}', '{Available}');";

  query = query
    .replace("{Brand}", device.Brand)
    .replace("{Model}", device.Model)
    .replace("{Description}", device.Description)
    .replace("{Image}", device.Image)
    .replace("{Serial_Number}", device.Serial_Number)
    .replace("{Status}", device.Status)
    .replace("{Name}", device.Name)
    .replace("{Release_date}", device.Release_date)
    .replace("{OS}", device.OS)
    .replace("{Category}", device.Category)
    .replace("{Subcategory}", device.Subcategory)
    .replace("{Purchased_on}", device.Purchased_on)
    .replace("{Vendor}", device.Vendor)
    .replace("{Tax_rate}", device.Tax_rate)
    .replace("{fk_office_id}", device.fk_office_id)
    .replace("{Available}", "1");

  db.dbqueryPromise(query)
    .then(results => {
      res.json({
        success: true,
        Number: results.insertId
      });
    })
    .catch(err => {
      console.log("There was an error inserting a new device:");
      console.log("---------------------------------");
      console.log(err);
      console.log("---------------------------------");

      //if the insert is unsuccessful, notify the client
      res.json({
        success: false
      });
    });
});

module.exports = router;
