module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server/app");

var Id = 30037972;
nrOfBookings = 2;
setTimeout(
  describe("test the /get_dayBookings route that returns a json array of all days", () => {
    test("get_day request returns OK", () => {
      return request(app)
        .get(`/get_dayBookings/${Id}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });

    test("get_dayBookings request returns a defined object", () => {
      return request(app)
        .get(`/get_dayBookings/${Id}`)
        .then(response => {
          expect(response.body).toBeDefined();
        });
    });

    test(`get_dayBooking request returns a an array with a length equal ${nrOfBookings}`, async () => {
      //returns count of rows by Id
      const response = await request(app).get(`/get_dayBookings/${Id}`);
      return expect(response.body.length).toBe(nrOfBookings);
    });

    test(`get_dayBooking request returns a value (device ID=${Id})`, async () => {
      const response = await request(app).get(`/get_dayBookings/${Id}`);
      return expect(response.body[0].fk_device_ser_nr).toBe(Id);
    });
  }),
  5000
);
