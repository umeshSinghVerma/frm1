import { configureStore } from '@reduxjs/toolkit'
import destinationFlightsReducer from './destinationFlights'
import brandReducer from './brand'
import flightReducer from './flight'
import flightNoReducer from './flightNo'
import finalArrayReducer from './finalArray'
import displayArrayReducer from './displayArray'
import finalArrayDupReducer from './finalArrayDup'
export default configureStore({
  reducer: {
    destinationFlights:destinationFlightsReducer,
    brand:brandReducer,
    flight:flightReducer,
    flightNo:flightNoReducer,
    finalArray:finalArrayReducer,
    displayArray:displayArrayReducer,
    finalArrayDup:finalArrayDupReducer
  },
})