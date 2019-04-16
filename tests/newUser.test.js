module.exports = require("babel-jest").createTransformer({
	rootMode: "upward"
});

const request = require("supertest");
const app = require("../server/app");
var newUser = require("../server/routes/users/newUser");

describe("test the isValidUser function", () => {


	let userMissingEmail = {
		firstName: "John",
		lastName: "Doe",
		officeId: "1",
		id: "1234",
		role: "0"
	};

	test("isValidUser returns an error that says the user object is missing the email property.", () => {
		console.log(newUser.isValidUser(userMissingEmail));
		expect(newUser.isValidUser(userMissingEmail)).toEqual(expect.stringContaining('email'));
	});

	let validUser = {
		firstName: "John",
		lastName: "Doe",
		email: "john.doe@hotmail.com",
		officeId: "1",
		id: "1234",
		role: "0"
	};

	test("isValidUser returns no error string.", () => {
		console.log(newUser.isValidUser(userMissingEmail));
		expect(newUser.isValidUser(validUser)).toBeUndefined();
	});
});

describe("test the new user route to add a user to the database", () => {


	let userMissingEmail = {
		firstName: "test",
		lastName: "test",
		officeId: "1",
		id: "453",
		role: "0"
	};

	test("/new_user post request with invalid user in the body returns a 400 status.", () => {
		return request(app).post("/new_user").send(userMissingEmail).then(response => {
			expect(response.statusCode).toBe(400);
        });
	});

	let validUser = {
		firstName: "test",
		lastName: "test",
		email: "test.test@hotmail.com",
		officeId: "1",
		id: "1337",
		role: "0"
	};

	test("/new_user post request with a valid user in body returns a 200 status.", () => {
		return request(app).post("/new_user").send(validUser).then(response => {
			expect(response.statusCode).toBe(200);
        });
	});
});
