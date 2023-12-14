import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  returnFlightsArray: [],
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