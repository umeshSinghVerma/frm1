import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    priceFilter: { minPrice: "", maxPrice: "" , absoluteMaxPrice:""},
}

export const priceFilterSlice = createSlice({
    name: 'priceFilter',
    initialState,
    reducers: {
        updateMinPrice: (state, action) => {
            state.priceFilter.minPrice = +action.payload
        },
        updateMaxPrice: (state, action) => {
            state.priceFilter.maxPrice = +action.payload
        },
        updateAbsoluteMaxPrice:(state,action)=>{
            state.priceFilter.absoluteMaxPrice = +action.payload
        }
    },
})

export const { updateMaxPrice, updateMinPrice,updateAbsoluteMaxPrice } = priceFilterSlice.actions

export default priceFilterSlice.reducer