import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightNoArray: [],
}

export const flightNoSlice = createSlice({
  name: 'flightNo',
  initialState,
  reducers: {
    addflightNo: (state, action) => {
      state.flightNoArray=[...state.flightNoArray,action.payload]
    },
    removeflightNo: (state, action) => {
        let b = state.flightNoArray.filter(
            (flightNo) => flightNo !== action.payload
        );
      state.flightNoArray=b
    },
    clearflightNos:(state)=>{
        state.flightNoArray=[]
    },
  },
})

export const { addflightNo,removeflightNo,clearflightNos } = flightNoSlice.actions

export default flightNoSlice.reducer