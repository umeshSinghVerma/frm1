import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  destinationFlightsArray: [],
}

export const destinationFlightsSlice = createSlice({
  name: 'destinationFlights',
  initialState,
  reducers: {
    addFlight: (state, action) => {
      state.destinationFlightsArray=[...state.destinationFlightsArray,action.payload]
    },
  },
})

// Action creators are generated for each case reducer function
export const { addFlight } = destinationFlightsSlice.actions

export default destinationFlightsSlice.reducer