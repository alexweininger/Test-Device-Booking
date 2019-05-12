const { createQuery } = require("../components/Devices/Grid");

test("if Kaunas, Samsung, Samsungas and Available checkboxes are checked", () => {
  const locationSet = new Set(["Kaunas"]);
  const brandSet = new Set(["Samsung", "Samsungas"]);
  const availabilitySet = new Set(["Available"]);

  const query = createQuery(locationSet, brandSet, availabilitySet);
  const expectedQuery = "WHERE (atbl_Office.`City`=\"Kaunas\") AND " + 
    "(atbl_Device.`Brand`=\"Samsung\" OR atbl_Device.`Brand`=\"Samsungas\") AND " + 
    "atbl_Device.`Available`=\"1\"";

  expect(query).toBe(expectedQuery);
});

test("if Samsung, Samsungas and Available checkboxes are checked", () => {
    const locationSet = new Set();
    const brandSet = new Set(["Samsung", "Samsungas"]);
    const availabilitySet = new Set(["Available", "Show all"]);
  
    const query = createQuery(locationSet, brandSet, availabilitySet);
    const expectedQuery = "WHERE " + 
      "(atbl_Device.`Brand`=\"Samsung\" OR atbl_Device.`Brand`=\"Samsungas\")";
  
    expect(query).toBe(expectedQuery);
  });

  test("if Kaunas and Vilnius checkboxes are checked", () => {
    const locationSet = new Set(["Kaunas", "Vilnius"]);
    const brandSet = new Set();
    const availabilitySet = new Set();
  
    const query = createQuery(locationSet, brandSet, availabilitySet);
    const expectedQuery = "WHERE (atbl_Office.`City`=\"Kaunas\" OR atbl_Office.`City`=\"Vilnius\")";
  
    expect(query).toBe(expectedQuery);
  });
