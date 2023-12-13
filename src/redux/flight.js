import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  flightArray: [],
}

export const flightSlice = createSlice({
  name: 'flight',
  initialState,
  reducers: {
    addflight: (state, action) => {
      state.flightArray=[...state.flightArray,action.payload]
    },
    removeflight: (state, action) => {
        let b = state.flightArray.filter(
            (flight) => flight !== action.payload
        );
      state.flightArray=b
    },
    clearflights:(state)=>{
        state.flightArray=[]
    },
  },
})

export const { addflight,removeflight,clearflights } = flightSlice.actions

export default flightSlice.reducer