module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const fetch = require("node-fetch");
const request = require("supertest");
const app = require("../server/app");
var getDevices = require("../server/routes/devices/get_dayBookings");

var date = new Date();
//startTime
var startDate =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getDate() +
  " " +
  date.getHours() +
  ":" +
  date.getMinutes() +
  ":" +
  date.getSeconds();
//endTime
finishDate =
  date.getFullYear() +
  "-" +
  (date.getMonth() + 1) +
  "-" +
  date.getDate() +
  " " +
  (date.getHours() + 1) +
  ":" +
  date.getMinutes() +
  ":" +
  date.getSeconds();

describe("test the /new_reserve route that inserts new date", () => {
  test("get_day request returns OK", () => {
    var Id = "0030037972";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("POST /new_reserve (device ID=0030037972) equal StartDate = 2019-05-12T06:45:36.000Z", async () => {
    var Id = "0030037972";

    return await request(app)
      .post("/new_reserve")
      .send({
        startDate,
        finishDate,
        ID: "2",
        sNumber: Id
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("get_dayBooking request returns a an array with a length equal 2+1", async () => {
    var Id = "0030037972";

    const response = await request(app).get(`/get_dayBookings/${Id}`);
    return expect(response.body.length).toBe(3);
  });

  test("get_dayBooking request returns a value (new added device ID=0030037972) equal StartDate = 2019-05-12 09:08:06", () => {
    var Id = "0030037972";
    var tempDate = "2019-05-12T09:08:06.000Z";
    return request(app)
      .get(`/get_dayBookings/${Id}`)
      .then(response => {
        expect(response.body[0].StartDate).toContain(tempDate);
      });
  });
});
