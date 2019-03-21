var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
	res.send(req.body.foo);
});

module.exports= router;