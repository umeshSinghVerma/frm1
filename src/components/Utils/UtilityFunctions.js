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

function OfferingConnector(alldata, departureFrom, arrivalTo, setDestinationFlights, setReturnFlights, setAllBrands, setAllFlights) {
  alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
    if (departureFrom === item.Departure && arrivalTo === item.Arrival) {
      setDestinationFlights((prev) => [...prev, item]);
    }
    if (departureFrom === item.Arrival && arrivalTo === item.Departure) {
      setReturnFlights((prev) => [...prev, item]);
    }
  });

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

  let uniqueFlights = [];
  alldata.ReferenceList[0].Flight.forEach((item) => {
    if (item.carrier && !uniqueFlights.includes(item.carrier)) {
      uniqueFlights.push(item.carrier);
    }
  });
  setAllFlights(uniqueFlights);
}

function DestinationFlight(destinationFlights, alldata, setFinalArray, setDisplayArray) {
  destinationFlights.map((item) => {
    let ffr;
    let lfr;
    item.ProductBrandOptions.map((f, k) => {
      ffr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[0];
      });
      lfr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[f.flightRefs.length - 1];
      });
      f.DepartureTime = ffr[0].Departure.date;
      f.ArrivalTime = lfr[0].Arrival.date;

      let alp = f.ProductBrandOffering.map((it) => {
        let g = JSON.stringify(f);
        g = JSON.parse(g);
        g.ProductBrandOffering = [];
        g.ProductBrandOffering.push(it);
        return g;
      });
      setFinalArray((prev) => {
        return [...prev, ...alp];
      });
      setDisplayArray((prev) => {
        return [...prev, ...alp];
      });
    });
  });
}

function ReturnFlight(returnFlights, alldata, setFinalArrayDup) {
  returnFlights.map((item) => {
    let ffr;
    let lfr;
    item.ProductBrandOptions.map((f, k) => {
      ffr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[0];
      });
      lfr = alldata.ReferenceList[0].Flight.filter((it) => {
        return it.id === f.flightRefs[f.flightRefs.length - 1];
      });
      f.DepartureTime = ffr[0].Departure.date;
      f.ArrivalTime = lfr[0].Arrival.date;

      let alp = f.ProductBrandOffering.map((it) => {
        let g = JSON.stringify(f);
        g = JSON.parse(g);
        g.ProductBrandOffering = [];
        g.ProductBrandOffering.push(it);
        return g;
      });
      setFinalArrayDup((prev) => {
        return [...prev, ...alp];
      });
    });
  });
}

export {GetPriceSort, GetTimeSort, OfferingConnector, DestinationFlight, ReturnFlight}