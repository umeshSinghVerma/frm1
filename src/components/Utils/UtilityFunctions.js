// Function: GetPriceSort
// Returns a comparator function for sorting items based on their total price
function GetPriceSort() {
  return function (a, b) {
    let firstmini = a.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;
    let secondmini = b.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;

    if (firstmini > secondmini) {
      return 1;
    } else if (firstmini < secondmini) {
      return -1;
    }
    return 0;
  };
}


// Function: GetTimeSort
// Returns a comparator function for sorting items based on their departure time
function GetTimeSort() {
  return function (a, b) {
    if (a.DepartureTime > b.DepartureTime) {
      return 1;
    } else if (a.DepartureTime < b.DepartureTime) {
      return -1;
    }
    return 0;
  };
}


// Function: OfferingConnector
// Connects and filters data based on departure and arrival locations, sets state variables
function OfferingConnector(alldata, departureFrom, arrivalTo, setDestinationFlights, setReturnFlights, setAllBrands, setAllFlights) {
  // Iterate through each CatalogProductOffering in the alldata
  alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
    // Check if the offering matches the departure and arrival locations
    if (departureFrom === item.Departure && arrivalTo === item.Arrival) {
      // Add the offering to the destination flights state variable
      setDestinationFlights((prev) => [...prev, item]);
    }
    // Check if the offering matches the reversed departure and arrival locations
    if (departureFrom === item.Arrival && arrivalTo === item.Departure) {
      // Add the offering to the return flights state variable
      setReturnFlights((prev) => [...prev, item]);
    }
  });

  // Extract unique brand information and update the state
  let uniqueBrands = [];
  alldata.ReferenceList[3].Brand.forEach((item) => {
    if (
      item.name &&
      !uniqueBrands.some(
        (brand) => brand.id === item.id && brand.name === item.name
      )
    ) {
      uniqueBrands.push({ name: item.name, id: item.id });
    }
  });
  setAllBrands(uniqueBrands);


  // Extract unique flight information and update the state
  let uniqueFlights = [];
  alldata.ReferenceList[0].Flight.forEach((item) => {
    if (item.carrier && !uniqueFlights.includes(item.carrier)) {
      uniqueFlights.push(item.carrier);
    }
  });
  setAllFlights(uniqueFlights);
}


// Function: DestinationFlight
// Processes destination flights, extracts relevant information, and updates state variables
function DestinationFlight(destinationFlights, alldata, setFinalArray, setDisplayArray) {
  destinationFlights.map((item) => {
    let ffr;
    let lfr;

     // Iterate through each ProductBrandOption in the destination flight
    item.ProductBrandOptions.map((f, k) => {
      // Retrieve flight information for the first and last flight reference
      ffr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[0];
      });
      lfr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[f.flightRefs.length - 1];
      });

      // Update departure and arrival times in the ProductBrandOption
      f.DepartureTime = ffr[0].Departure.date;
      f.ArrivalTime = lfr[0].Arrival.date;

      // Create a modified copy of the ProductBrandOption with only one ProductBrandOffering
      let alp = f.ProductBrandOffering.map((it) => {
        let g = JSON.stringify(f);
        g = JSON.parse(g);
        g.ProductBrandOffering = [];
        g.ProductBrandOffering.push(it);
        return g;
      });

      // Update the final and display arrays with the modified ProductBrandOptions
      setFinalArray((prev) => {
        return [...prev, ...alp];
      });
      setDisplayArray((prev) => {
        return [...prev, ...alp];
      });
    });
  });
}

// Function: ReturnFlight
// Processes return flights, extracts relevant information, and updates state variable
function ReturnFlight(returnFlights, alldata, setFinalArrayDup) {
  returnFlights.map((item) => {
    let ffr;
    let lfr;

    // Iterate through each ProductBrandOption in the return flight
    item.ProductBrandOptions.map((f, k) => {
      // Retrieve flight information for the first and last flight reference
      ffr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[0];
      });
      lfr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[f.flightRefs.length - 1];
      });

      // Update departure and arrival times in the ProductBrandOption 
      f.DepartureTime = ffr[0].Departure.date;
      f.ArrivalTime = lfr[0].Arrival.date;

      // Create a modified copy of the ProductBrandOption with only one ProductBrandOffering
      let alp = f.ProductBrandOffering.map((it) => {
        let g = JSON.stringify(f);
        g = JSON.parse(g);
        g.ProductBrandOffering = [];
        g.ProductBrandOffering.push(it);
        return g;
      });

      // Update the final array with the modified ProductBrandOptions
      setFinalArrayDup((prev) => {
        return [...prev, ...alp];
      });
    });
  });
}

export {GetPriceSort, GetTimeSort, OfferingConnector, DestinationFlight, ReturnFlight}