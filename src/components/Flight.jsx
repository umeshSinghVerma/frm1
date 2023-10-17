import React, { useEffect, useState, useRef } from "react";
import X from "../data.json";
import Display from "./Display";
import FlightDetails from "./FlightDetails";


import { Link } from "react-router-dom";
const Flight = () => {
  const From = ["LOS"];
  const arrival = ["MEL"];
  const startDate = "2023-10-28";
  const endDate = "2023-10-31";
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
  const stops = [1, 2, 3];
  let myRef = useRef(0);
  let myRef2 = useRef(0);

  console.log(X)

  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From.includes(item.Departure) && arrival.includes(item.Arrival)) {
        setMid((prev) => [...prev, item]);
      }
      if (From.includes(item.Arrival) && arrival.includes(item.Departure)) {
        setMidDup((prev) => [...prev, item]);
      }
    });

    let uniqueBrands = [];
    alldata.ReferenceList[3].Brand.forEach((item) => {
      if (item.name && !uniqueBrands.some(brand => brand.id === item.id && brand.name === item.name)) {
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
        if (
          ffr[0].Departure.date >= startDate &&
          lfr[0].Arrival.date <= endDate
        ) {
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
        }
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
        if (ffr[0].Departure.date >= endDate) {
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
        }
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
    if(flight.length){
      let newarr=[]
      filteredArr.filter(item=>{
        for(let i=0;i<item.flightRefs.length;i++){
          let carrier;
          for(let j=0;j<alldata.ReferenceList[0].Flight.length;j++){
            if(item.flightRefs[i]==alldata.ReferenceList[0].Flight[j].id){
              carrier=alldata.ReferenceList[0].Flight[j].carrier;
            }
          }
          if(flight.includes(carrier)){
            if(!newarr.includes(item)){
              newarr.push(item);
            }
          }
        }
      });
      filteredArr=[...newarr];
    }

    setFinalArray(filteredArr);
  }, [brand, flightNo,flight]);

  function GetPriceSort() {
    return function (a, b) {
      let firstmini = a.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;
      let secondmini = b.ProductBrandOffering[0].BestCombinablePrice.TotalPrice;

      if (firstmini > secondmini) {
        return 1;
      } else if (firstmini < secondmini) {
        return -1;
      }
      return 0;
    };
  }
  function GetCompatibilitySort() {
    return function (a, b) {
      let firstmini = a.ProductBrandOffering[0].CombinabilityCode[0];
      let secondmini = b.ProductBrandOffering[0].CombinabilityCode[0];

      if (firstmini > secondmini) {
        return 1;
      } else if (firstmini < secondmini) {
        return -1;
      } else {
        let first = a.ProductBrandOffering[0].Product.map((aa) => {
          return alldata.ReferenceList[1].Product.map((y) => {
            if (y.id === aa?.productRef) {
              return y.totalDuration;
            }
          });
        })
        let second = b.ProductBrandOffering[0].Product.map((aa) => {
          return alldata.ReferenceList[1].Product.map((y) => {
            if (y.id === aa?.productRef) {
              return y.totalDuration;
            }
          });
        })
        if (first < second) {
          return 1;
        } else {
          return -1;
        }
      }
    };
  }

  function sortPriceAsc() {
    setTemp(finalarray.sort(GetPriceSort()));
  }
  function sortCompatibilityAsc() {
    setTemp(finalarray.sort(GetCompatibilitySort()));
  }
  function sortCompatibilityAscDup() {
    setTemp(finalArrayDup.sort(GetCompatibilitySort()));
  }

  function clearfn() {
    setFinalArray(displayArray);
    setBrand([]);
    setFlightNo([]);
    myRef.current.value = "";
    myRef2.current.value = "";
  }

  function GetTimeSort() {
    return function (a, b) {
      if (a.DepartureTime > b.DepartureTime) {
        return 1;
      } else if (a.DepartureTime < b.DepartureTime) {
        return -1;
      }
      return 0;
    };
  }
  function sortTimeAsc() {
    setTemp(finalarray.sort(GetTimeSort()));
  }

  function getCompatibilityArrayFinal() {
    let filteredArr = [];
    let len = finalarray.length;
    if (len) {
      filteredArr.push(finalarray[0]);
      let firstCompatibility = finalarray[0].ProductBrandOffering[0].CombinabilityCode[0];
      for (let i = 1; i < finalarray.length; i++) {
        if (firstCompatibility !== finalarray[i].ProductBrandOffering[0].CombinabilityCode[0]) {
          firstCompatibility = finalarray[i].ProductBrandOffering[0].CombinabilityCode[0];
          filteredArr.push(finalarray[i]);
        }
      }
    }
    setFinalArray(filteredArr);
  }
  function getCompatibilityArrayDup() {
    let filteredArr = [];
    let len = finalArrayDup.length;
    if (len) {
      filteredArr.push(finalArrayDup[0]);
      let firstCompatibility = finalArrayDup[0].ProductBrandOffering[0].CombinabilityCode[0];
      for (let i = 1; i < finalArrayDup.length; i++) {
        if (firstCompatibility !== finalArrayDup[i].ProductBrandOffering[0].CombinabilityCode[0]) {
          firstCompatibility = finalArrayDup[i].ProductBrandOffering[0].CombinabilityCode[0];
          filteredArr.push(finalArrayDup[i]);
        }
      }
    }
    setFinalArrayDup(filteredArr);
  }

  function sortByPrice(startPrice, endPrice) {
    let filteredArr = [];
    finalarray.map((item) => {
      let alpha = item.ProductBrandOffering.filter(
        (y) =>
          y.BestCombinablePrice.TotalPrice >= startPrice && y.BestCombinablePrice.TotalPrice <= endPrice
      );
      let beta = JSON.stringify(item);
      beta = JSON.parse(beta);
      beta.ProductBrandOffering = alpha;
      if (alpha.length !== 0) {
        filteredArr.push(beta);
      }
    });
    setFinalArray(filteredArr);
  }

  const [flag,setflag]=useState(0);
  // useEffect(()=>{
  //   if(finalarray.length!==0){
      // sortCompatibilityAsc();
      // sortCompatibilityAscDup();
      // getCompatibilityArrayFinal();
      // getCompatibilityArrayDup();
    // }
  // },[displayArray])

  useEffect(()=>{
    if(finalarray.length!==0){
      sortPriceAsc();
      setflag(1);
    }
  },[finalarray])

  useEffect(()=>{
    if(flag===1){
      setDisplayArray(finalarray);
    }
  },[flag])

  const [showDetails, setShowDetails] = useState()

  function openAccordian(id){
    if(showDetails===id){
      setShowDetails()
    }
    else{
      setShowDetails(id)

    }
  }
  return (
    <div className="flex gap-32 mx-40">
      {/* Sidebar filters */}
      <div className="flex flex-col gap-3 sticky py-3 top-0 h-screen overflow-y-scroll removeScollbar bg-white px-5 shadow-lg">
        <div className="flex flex-col gap-3">
          <button onClick={() => sortTimeAsc()} className="text-white py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}}>
            Sort By Departure date
          </button>
          <button onClick={() => clearfn() } className="border border-[#e55e0d] py-2 px-5 text-lg active:scale-95 transition-all hover:opacity-95 font-semibold rounded"
          >
            Clear All Filter
          </button>
        </div>
        <h1 className="mt-10 text-3xl ">Filters ~</h1>
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Brand Name :</h3>
            <div className="flex flex-col gap-2">
              {allBrands.map((item, key) => {
                return (
                  <div key={key} className="flex gap-3">
                    {brand.includes(item.id) === true ? (
                      <input
                        type="checkbox"
                        value={item.id}
                        checked={true}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBrand((prev) => {
                              return [...prev, e.target.value];
                            });
                          } else {
                            let b = brand.filter(
                              (alpha) => alpha !== e.target.value
                            );
                            setBrand(b);
                          }
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={item.id}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setBrand((prev) => {
                              return [...prev, e.target.value];
                            });
                          } else {
                            let b = brand.filter(
                              (alpha) => alpha !== e.target.value
                            );
                            setBrand(b);
                          }
                        }}
                      />
                    )}
                    <label htmlFor={item.name + "dept"}>{item.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Flights Name :</h3>
            <div className="flex flex-col gap-2">
              {allFlights.map((item, key) => {
                return (
                  <div key={key} className="flex gap-3">
                    {flight.includes(item) === true ? (
                      <input
                        type="checkbox"
                        value={item}
                        id={item + "flight"}
                        checked={true}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlight((prev) => {
                              return [...prev, e.target.value];
                            });
                          } else {
                            let b = flight.filter(
                              (alpha) => alpha !== e.target.value
                            );
                            setFlight(b);
                          }
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={item}
                        id={item + "flight"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlight((prev) => {
                              return [...prev, e.target.value];
                            });
                          } else {
                            let b = flight.filter(
                              (alpha) => alpha !== e.target.value
                            );
                            setFlight(b);
                          }
                        }}
                      />
                    )}
                    <label htmlFor={item + "flight"}>{item}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl">No. of Stops :</h3>
            <div className="flex flex-col gap-1">
              {stops.map((item, key) => {
                return (
                  <div key={key} className="flex gap-3">
                    {flightNo.includes(item) === true ? (
                      <input
                        type="checkbox"
                        id={item + "stop"}
                        value={item}
                        checked={true}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlightNo((prev) => {
                              return [...prev, +e.target.value];
                            });
                          } else {
                            let b = flightNo.filter(
                              (alpha) => alpha !== +e.target.value
                            );
                            setFlightNo(b);
                          }
                        }}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        value={item}
                        id={item + "stop"}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFlightNo((prev) => {
                              return [...prev, +e.target.value];
                            });
                          } else {
                            let b = flightNo.filter(
                              (alpha) => alpha !== +e.target.value
                            );
                            setFlightNo(b);
                          }
                        }}
                      />
                    )}
                    {item >= 3 ? (
                      <label htmlFor={item + "stop"}>2+</label>
                    ) : (
                      <label htmlFor={item + "stop"}>{item}</label>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl">Price :</h3>
            <div className="flex flex-col gap-3">
              <input className="border border-[#e55e0d]" type="number" id="startPrice" ref={myRef} />
              <p>to</p>
              <input className="border border-[#e55e0d]" type="number" id="endPrice" ref={myRef2} />
              <button
                className="block text-white py-1 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
                style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}}
                onClick={() => {
                  let x = +myRef.current.value;
                  let y = +myRef2.current.value;
                  sortByPrice(x, y);
                }}
              >
                Find
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flight Display */}
      <div className="flex flex-col gap-4 my-10">
        {finalarray.map((item, id) => {
          return (
            <main key={id} >
              <section className="shadow-md  bg-white border border-white rounded-xl hover:border-slate-500 transition-all cursor-pointer">
                {/* Closed Accordian */}
                <div className={`flex ${showDetails===id ? "border-b border-slate-400" : ""}`}>
                  <div className="flex flex-col p-5" onClick={()=>openAccordian(id)}>
                    <div className="flex gap-2">
                      <input type="checkbox" />
                      <Display returnBack={false} from={From[0]} arrival={arrival[0]} item={item} alldata={alldata} />
                    </div>

                    <div className="flex gap-2">
                      <input type="checkbox" />
                      <div>
                        {finalArrayDup.map((dup) => {
                          if (
                            dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                            item.ProductBrandOffering[0].CombinabilityCode[0]
                          ) {
                            return <Display returnBack={true} from={From[0]} arrival={arrival[0]} item={dup} alldata={alldata} />;
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="bg-slate-300 w-[1px] "></div>
                  <div className="p-5">
                    Total Price :-{" "}
                    <p className="font-bold text-3xl">$ {item.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}</p>
                    <button onClick={() => sortTimeAsc()} className="text-white w-full mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}}>
                      Select
                    </button>
                  </div>
                </div>

                {/* Details Inside Accordian */}
                {finalArrayDup.map((dup) => {
                  if (
                    dup.ProductBrandOffering[0].CombinabilityCode[0] ===
                    item.ProductBrandOffering[0].CombinabilityCode[0]
                  ) {
                    return showDetails===id && <FlightDetails item={item} dup={dup} alldata={alldata}/>
                  }
                })}
              </section>
            </main>
          );
        })}
      </div>
      <button className="fixed bottom-2 right-2 text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}}>
        <Link to="/Multi">Multi-City Search</Link>
      </button>
    </div>
  );
};

export default Flight;
