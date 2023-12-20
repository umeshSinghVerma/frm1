import { createSlice } from '@reduxjs/toolkit'
import X from "../data1.json";

const alldata = X.CatalogProductOfferingsResponse;

let uniqueFlights = [];
alldata.ReferenceList[0].Flight.forEach((item) => {
  if (item.carrier && !uniqueFlights.includes(item.carrier)) {
    uniqueFlights.push(item.carrier);
  }
});

const initialState = {
  allFlightsArray: [...uniqueFlights],
}

export const allFlightsArraySlice = createSlice({
  name: 'allFlightsArray',
  initialState,
  reducers: {
    replaceallFlightsArray: (state, action) => {
      const newarr=[...action.payload]
      state.allFlightsArray=[...newarr]
    }
  },
})

export const { replaceallFlightsArray } = allFlightsArraySlice.actions

export default allFlightsArraySlice.reducer