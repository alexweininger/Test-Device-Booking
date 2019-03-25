const express = require('express');
const bodyParser = require('body-parser');
var app = express();

var newUserRoute = require('./routes/users/newUser');

app.use(express.static(__dirname + '/client/public'));

app.get('/api/customers', (req, res) => {
  console.log('hello');
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
  ];
  res.json(customers);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json('application/*+json'));

app.post('/users/new', (req, res) => {
  console.log('post');
  // console.log(JSON.parse(req.body));
  console.log(req.body);
  res.send({'hello':'world'});
});

const port = 5000;


app.listen(port, () => `Server running on port ${port}`);


module.exports = app;
