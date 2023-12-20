import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
let initialDisplayArray=[];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Departure && arrivalTo == item.Arrival) {
    actualDestinations.push(item);
  }
});
const tempDestinationFlights = JSON.parse(JSON.stringify(actualDestinations));
tempDestinationFlights.map((item) => {
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
    initialDisplayArray=[...initialDisplayArray,...alp];
  });
});

const initialState = {
  displayArray: [...initialDisplayArray],
}

export const displayArraySlice = createSlice({
  name: 'displayArray',
  initialState,
  reducers: {
    replacedisplayArray: (state, action) => {
      const newarr=[...action.payload]
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr]
    },
    joindisplayArray: (state, action) => {
      const newarr=[...state.displayArray,...action.payload];
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr];
    },
    timeSorteddisplayArray: (state, action) => {
        const newarr=[...state.displayArray]
        newarr.sort(GetTimeSort());
        state.displayArray=[...newarr]
      },
  },
})

export const { replacedisplayArray,joindisplayArray,timeSorteddisplayArray } = displayArraySlice.actions

export default displayArraySlice.reducer