import { configureStore } from '@reduxjs/toolkit'
import destinationFlightsReducer from './destinationFlights'
import brandReducer from './brand'
import flightReducer from './flight'
import flightNoReducer from './flightNo'
import finalArrayReducer from './finalArray'
export default configureStore({
  reducer: {
    destinationFlights:destinationFlightsReducer,
    brand:brandReducer,
    flight:flightReducer,
    flightNo:flightNoReducer,
    finalArray:finalArrayReducer,
  },
})