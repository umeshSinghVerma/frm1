import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  brandArray: [],
}

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    addBrand: (state, action) => {
      state.brandArray=[...state.brandArray,action.payload]
    },
    removeBrand: (state, action) => {
        let b = state.brandArray.filter(
            (brand) => brand !== action.payload
        );
      state.brandArray=b
    },
    clearBrands:(state)=>{
        state.brandArray=[]
    },
  },
})

export const { addBrand,removeBrand,clearBrands } = brandSlice.actions

export default brandSlice.reducer