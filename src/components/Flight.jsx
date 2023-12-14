import React, { useEffect, useState } from "react";
import X from "../data1.json";
import { Link } from "react-router-dom";
import { DestinationFlight, GetPriceSort, OfferingConnector, ReturnFlight } from "./Utils/UtilityFunctions";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
import FinalOfferingsUpdater from "./Utils/FinalOfferingsUpdater";
import { useDispatch, useSelector } from "react-redux";
import { updateAbsoluteMaxPrice, updateMinPrice } from "../redux/priceFilter";

const Flight = () => {
  const departureFrom =X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Departure;
  const arrivalTo =X.CatalogProductOfferingsResponse.CatalogProductOfferings.CatalogProductOffering[0].Arrival;
  const alldata = X.CatalogProductOfferingsResponse;

  const dispatch = useDispatch();
  const destinationFlights = useSelector((state) => state.destinationFlights.destinationFlightsArray)
  const returnFlights = useSelector((state) => state.returnFlightArray.returnFlightsArray)
  const finalarray = useSelector((state) => state.finalArray.finalArray)
  const displayArray = useSelector((state) => state.displayArray.displayArray)
  const brand = useSelector((state) => state.brand.brandArray)
  const flight = useSelector((state) => state.flight.flightArray)
  const flightNo = useSelector((state) => state.flightNo.flightNoArray)
  const { minPrice, maxPrice } = useSelector((state) => state.priceFilter.priceFilter);

  useEffect(() => {
    if (finalarray.length !== 0) {
      dispatch(updateMinPrice(finalarray[0]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice))
    }
  }, [finalarray])

  useEffect(() => {
    if (displayArray.length !== 0) {
      const newArr = JSON.parse(JSON.stringify(displayArray));
      newArr.sort(GetPriceSort());
      const constMaxt = newArr[newArr.length - 1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
      if(constMaxt!=null && constMaxt!=undefined){
        dispatch(updateAbsoluteMaxPrice(constMaxt));
      }
    }
  }, [displayArray])

  useEffect(() => {
    OfferingConnector(alldata, departureFrom, arrivalTo, dispatch);
  }, []);

  useEffect(() => {
    DestinationFlight(destinationFlights, alldata, dispatch);
  }, [destinationFlights]);

  useEffect(() => {
    ReturnFlight(returnFlights, alldata, dispatch);
  }, [returnFlights]);

  useEffect(() => {
    FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, dispatch, flight, minPrice, maxPrice)
  }, [brand, flightNo, flight, minPrice, maxPrice]);




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
