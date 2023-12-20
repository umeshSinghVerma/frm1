import { createSlice } from '@reduxjs/toolkit'
import X from "../data1.json";
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Departure && arrivalTo == item.Arrival) {
    actualDestinations.push(item);
  }
});
const initialState = {
  destinationFlightsArray: [...actualDestinations],
}

export const destinationFlightsSlice = createSlice({
  name: 'destinationFlights',
  initialState,
  reducers: {
    addFlight: (state, action) => {
      state.destinationFlightsArray = [...state.destinationFlightsArray, action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addFlight } = destinationFlightsSlice.actions

export default destinationFlightsSlice.reducer