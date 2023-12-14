import { createSlice } from '@reduxjs/toolkit'
import { GetPriceSort, GetTimeSort } from '../components/Utils/UtilityFunctions';

const initialState = {
  finalArrayDup: [],
}

export const finalArrayDupSlice = createSlice({
  name: 'finalArrayDup',
  initialState,
  reducers: {
    replacefinalArrayDup: (state, action) => {
      const newarr=[...action.payload]
    //   newarr.sort(GetPriceSort());  // uncomment this if want to sort by price
      state.finalArrayDup=[...newarr]
    },
    joinfinalArrayDup: (state, action) => {
      const newarr=[...state.finalArrayDup,...action.payload];
    //   newarr.sort(GetPriceSort()); // uncomment this if want to sort by price
      state.finalArrayDup=[...newarr];
    },
    timeSortedfinalArrayDup: (state, action) => {
        const newarr=[...state.finalArrayDup]
        newarr.sort(GetTimeSort());
        state.finalArrayDup=[...newarr]
      },
  },
})

export const { replacefinalArrayDup,joinfinalArrayDup,timeSortedfinalArrayDup } = finalArrayDupSlice.actions

export default finalArrayDupSlice.reducer