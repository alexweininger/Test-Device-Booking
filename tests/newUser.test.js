module.exports = require("babel-jest").createTransformer({
	rootMode: "upward"
});

const request = require("supertest");
const app = require("../server/app");
var newUser = require("../server/routes/users/newUser");

describe("test the isValidUser function", () => {
	let validUser = {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@hotmail.com",
		officeId: "1",
		id: "1234"
	};

	let userMissingEmail = {
		firstName: "John",
		lastName: "Doe",
		officeId: "1",
		id: "1234"
	};

	test("isValidUser returns an error that says the user object is missing the email property.", () => {
		console.log(newUser.isValidUser(userMissingEmail));
		expect(newUser.isValidUser(userMissingEmail)).toEqual(expect.stringContaining('email'));
	});
});
