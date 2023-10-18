import React, { useEffect, useState, useRef } from "react";
import X from "../data.json";
import { Link } from "react-router-dom";
import { GetPriceSort, GetTimeSort } from "./Utils/UtilityFunctions";
import Filters from "./Filters/Filters";
import AllOffering from "./Offerings/AllOffering";
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
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From === item.Departure && arrival === item.Arrival) {
        setMid((prev) => [...prev, item]);
      }
      if (From === item.Arrival && arrival === item.Departure) {
        setMidDup((prev) => [...prev, item]);
      }
    });

    let uniqueBrands = [];
    alldata.ReferenceList[3].Brand.forEach((item) => {
      if (
        item.name &&
        !uniqueBrands.some(
          (brand) => brand.id === item.id && brand.name === item.name
        )
      ) {
        uniqueBrands.push({ name: item.name, id: item.id });
      }
    });
    setAllBrands(uniqueBrands);

    let uniqueFlights = [];
    alldata.ReferenceList[0].Flight.forEach((item) => {
      if (item.carrier && !uniqueFlights.includes(item.carrier)) {
        uniqueFlights.push(item.carrier);
      }
    });
    setAllFlights(uniqueFlights);
  }, []);

  useEffect(() => {
    mid.map((item) => {
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
        setFinalArray((prev) => {
          return [...prev, ...alp];
        });
        setDisplayArray((prev) => {
          return [...prev, ...alp];
        });
      });
    });
  }, [mid]);

  useEffect(() => {
    midDup.map((item) => {
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
        setFinalArrayDup((prev) => {
          return [...prev, ...alp];
        });
      });
    });
  }, [midDup]);

  useEffect(() => {
    let filteredArr = [];
    displayArray.map((item) => {
      if (brand.length !== 0) {
        if (brand.includes(item.ProductBrandOffering[0].Brand?.BrandRef)) {
          if (flightNo.length > 0) {
            let x = item.flightRefs.length;
            if (x >= 3) {
              x = 3;
            }
            if (flightNo.includes(x)) {
              filteredArr.push(item);
            }
          } else {
            filteredArr.push(item);
          }
        }
      } else if (brand.length === 0) {
        if (flightNo.length !== 0) {
          let x = item.flightRefs.length;
          if (x >= 3) {
            x = 3;
          }
          if (flightNo.includes(x)) {
            filteredArr.push(item);
          }
        } else {
          filteredArr = [...displayArray];
        }
      }
    });
    if (flight.length) {
      let newarr = [];
      filteredArr.filter((item) => {
        for (let i = 0; i < item.flightRefs.length; i++) {
          let carrier;
          for (let j = 0; j < alldata.ReferenceList[0].Flight.length; j++) {
            if (item.flightRefs[i] == alldata.ReferenceList[0].Flight[j].id) {
              carrier = alldata.ReferenceList[0].Flight[j].carrier;
            }
          }
          if (flight.includes(carrier)) {
            if (!newarr.includes(item)) {
              newarr.push(item);
            }
          }
        }
      });
      filteredArr = [...newarr];
    }
    if (myRef.current.value != "" && myRef2.current.value != "") {
      let newarr = [];
      filteredArr.map((item) => {
        let alpha = item.ProductBrandOffering.filter(
          (y) =>
            y.BestCombinablePrice.TotalPrice >= myRef.current.value &&
            y.BestCombinablePrice.TotalPrice <= myRef2.current.value
        );
        let beta = JSON.stringify(item);
        beta = JSON.parse(beta);
        beta.ProductBrandOffering = alpha;
        if (alpha.length !== 0) {
          newarr.push(beta);
        }
      });
      filteredArr = [...newarr];
    }
    window.tog = toggle;

    setFinalArray(filteredArr);
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
      <Filters
        sortTimeAsc={sortTimeAsc}
        clearfn={clearfn}
        allBrands={allBrands}
        brand={brand}
        setBrand={setBrand}
        allFlights={allFlights}
        flight={flight}
        setFlight={setFlight}
        flightNo={flightNo}
        setFlightNo={setFlightNo}
        myRef={myRef}
        myRef2={myRef2}
        sortByPrice={sortByPrice}
      />

      {/* All Offerings Display */}
      <AllOffering
        finalarray={finalarray}
        showDetails={showDetails}
        openAccordian={openAccordian}
        From={From}
        arrival={arrival}
        alldata={alldata}
        finalArrayDup={finalArrayDup}
        sortTimeAsc={sortTimeAsc}
      />

      {/* Multi City Search */}
      <button
        className="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
        style={{
          background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)",
        }}
      >
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;
