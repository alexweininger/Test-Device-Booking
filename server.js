const express = require('express');
const mysql = require('mysql');  

const app = express();
app.use(express.static(__dirname + '/client/public'));

//body parser for posts
const bodyParser = require("body-parser");
app.use(bodyParser.json());


const port = 5000;

app.listen(port, () => 'Server running on port ${port}');
