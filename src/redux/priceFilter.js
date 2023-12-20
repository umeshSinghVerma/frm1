import { createSlice } from '@reduxjs/toolkit'
import X from "../data1.json";
import { GetPriceSort } from '../components/Utils/UtilityFunctions';
const departureFrom = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
const arrivalTo = X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
const alldata = X.CatalogProductOfferingsResponse;

const actualDestinations = [];
let initialDisplayArray=[];
alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
  if (departureFrom == item.Departure && arrivalTo == item.Arrival) {
    actualDestinations.push(item);
  }
});
const tempDestinationFlights = JSON.parse(JSON.stringify(actualDestinations));
tempDestinationFlights.map((item) => {
  let ffr;
  let lfr;
  item.ProductBrandOptions.map((f, k) => {
    ffr = alldata.ReferenceList[0].Flight.filter((it) => {
      return it.id === f.flightRefs[0];
    });
    lfr = alldata.ReferenceList[0].Flight.filter((it) => {
      return it.id === f.flightRefs[f.flightRefs.length - 1];
    });
    f.DepartureTime = ffr[0].Departure.date;
    f.ArrivalTime = lfr[0].Arrival.date;
    let alp = f.ProductBrandOffering.map((it) => {
      let g = JSON.stringify(f);
      g = JSON.parse(g);
      g.ProductBrandOffering = [];
      g.ProductBrandOffering.push(it);
      return g;
    });
    initialDisplayArray=[...initialDisplayArray,...alp];
  });
});
let constMaxt="";
let constMin = "";
if (initialDisplayArray.length !== 0) {
    const newArr = JSON.parse(JSON.stringify(initialDisplayArray));
    newArr.sort(GetPriceSort());
    constMaxt = newArr[newArr.length - 1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
    constMin = newArr[0]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
  }
const initialState = {
    priceFilter: { minPrice: constMin, maxPrice: "" , absoluteMaxPrice:constMaxt},
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