import React, { useEffect, useState, useRef } from "react";
import X from "../data1.json";
import { Link } from "react-router-dom";
import { DestinationFlight, GetPriceSort, GetTimeSort, OfferingConnector, ReturnFlight } from "./Utils/UtilityFunctions";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
import FinalOfferingsUpdater from "./Utils/FinalOfferingsUpdater";
import { useDispatch, useSelector } from "react-redux";
import {clearBrands} from '../redux/brand'
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


  const [finalarray, setFinalArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [finalArrayDup, setFinalArrayDup] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allFlights, setAllFlights] = useState([]);


  // const [brand, setBrand] = useState([]);
  const brand = useSelector((state) => state.brand.brandArray)



  const [flight, setFlight] = useState([]);
  const [flightNo, setFlightNo] = useState([]);
  const [toggle, setToggle] = useState(false);

  // References for filter MiPrice and MaxPrice
  let minPrice = useRef(0);
  let maxPrice = useRef(0);

  const [minP, setMinP] = useState()
  const [maxP, setMaxP] = useState()

  useEffect(() => {
    OfferingConnector(alldata, departureFrom, arrivalTo, setDestinationFlights, setReturnFlights, setAllBrands, setAllFlights);
  }, []);

  useEffect(() => {
    DestinationFlight(destinationFlights, alldata, setFinalArray, setDisplayArray);
  }, [destinationFlights]);

  useEffect(() => {
    ReturnFlight(returnFlights, alldata, setFinalArrayDup);
  }, [returnFlights]);

  useEffect(() => {
    FinalOfferingsUpdater(displayArray, brand, flightNo, alldata, minP, maxP, setFinalArray, flight)
  }, [brand, flightNo, flight, toggle]);

  function sortPriceAsc() {
    finalarray.sort(GetPriceSort());
  }

  function clearfn() {
    setFinalArray(displayArray);
    // setBrand([]);
    dispatch(clearBrands())
    setFlightNo([]);
    setFlight([]);
    // minPrice.current.value = "";
    // maxPrice.current.value = "";
  }

  function sortByPrice() {
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

  if (constMax === undefined) {
    const temp = finalarray
    constMax = temp[temp.length - 1]?.ProductBrandOffering[0].BestCombinablePrice.TotalPrice
    console.log(constMax)
  }

  return (
    <div className="xl:flex gap-32 justify-center">
      {/* Sidebar filters */}
      <Filters finalarray={finalarray} clearfn={clearfn} allBrands={allBrands} allFlights={allFlights} flight={flight} setFlight={setFlight} flightNo={flightNo} setFlightNo={setFlightNo} minPrice={minP} setMinP={setMinP} maxPrice={maxP} setMaxP={setMaxP} sortByPrice={sortByPrice} constMax={constMax} />

      {/* All Offerings Accordians Display */}
      <AllOffering finalarray={finalarray} showDetails={showDetails} openAccordian={openAccordian} departureFrom={departureFrom} arrivalTo={arrivalTo} alldata={alldata} finalArrayDup={finalArrayDup} />

      {/* Multi City Search */}
      <button className="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)" }} >
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;
