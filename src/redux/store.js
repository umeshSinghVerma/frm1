import { configureStore } from '@reduxjs/toolkit'
import destinationFlightsReducer from './destinationFlights'
import brandReducer from './brand'
import flightReducer from './flight'
export default configureStore({
  reducer: {
    destinationFlights:destinationFlightsReducer,
    brand:brandReducer,
    flight:flightReducer,
  },
})