import React, { useEffect, useState, useRef } from "react";
import X from "../data.json";
import Display from "./Display";
const Flight = () => {
  const From = ["LOS"];
  const arrival = ["MEL"];
  const startDate = "2023-10-28";
  const endDate = "2023-10-30";
  const alldata = X.CatalogProductOfferingsResponse;
  const [mid, setMid] = useState([]);
  const [midDup, setMidDup] = useState([]);
  const [temp, setTemp] = useState([]);
  const [finalarray, setFinalArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [finalArrayDup, setFinalArrayDup] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [brand, setBrand] = useState([]);
  const [flightNo, setFlightNo] = useState([]);
  const stops = [1, 2, 3];
  let myRef = useRef(0);
  let myRef2 = useRef(0);

  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From.includes(item.Departure) && arrival.includes(item.Arrival)) {
        setMid((prev) => [...prev, item]);
      }
      if (From.includes(item.Arrival) && arrival.includes(item.Departure)) {
        setMidDup((prev) => [...prev, item]);
      }
    });
    alldata.ReferenceList[3].Brand.map((item) => {
      setAllBrands((prev) => {
        return [...prev, { name: item.name, id: item.id }];
      });
    });
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
      if (brand.length != 0) {
        if (brand.includes(item.ProductBrandOffering[0].Brand.BrandRef)) {
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
      } else if (brand.length == 0) {
        if (flightNo.length != 0) {
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
    setFinalArray(filteredArr);
  }, [brand, flightNo]);

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
            if (y.id == aa?.productRef) {
              return y.totalDuration;
            }
          });
        })
        let second = b.ProductBrandOffering[0].Product.map((aa) => {
          return alldata.ReferenceList[1].Product.map((y) => {
            if (y.id == aa?.productRef) {
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
        if (firstCompatibility != finalarray[i].ProductBrandOffering[0].CombinabilityCode[0]) {
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
        if (firstCompatibility != finalArrayDup[i].ProductBrandOffering[0].CombinabilityCode[0]) {
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
      if (alpha.length != 0) {
        filteredArr.push(beta);
      }
    });
    setFinalArray(filteredArr);
  }

  const [flag,setflag]=useState(0);
  useEffect(()=>{
    if(finalarray.length!=0){
      sortCompatibilityAsc();
      sortCompatibilityAscDup();
      getCompatibilityArrayFinal();
      getCompatibilityArrayDup();
    }
  },[displayArray])

  useEffect(()=>{
    if(finalarray.length!=0){
      sortPriceAsc();
      setflag(1);
    }
  },[finalarray])

  useEffect(()=>{
    if(flag==1){
      setDisplayArray(finalarray);
    }
  },[flag])

  return (
    <div style={{ display: "flex", gap: "10px", margin: "20px" }}>
      {/* Sidebar filters */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "fixed",
          top: "2px",
          height: "90vh",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={() => {
              sortTimeAsc();
            }}
          >
            Sort By Departure date
          </button>
          <button
            onClick={() => {
              clearfn();
            }}
          >
            Clear All Filter
          </button>
        </div>
        <h1>Filters</h1>
        <h3>Brand Name :</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {allBrands.map((item, key) => {
            return (
              <div key={key}>
                {brand.includes(item.id) == true ? (
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
                <label for={item.name + "dept"}>{item.name}</label>
              </div>
            );
          })}
        </div>
        <h3>No. of Stops :</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          {stops.map((item, key) => {
            return (
              <div key={key}>
                {flightNo.includes(item) == true ? (
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
                  <label for={item + "stop"}>2+</label>
                ) : (
                  <label for={item + "stop"}>{item}</label>
                )}
              </div>
            );
          })}
        </div>
        <h3>Price :</h3>
        <div>
          <input type="number" id="startPrice" ref={myRef} />
          <p>to</p>
          <input type="number" id="endPrice" ref={myRef2} />
          <button
            style={{ display: "block" }}
            onClick={() => {
              let x = +myRef.current.value;
              let y = +myRef2.current.value;
              sortByPrice(x, y);
            }}
          >
            find
          </button>
        </div>
      </div>
      {/* Flight Display */}
      <div style={{ left: "400px", position: "absolute" }}>
        {finalarray.map((item) => {
          return (
            <div
              style={{
                border: "2px solid  black",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                margin: "4px",
              }}
            >
              <h2>
                {From[0]} to {arrival[0]}
              </h2>
              <Display item={item} alldata={alldata} />
              <h2>
                {arrival[0]} to {From[0]}
              </h2>
              <div>
                {finalArrayDup.map((dup) => {
                  if (
                    dup.ProductBrandOffering[0].CombinabilityCode[0] ==
                    item.ProductBrandOffering[0].CombinabilityCode[0]
                  ) {
                    return <Display item={dup} alldata={alldata} />;
                  }
                })}
              </div>
              <div>
                Total Price -{" "}
                {item.ProductBrandOffering[0].BestCombinablePrice.TotalPrice}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Flight;
