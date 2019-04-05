// app.js
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(express.static(`${__dirname}/client/public`));

// body parser for posts
app.use(bodyParser.json());

const getUsersRouter = require('./routes/users/getUsers');
const newUserRouter = require('./routes/users/newUser');

app.use('/users', getUsersRouter);
app.use('/new_user', newUserRouter);

app.use('/new_office', require('./routes/offices/new_office.js'));
app.use('/edit_office', require('./routes/offices/edit_office.js'));
app.use('/get_offices', require('./routes/offices/get_offices.js'));

const officeQuery = 'SELECT * FROM Devices.office;';

app.get('/Offices', (req, res) => {
	connection.query(officeQuery, (err, results) => {
		if (err) {
			return res.send(err);
		}
		return res.json({
			data: results,
		});
	});
});

app.get('/helloWorld', (req, res) => {
	res.status(200).send('Hello World!');
});
module.exports = app;
