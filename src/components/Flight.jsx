import React, { useEffect, useState } from "react";
import X from "../data1.json";
import { Link } from "react-router-dom";
import { DestinationFlight, OfferingConnector, ReturnFlight } from "./Utils/UtilityFunctions";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
import FinalOfferingsUpdater from "./Utils/FinalOfferingsUpdater";
import { useDispatch, useSelector } from "react-redux";
import {clearBrands} from '../redux/brand'
import { clearflights } from "../redux/flight";
import { clearflightNos } from "../redux/flightNo";
import { replacefinalArray } from "../redux/finalArray";
import { replacedisplayArray } from "../redux/displayArray";
let constMax;
const Flight = () => {
  const departureFrom =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Departure;
  const arrivalTo =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Arrival;
  const alldata = X.CatalogProductOfferingsResponse;

  const [destinationFlights, setDestinationFlights] = useState([]);
  // const destinationFlights = useSelector((state) => state.destinationFlights.destinationFlightsArray)
  const dispatch = useDispatch();

  const [returnFlights, setReturnFlights] = useState([]);


  const finalarray = useSelector((state) => state.finalArray.finalArray)
  const displayArray = useSelector((state) => state.displayArray.displayArray)


  const brand = useSelector((state) => state.brand.brandArray)
  const flight = useSelector((state) => state.flight.flightArray)
  const flightNo = useSelector((state) => state.flightNo.flightNoArray)


  const [toggle, setToggle] = useState(false);
  const [minP, setMinP] = useState()
  const [maxP, setMaxP] = useState()

  useEffect(() => {
    OfferingConnector(alldata, departureFrom, arrivalTo, setDestinationFlights, setReturnFlights, dispatch);
  }, []);

  useEffect(() => {
    DestinationFlight(destinationFlights, alldata, dispatch);
  }, [destinationFlights]);

  useEffect(() => {
    ReturnFlight(returnFlights, alldata, dispatch);
  }, [returnFlights]);

  useEffect(() => {
    FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, minP, maxP, dispatch, flight)
  }, [brand, flightNo, flight, toggle]);

  function clearfn() {
    dispatch(replacefinalArray(displayArray));
    dispatch(clearBrands())
    dispatch(clearflightNos())
    dispatch(clearflights())
  }

  function sortByPrice() {
    setToggle(!toggle);
  }

  const [flag, setflag] = useState(0);

  useEffect(() => {
    if (finalarray.length !== 0 ) {
      setflag(1);
    }
  }, [finalarray]);

  useEffect(() => {
    if (flag === 1) {
      dispatch(replacedisplayArray(finalarray))
    }
  }, [flag]);

  //* To handle Accordian closing and opening
  const [showDetails, setShowDetails] = useState();
  function openAccordian(id) {
    if (showDetails === id) {
      setShowDetails();
    } else {
      setShowDetails(id);
    }
  }

  if (constMax === undefined) {
    const temp = finalarray
    constMax = temp[temp.length - 1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
    console.log(constMax)
  }

  return (
    <div className="xl:flex gap-32 justify-center">
      {/* Sidebar filters */}
      <Filters clearfn={clearfn} minPrice={minP} setMinP={setMinP} maxPrice={maxP} setMaxP={setMaxP} sortByPrice={sortByPrice} constMax={constMax} />

      {/* All Offerings Accordians Display */}
      <AllOffering showDetails={showDetails} openAccordian={openAccordian} departureFrom={departureFrom} arrivalTo={arrivalTo} alldata={alldata} />

      {/* Multi City Search */}
      <button className="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)" }} >
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;
