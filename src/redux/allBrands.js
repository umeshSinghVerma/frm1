import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allBrandsArray: [],
}

export const allBrandsArraySlice = createSlice({
  name: 'allBrandsArray',
  initialState,
  reducers: {
    replaceallBrandsArray: (state, action) => {
      const newarr=[...action.payload]
      state.allBrandsArray=[...newarr]
    }
  },
})

export const { replaceallBrandsArray } = allBrandsArraySlice.actions

export default allBrandsArraySlice.reducer