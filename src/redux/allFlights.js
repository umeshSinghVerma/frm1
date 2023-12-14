import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allFlightsArray: [],
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