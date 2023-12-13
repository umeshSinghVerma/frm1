import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';

const initialState = {
  finalArray: [],
}

export const finalArraySlice = createSlice({
  name: 'finalArray',
  initialState,
  reducers: {
    replacefinalArray: (state, action) => {
      const newarr=[...action.payload]
      newarr.sort(GetPriceSort());
      state.finalArray=[...newarr]
    },
    joinfinalArray: (state, action) => {
      const newarr=[...state.finalArray,...action.payload];
      newarr.sort(GetPriceSort());
      state.finalArray=[...newarr];
    },
    timeSortedfinalArray: (state, action) => {
        const newarr=[...state.finalArray]
        newarr.sort(GetTimeSort());
        state.finalArray=[...newarr]
      },
  },
})

export const { replacefinalArray,joinfinalArray,timeSortedfinalArray } = finalArraySlice.actions

export default finalArraySlice.reducer