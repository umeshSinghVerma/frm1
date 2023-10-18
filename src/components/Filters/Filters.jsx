import React from "react";
import BrandFilter from "./BrandFilter";
import AirlineFilter from "./AirlineFilter";
import StopsFilter from "./StopsFilter";
import PriceFilter from "./PriceFilter";

const Filters = ({
  sortTimeAsc,
  clearfn,
  allBrands,
  brand,
  setBrand,
  allFlights,
  flight,
  setFlight,
  flightNo,
  setFlightNo,
  myRef,
  myRef2,
  sortByPrice,
}) => {
  return (
    <div className="flex flex-col gap-3 sticky py-3 top-0 h-screen overflow-y-scroll removeScollbar bg-white px-5 shadow-lg">
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
      <h1 className="mt-10 text-3xl ">Filters ~</h1>
      <div className="flex flex-col gap-10">
        <BrandFilter allBrands={allBrands} brand={brand} setBrand={setBrand} />

        <AirlineFilter
          allFlights={allFlights}
          flight={flight}
          setFlight={setFlight}
        />

        <StopsFilter flightNo={flightNo} setFlightNo={setFlightNo} />

        <PriceFilter myRef={myRef} myRef2={myRef2} sortByPrice={sortByPrice} />
      </div>
    </div>
  );
};

export default Filters;
