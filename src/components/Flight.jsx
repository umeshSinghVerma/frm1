import React, { useEffect, useState } from "react";
import X from "../data1.json";
import { Link } from "react-router-dom";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
import FinalOfferingsUpdater from "./Utils/FinalOfferingsUpdater";
import { useDispatch, useSelector } from "react-redux";

const Flight = () => {
  const dispatch = useDispatch();
  
  const alldata = X.CatalogProductOfferingsResponse;
  const displayArray = useSelector((state) => state.displayArray.displayArray)
  const brand = useSelector((state) => state.brand.brandArray)
  const flight = useSelector((state) => state.flight.flightArray)
  const flightNo = useSelector((state) => state.flightNo.flightNoArray)
  const { minPrice, maxPrice } = useSelector((state) => state.priceFilter.priceFilter);


  useEffect(() => {
    FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, dispatch, flight, minPrice, maxPrice)
  }, [brand, flightNo, flight, maxPrice]);




  //* To handle Accordian closing and opening
  const [showDetails, setShowDetails] = useState();
  function openAccordian(id) {
    if (showDetails === id) {
      setShowDetails();
    } else {
      setShowDetails(id);
    }
  }

  return (
    <div className="xl:flex gap-32 justify-center">
      {/* Sidebar filters */}
      <Filters />

      {/* All Offerings Accordians Display */}
      <AllOffering showDetails={showDetails} openAccordian={openAccordian} />

      {/* Multi City Search */}
      <button className="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)" }} >
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;
