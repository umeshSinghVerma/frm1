import React, { useState } from "react";
import BrandFilter from "./BrandFilter";
import AirlineFilter from "./AirlineFilter";
import StopsFilter from "./StopsFilter";
import PriceFilter from "./PriceFilter";
import { GetTimeSort } from "../Utils/UtilityFunctions";

const Filters = ({
  finalarray,
  clearfn,
  allBrands,
  allFlights,
  setMinP,
  setMaxP,
  sortByPrice,
  constMax
}) => {
  function sortTimeAsc() {
    finalarray.sort(GetTimeSort());
  }
  const [priceRange, setPriceRange] = useState(finalarray.length!=0 ? finalarray[finalarray.length-1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice : null);
  
  setMinP(finalarray[0]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice)
  setMaxP(priceRange)
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
          onClick={() => clearfn()}
          className="border border-[#e55e0d] py-2 px-5 text-lg active:scale-95 transition-all hover:opacity-95 font-semibold rounded"
        >
          Clear All Filter
        </button>
      </div>
      <div>
        <h1 className="my-4 text-3xl ">Filters ~</h1>
        <div className="flex flex-wrap md:justify-around xl:flex-col gap-y-8 gap-x-12 md:gap-10 mx-4 md:mx-0">
          <BrandFilter allBrands={allBrands} />

          <AirlineFilter
            allFlights={allFlights}
          />

          <StopsFilter />

          <PriceFilter constMax={constMax} min={finalarray[0]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice} max={finalarray[finalarray.length-1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice} priceRange={priceRange} setPriceRange={setPriceRange} sortByPrice={sortByPrice} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
