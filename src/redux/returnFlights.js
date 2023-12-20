import { createSlice } from '@reduxjs/toolkit'
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualReturns = [];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Arrival && arrivalTo == item.Departure) {
    actualReturns.push(item);
  }
});
console.log('actual returns ',actualReturns);
const initialState = {
  returnFlightsArray: [...actualReturns],
}

export const returnFlightsArraySlice = createSlice({
  name: 'returnFlightsArray',
  initialState,
  reducers: {
    joinreturnFlightsArray: (state, action) => {
      const newarr=[...state.returnFlightsArray,action.payload];
      state.returnFlightsArray=[...newarr];
    },
  },
})

export const { joinreturnFlightsArray } = returnFlightsArraySlice.actions

export default returnFlightsArraySlice.reducer