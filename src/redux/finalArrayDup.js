import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const returnFlights = [];
let InitialfinalArrayDup = [];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Arrival && arrivalTo == item.Departure) {
    returnFlights.push(item);
  }
});


const tempReturnFlight = JSON.parse(JSON.stringify(returnFlights));
tempReturnFlight.map((item) => {
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
    InitialfinalArrayDup=[...InitialfinalArrayDup,...alp];
  });
});

const initialState = {
  finalArrayDup: [...InitialfinalArrayDup],
}

export const finalArrayDupSlice = createSlice({
  name: 'finalArrayDup',
  initialState,
  reducers: {
    replacefinalArrayDup: (state, action) => {
      const newarr = [...action.payload]
      //   newarr.sort(GetPriceSort());  // uncomment this if want to sort by price
      state.finalArrayDup = [...newarr]
    },
    joinfinalArrayDup: (state, action) => {
      const newarr = [...state.finalArrayDup, ...action.payload];
      //   newarr.sort(GetPriceSort()); // uncomment this if want to sort by price
      state.finalArrayDup = [...newarr];
    },
    timeSortedfinalArrayDup: (state, action) => {
      const newarr = [...state.finalArrayDup]
      newarr.sort(GetTimeSort());
      state.finalArrayDup = [...newarr]
    },
  },
})

export const { replacefinalArrayDup, joinfinalArrayDup, timeSortedfinalArrayDup } = finalArrayDupSlice.actions

export default finalArrayDupSlice.reducer