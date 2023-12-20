import { createSlice } from '@reduxjs/toolkit'
import X from "../data1.json";

const alldata = X.CatalogProductOfferingsResponse;

let uniqueBrands = [];
alldata.ReferenceList[3].Brand.forEach((item) => {
  if (
    item.name &&
    !uniqueBrands.some(
      (brand) => brand.id === item.id && brand.name === item.name
    )
  ) {
    uniqueBrands.push({ name: item.name, id: item.id });
  }
});

const initialState = {
  allBrandsArray: [...uniqueBrands],
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