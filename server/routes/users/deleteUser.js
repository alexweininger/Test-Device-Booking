const bodyParser = require("body-parser");
var express = require('express');
const dbms = require('../dbms');
var router = express.Router();

router.use(bodyParser.json({ type: '*/*' }));

router.post('/', function (req, res) {
	// in the request body of edit user should be the entire updated user object as keys and values
	const id = req.body.id;
	const adminId = req.body.id; // some how check if admin???

	let err = isValidId(id);

	if (err) {
		console.log("didn't delete user");
		res.status(400).send(err);
	} else {
		const deleteQuery = `DELETE FROM Users WHERE id='${id}';`;
		dbms.dbquery(deleteQuery, (err, results) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.status(200).send('User deleted successfully.');
			}
		});
	}
});

// make sure id is an admin id
function isValidId(id) {
	if (!id) {
		return 'No id was provided in the body of the http request.';
	}

	let err;
	return err;
}

module.exports = router;
