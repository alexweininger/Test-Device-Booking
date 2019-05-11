module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";
const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_dayBookings");

describe("test the /get_device route that returns a json array of all days", () => {
  test("get_day request returns OK", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  /*describe("test the /getUsers route that returns a json array of all users", () => {
      test("getUsers request returns OK", () => {
        var newDate = new Date();
        var expectedDate = [];
        var date = getDate(newDate);
        expect(date).toBe(expectedDate);*/

  test("get_dayBookings request returns a defined object", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("POST /new_reserve (device ID=0030037972) equal StartDate = 2019-05-12T06:45:36.000Z", async () => {
    var Id = "0030037972";
    var date = new Date();

    const newReserve = await request(app)
      .post("/new_reserve")
      .send({
        startDate: "2019-05-12T06:45:36.000Z",
        finishDate: "2019-05-12T06:55:36.000Z",
        ID: "2",
        sNumber: "0030037972"
      });
    // make sure we add it correctly
    //expect(newReserve.body).toHaveProperty("{ success: true }");
    expect(newReserve.body.StartDate).toBe("2019-05-12T06:45:36.000Z");
    // expect(newReserve.statusCode).toBe(200);
    // make sure we have 3 students now
    const response = await request(app).get(`/get_dayBookings/${Id}`);
    return expect(response.body.length).toBe(3);
  });

  test("get_dayBooking request returns a an array with a length equal 3", async () => {
    var Id = "0030037972";
    const response = await request(app).get(`/get_dayBookings/${Id}`);
    return expect(response.body.length).toBe(3);
    //response.on("data", function(chunk) {});
  });
  test("get_dayBooking request returns a an array with a length of at least 2", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body.length).toBeGreaterThanOrEqual(3);
      });
  });
  test("get_dayBooking request returns a value (device ID=0030037972) equal StartDate = 2019-05-11T06:45:36.000Z", () => {
    var Id = "0030037972";
    var date = new Date();

    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body[1].StartDate).toContain(
          "2019-05-11T06:45:36.000Z"
        );
      });
  });
});
