var express = require('express');
var router = express.Router();

// respond with "hello world" when a GET request is made to the homepage
router.post('/', function (req, res) {
	console.log('hello');
  	console.log(req.body);
});

module.exports = router;
