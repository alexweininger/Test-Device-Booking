module.exports = require("babel-jest").createTransformer({
    rootMode: "upward",
  });

var getUsers = require('../routes/users/getUsers');

test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
});

describe('test the getUsers route that returns a json array of all users' () => {
	test('getUsers', () => {
		expect('')
	});
});

it('')
