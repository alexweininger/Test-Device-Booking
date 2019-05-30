function timeArray_test(date, closestBooking) {
    var time = [];
  
    var currentDate = date;
    var bookingUntilDate = date;
    var min = date.getMinutes();
    var hours = date.getHours();

    if (closestBooking == 0) {
      return time;
    }
    if (closestBooking == 1) {
      bookingUntilDate.setDate(date.getDate() + 1);
      bookingUntilDate.setHours(0);
      bookingUntilDate.setMinutes(0);
    } else {
      bookingUntilDate = closestBooking;
    }
    min = (Math.ceil(min / 15) + 1) * 15;
    if (min > 60) {
      currentDate.setHours(hours + 1, 15);
    } else {
      currentDate.setHours(hours);
      currentDate.setMinutes(min);
    }
  
    while (bookingUntilDate - currentDate >= 0) {
      time.push(currentDate);
      currentDate = new Date(currentDate.getTime() + 15 * 60000);
    }
    return time;
  }

  function handleChecks_test(value, set, isChecked) {
    if (set.has(value)) {
      set.delete(value);
    } else {
      set.add(value);
    }
    return set;
  }

  function createQuery_test(locationSet, brandSet, availabilitySet) {
    let locations = Array.from(locationSet);
    let brands = Array.from(brandSet);
    let i = 0;
  
    let query = "";
    if (locations.length != 0) {
      locations.map(location => {
        if (i == 0) query += 'WHERE (atbl_Office.`City`="' + location + '"';
        else query += ' OR atbl_Office.`City`="' + location + '"';
        i++;
      });
      query += ")";
      if (brands.length != 0) {
        i = 0;
        brands.map(brand => {
          if (i == 0) query += ' AND (atbl_Device.`Brand`="' + brand + '"';
          else query += ' OR atbl_Device.`Brand`="' + brand + '"';
          i++;
        });
        query += ")";
      }
      if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
        query += ' AND atbl_Device.`Available`="1"';
      }
    } else if (brands.length != 0) {
      i = 0;
      brands.map(brand => {
        if (i == 0) query += 'WHERE (atbl_Device.`Brand`="' + brand + '"';
        else query += ' OR atbl_Device.`Brand`="' + brand + '"';
        i++;
      });
      query += ")";
      if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
        query += ' AND atbl_Device.`Available`="1"';
      }
    } else {
      if (availabilitySet.has("Available") && !availabilitySet.has("Show all")) {
        query += ' WHERE atbl_Device.`Available`="1"';
      }
    }
    return query;
  }

  export { timeArray_test, handleChecks_test, createQuery_test };