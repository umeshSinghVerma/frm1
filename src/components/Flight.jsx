import React, { useEffect, useState, useRef } from "react";
import X from "../data.json";
import { Link } from "react-router-dom";
import { DestinationFlight, GetPriceSort, GetTimeSort, OfferingConnector, ReturnFlight } from "./Utils/UtilityFunctions";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
import FinalOfferingsUpdater from "./Utils/FinalOfferingsUpdater";
const Flight = () => {
  const From =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Departure;
  const arrival =
    X.CatalogProductOfferingsResponse.CatalogProductOfferings
      .CatalogProductOffering[0].Arrival;
  const alldata = X.CatalogProductOfferingsResponse;
  const [mid, setMid] = useState([]);
  const [midDup, setMidDup] = useState([]);
  const [temp, setTemp] = useState([]);
  const [finalarray, setFinalArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [finalArrayDup, setFinalArrayDup] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allFlights, setAllFlights] = useState([]);
  const [brand, setBrand] = useState([]);
  const [flight, setFlight] = useState([]);
  const [flightNo, setFlightNo] = useState([]);
  const [toggle, setToggle] = useState(false);

  let myRef = useRef(0);
  let myRef2 = useRef(0);

  useEffect(() => {
    OfferingConnector(alldata, From, arrival, setMid, setMidDup, setAllBrands, setAllFlights);
  }, []);

  useEffect(() => {
    DestinationFlight(mid, alldata, setFinalArray, setDisplayArray);
  }, [mid]);

  useEffect(() => {
    ReturnFlight(midDup, alldata, setFinalArrayDup);
  }, [midDup]);

  useEffect(() => {
    FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, myRef, myRef2, setFinalArray, flight)
  }, [brand, flightNo, flight, toggle]);

  function sortPriceAsc() {
    setTemp(finalarray.sort(GetPriceSort()));
  }

  function clearfn() {
    setFinalArray(displayArray);
    setBrand([]);
    setFlightNo([]);
    setFlight([]);
    myRef.current.value = "";
    myRef2.current.value = "";
  }

  function sortTimeAsc() {
    setTemp(finalarray.sort(GetTimeSort()));
  }

  function sortByPrice(startPrice, endPrice) {
    setToggle(!toggle);
  }

  const [flag, setflag] = useState(0);

  useEffect(() => {
    if (finalarray.length !== 0) {
      sortPriceAsc();
      setflag(1);
    }
  }, [finalarray]);

  useEffect(() => {
    if (flag === 1) {
      setDisplayArray(finalarray);
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

  return (
    <div className="flex gap-32 mx-40">
      {/* Sidebar filters */}
      <Filters sortTimeAsc={sortTimeAsc} clearfn={clearfn} allBrands={allBrands} brand={brand} setBrand={setBrand} allFlights={allFlights} flight={flight} setFlight={setFlight} flightNo={flightNo} setFlightNo={setFlightNo} myRef={myRef} myRef2={myRef2} sortByPrice={sortByPrice} />

      {/* All Offerings Display */}
      <AllOffering finalarray={finalarray} showDetails={showDetails} openAccordian={openAccordian} From={From} arrival={arrival} alldata={alldata} finalArrayDup={finalArrayDup} sortTimeAsc={sortTimeAsc} />

      {/* Multi City Search */}
      <button className ="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)" }} >
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;