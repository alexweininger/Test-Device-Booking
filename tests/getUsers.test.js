module.exports = require('babel-jest').createTransformer({
	rootMode: 'upward',
});

const request = require('supertest');
const app = require('../server/app');

describe('Tests if the server started successfully', () => {
	test('It should response the GET method', () => request(app).get('/helloWorld').then((response) => {
		expect(response.statusCode).toBe(200);
	}));
});

describe('test the /getUsers route that returns a json array of all users', () => {
	test('getUsers request returns OK', () => request(app).post('/users').then((response) => {
		expect(response.statusCode).toBe(200);
	}));

	test('getUsers request returns a defined object', () => request(app).post('/users').then((response) => {
		expect(response.body).toBeDefined();
	}));

	test('getUsers request returns a an array with a length of at least 1', () => request(app).post('/users').then((response) => {
		expect(response.body.length).toBeGreaterThan(0);
	}));
});
