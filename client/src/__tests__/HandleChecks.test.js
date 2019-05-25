const { handleChecks_test } = require("../components/Devices/Grid");

test("[Samsung, Apple, Asus] checkboxes have been pressed", () => {
  const brandChecks = ["Samsung", "Apple", "Asus"];
  let set = new Set();
  const expectedSet = new Set(["Samsung", "Apple", "Asus"]);
  brandChecks.map(check => {
      set = handleChecks_test(check, set);
  })
  expect(set).toEqual(expectedSet);
});

test("[Samsung, Samsung, Samsung, Samsung] checkboxes have been pressed", () => {
    const brandChecks = ["Samsung", "Samsung", "Samsung", "Samsung"];
    let set = new Set();
    const expectedSet = new Set();
    brandChecks.map(check => {
        set = handleChecks_test(check, set);
    })
    expect(set).toEqual(expectedSet);
  });

test("[Samsung, Asus] [Kaunas, Kaunas] [Available] checkboxes have been pressed", () => {
    const brandChecks = ["Samsung", "Asus"];
    let brandSet = new Set();
    const expectedBrandSet = new Set(["Samsung", "Asus"]);
    brandChecks.map(check => {
        brandSet = handleChecks_test(check, brandSet);
    })
    expect(brandSet).toEqual(expectedBrandSet);

    const locationChecks = ["Kaunas", "Kaunas"];
    let locationSet = new Set();
    const expectedLocationSet = new Set();
    locationChecks.map(check => {
        locationSet = handleChecks_test(check, locationSet);
    })
    expect(locationSet).toEqual(expectedLocationSet);

    const availabilityChecks = ["Available"];
    let availabilitySet = new Set();
    const expectedAvailabilitySet = new Set(["Available"]);
    availabilityChecks.map(check => {
        availabilitySet = handleChecks_test(check, availabilitySet);
    })
    expect(availabilitySet).toEqual(expectedAvailabilitySet);
  });