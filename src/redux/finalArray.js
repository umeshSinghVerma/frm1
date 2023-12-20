import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
let initialFinalArray=[];
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
    initialFinalArray=[...initialFinalArray,...alp];
  });
});
console.log('initialFinalArray ',initialFinalArray);

const initialState = {
  finalArray: [...initialFinalArray],
}

export const finalArraySlice = createSlice({
  name: 'finalArray',
  initialState,
  reducers: {
    replacefinalArray: (state, action) => {
      const newarr = [...action.payload]
      newarr.sort(GetPriceSort());
      state.finalArray = [...newarr]
    },
    joinfinalArray: (state, action) => {
      const newarr = [...state.finalArray, ...action.payload];
      newarr.sort(GetPriceSort());
      state.finalArray = [...newarr];
    },
    timeSortedfinalArray: (state, action) => {
      const newarr = [...state.finalArray]
      newarr.sort(GetTimeSort());
      state.finalArray = [...newarr]
    },
  },
})

export const { replacefinalArray, joinfinalArray, timeSortedfinalArray } = finalArraySlice.actions

export default finalArraySlice.reducer