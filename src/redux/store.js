import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import destinationFlightsReducer from './destinationFlights'
import brandReducer from './brand'
export default configureStore({
  reducer: {
    counter:counterReducer,
    destinationFlights:destinationFlightsReducer,
    brand:brandReducer,
  },
})