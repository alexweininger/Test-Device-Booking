module.exports = require("babel-jest").createTransformer({
    rootMode: "upward",
  });

const request = require('supertest');
const app = require('../server/app');

describe('Tests if the server started successfully', () => {
    test('It should response the GET method', () => {
        return request(app).get("/helloWorld").then(response => {
			expect(response.statusCode).toBe(200);
        })
    });
});
