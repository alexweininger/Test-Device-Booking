const { handleChecks } = require("../components/Devices/Grid");

test("[Samsung, Samsungas, Samsungas1] checkboxes have been pressed", () => {
  const brandChecks = ["Samsung", "Samsungas", "Samsungas1"];
  let set = new Set();
  const expectedSet = new Set(["Samsung", "Samsungas", "Samsungas1"]);
  brandChecks.map(check => {
      set = handleChecks(check, set);
  })
  expect(set).toEqual(expectedSet);
});

test("[Samsung, Samsung, Samsung, Samsung] checkboxes have been pressed", () => {
    const brandChecks = ["Samsung", "Samsung", "Samsung", "Samsung"];
    let set = new Set();
    const expectedSet = new Set();
    brandChecks.map(check => {
        set = handleChecks(check, set);
    })
    expect(set).toEqual(expectedSet);
  });

test("[Samsung, Samsungas] [Kaunas, Kaunas] [Available] checkboxes have been pressed", () => {
    const brandChecks = ["Samsung", "Samsungas"];
    let brandSet = new Set();
    const expectedBrandSet = new Set(["Samsung", "Samsungas"]);
    brandChecks.map(check => {
        brandSet = handleChecks(check, brandSet);
    })
    expect(brandSet).toEqual(expectedBrandSet);

    const locationChecks = ["Kaunas", "Kaunas"];
    let locationSet = new Set();
    const expectedLocationSet = new Set();
    locationChecks.map(check => {
        locationSet = handleChecks(check, locationSet);
    })
    expect(locationSet).toEqual(expectedLocationSet);

    const availabilityChecks = ["Available"];
    let availabilitySet = new Set();
    const expectedAvailabilitySet = new Set(["Available"]);
    availabilityChecks.map(check => {
        availabilitySet = handleChecks(check, availabilitySet);
    })
    expect(availabilitySet).toEqual(expectedAvailabilitySet);
  });