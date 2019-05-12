module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";
const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_dayBookings");

describe("test the /get_dayBookings route that returns a json array of all days", () => {
  test("get_day request returns OK", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("get_dayBookings request returns a defined object", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test("get_dayBooking request returns a an array with a length equal 3", async () => {
    var Id = "0030037972";
    const response = await request(app).get(`/get_dayBookings/${Id}`);
    return expect(response.body.length).toBe(3);
    //response.on("data", function(chunk) {});
  });
  test("get_dayBooking request returns a an array with a length of at least 0", () => {
    var Id = "0030037974";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body.length).toBeGreaterThanOrEqual(0);
      });
  });
  test("get_dayBooking request returns a value (device ID=0030037972) equal StartDate = 2019-05-12 09:12:36", () => {
    var Id = "0030037972";
    var date = new Date();

    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body[1].StartDate).toContain(
          "2019-05-12T09:12:36.000Z"
        );
      });
  });
});
