import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';

const initialState = {
  displayArray: [],
}

export const displayArraySlice = createSlice({
  name: 'displayArray',
  initialState,
  reducers: {
    replacedisplayArray: (state, action) => {
      const newarr=[...action.payload]
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr]
    },
    joindisplayArray: (state, action) => {
      const newarr=[...state.displayArray,...action.payload];
      newarr.sort(GetPriceSort());      // uncomment this if want to sort by price
      state.displayArray=[...newarr];
    },
    timeSorteddisplayArray: (state, action) => {
        const newarr=[...state.displayArray]
        newarr.sort(GetTimeSort());
        state.displayArray=[...newarr]
      },
  },
})

export const { replacedisplayArray,joindisplayArray,timeSorteddisplayArray } = displayArraySlice.actions

export default displayArraySlice.reducer