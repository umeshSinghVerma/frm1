import React from "react";
import BrandFilter from "./BrandFilter";
import AirlineFilter from "./AirlineFilter";
import StopsFilter from "./StopsFilter";
import PriceFilter from "./PriceFilter";
import { useDispatch, useSelector } from "react-redux";
import { timeSortedfinalArray } from "../../redux/finalArray";
import { clearfn } from "../Utils/UtilityFunctions";

const Filters = () => {
  const dispatch = useDispatch();
  const allBrands = useSelector((state) => state.allBrandsArray.allBrandsArray)
  const allFlights = useSelector((state) => state.allFlightsArray.allFlightsArray)
  const displayArray = useSelector((state) => state.displayArray.displayArray)
  const {absoluteMaxPrice}=useSelector((state)=>state.priceFilter.priceFilter);
  
  function sortTimeAsc() {
    dispatch(timeSortedfinalArray())
  }

  return (
    <div className="flex flex-col-reverse xl:flex-col gap-3 xl:sticky py-3 top-0 xl:h-screen overflow-y-scroll removeScollbar bg-white px-5 shadow-lg">
      <div className="flex flex-col gap-3">
        <button
          onClick={() => sortTimeAsc()}
          className="text-white py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
          style={{
            background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)",
          }}
        >
          Sort By Departure date
        </button>
        <button
          onClick={() => clearfn(dispatch,displayArray,absoluteMaxPrice)}
          className="border border-[#e55e0d] py-2 px-5 text-lg active:scale-95 transition-all hover:opacity-95 font-semibold rounded"
        >
          Clear All Filter
        </button>
      </div>
      <div>
        <h1 className="my-4 text-3xl ">Filters ~</h1>
        <div className="flex flex-wrap md:justify-around xl:flex-col gap-y-8 gap-x-12 md:gap-10 mx-4 md:mx-0">
          <BrandFilter allBrands={allBrands} />
          <AirlineFilter allFlights={allFlights}/>
          <StopsFilter />
          <PriceFilter  />
        </div>
      </div>
    </div>
  );
};

export default Filters;
