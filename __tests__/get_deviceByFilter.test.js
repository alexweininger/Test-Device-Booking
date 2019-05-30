module.exports = require("babel-jest").createTransformer({
  rootMode: "upward"
});
process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../server/app");

var brand = "Asus";
var city = "San Lorenzo";
var available = 1;
var nrOfCity = 1;
var nrOfBrand = 2;
var nrOfAvailable = 8;

describe("test the get_deviceByFilter route that returns a json array of different devices by Filter", () => {
  test("get_deviceByFilter request returns OK", () => {
    return request(app)
      .get(`/get_deviceByFilter/WHERE atbl_Device.Available=${available}`)
      .then(response => {
        expect(response.body).toBeDefined();
      });
  });

  test(`get_deviceByFilter request returns an array with a length equal ${nrOfAvailable} (available is ${available})`, () => {
    return request(app)
      .get(`/get_deviceByFilter/WHERE atbl_Device.Available=${available}`)
      .then(response => {
        expect(response.body.length).toBe(nrOfAvailable);
      });
  });

  test(`get_deviceByFilter request returns an array with a length equal ${nrOfBrand} (brand is ${brand})`, async () => {
    const response = await request(app).get(
      `/get_deviceByFilter/WHERE atbl_Device.Brand ="${brand}"`
    );
    expect(response.body[0].Brand).toContain(brand);
    return expect(response.body.length).toBe(nrOfBrand);
  });
  test(`get_deviceByFilter request returns an array with a lenght equal ${nrOfCity} (location is ${city}) `, async () => {
    const response = await request(app).get(
      `/get_deviceByFilter/WHERE atbl_Office.City= "${city}"`
    );
    return expect(response.body.length).toBe(nrOfCity);
  });
});
