import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    priceFilter: { minPrice: "", maxPrice: "" , absoluteMaxPrice:""},
}

export const priceFilterSlice = createSlice({
    name: 'priceFilter',
    initialState,
    reducers: {
        updateMinPrice: (state, action) => {
            const maxSetPrice = state.priceFilter.maxPrice;
            state.priceFilter = {minPrice:+action.payload,maxPrice:maxSetPrice}
        },
        updateMaxPrice: (state, action) => {
            const minSetPrice = state.priceFilter.minPrice;
            state.priceFilter = {maxPrice:+action.payload,minPrice:minSetPrice}
        },
        updateAbsoluteMaxPrice:(state,action)=>{
            state.priceFilter.absoluteMaxPrice = +action.payload
        }
    },
})

export const { updateMaxPrice, updateMinPrice,updateAbsoluteMaxPrice } = priceFilterSlice.actions

export default priceFilterSlice.reducer