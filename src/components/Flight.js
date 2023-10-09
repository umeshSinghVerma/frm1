import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
const Flight = () => {
  const location = useLocation()
  const {
    From,
    arrival,
    startDate,
    endDate,
    alldata
  } = location.state.obj;
  const [mid, setMid] = useState([]);
  const [temp, setTemp] = useState([]);
  const [finalarray, setFinalArray] = useState([]);
  const [displayArray, setDisplayArray] = useState([]);
  const [allBrands, setAllBrands] = useState([])
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From.includes(item.Departure) && arrival.includes(item.Arrival)) {
        setMid(prev =>
          [...prev, item]
        )
      }
    })
    alldata.ReferenceList[3].Brand.map(item => {
      setAllBrands(prev => {
        return [...prev, { name: item.name, id: item.id }]
      })
    })
  }, [])
  useEffect(() => {
    mid.map(item => {
      let ffr;
      let lfr;
      item.ProductBrandOptions.map((f, k) => {
        ffr = alldata.ReferenceList[0].Flight.filter(it => {
          return it.id === f.flightRefs[0];
        })
        lfr = alldata.ReferenceList[0].Flight.filter(it => {
          return it.id === f.flightRefs[f.flightRefs.length - 1];
        })
        if (ffr[0].Departure.date >= startDate && lfr[0].Arrival.date <= endDate) {
          f.DepartureTime = ffr[0].Departure.date;
          f.ArrivalTime = ffr[0].Arrival.date;
          setFinalArray((prev) => {
            return [...prev, f];
          })
          setDisplayArray((prev) => {
            return [...prev, f];
          })
        }
      })
    })
  }, [mid])
  window.brand = brand;
  useEffect(() => {
    let filteredArr = [];
    displayArray.map(item => {
      for (let j = 0; j < item.ProductBrandOffering.length; j++) {
        let flag = 0;
        for (let i = 0; i < brand.length; i++) {
          if (brand[i] == item.ProductBrandOffering[j].Brand.BrandRef) {
            filteredArr.push(item);
            flag = 1;
            break;
          }
        }
        if (flag == 1) {
          break;
        }
      }
    })
    if (brand.length != 0) {
      setFinalArray(filteredArr);
    } else {
      setFinalArray(displayArray);
    }
  }, [brand])

  function GetPriceSort(prop) {
    return function (a, b) {
      let firstmini = a.ProductBrandOffering[0].Price.TotalPrice;
      let secondmini = b.ProductBrandOffering[0].Price.TotalPrice;
      a.ProductBrandOffering.map(item => {
        if (firstmini > item.Price.TotalPrice) {
          firstmini = item.Price.TotalPrice
        }
      })
      b.ProductBrandOffering.map(item => {
        if (secondmini > item.Price.TotalPrice) {
          secondmini = item.Price.TotalPrice
        }
      })
      if (firstmini > secondmini) {
        return 1;
      } else if (firstmini < secondmini) {
        return -1;
      }
      return 0;
    }
  }
  window.displayArray = displayArray;
  function sortPriceAsc() {
    setTemp(finalarray.sort(GetPriceSort('prop')))
  }
  function clearfn() {
    setFinalArray(displayArray);
    setBrand([]);
    document.getElementById("startPrice").value = "";
    document.getElementById("endPrice").value = "";
  }



  function GetTimeSort(prop) {
    return function (a, b) {
      if (a.DepartureTime > b.DepartureTime) {
        return 1;
      } else if (a.DepartureTime < b.DepartureTime) {
        return -1;
      }
      return 0;
    }
  }
  function sortTimeAsc() {
    setTemp(finalarray.sort(GetTimeSort('prop')))
  }

  function sortByPrice(startPrice, endPrice) {
    let filteredArr = [];
    finalarray.map(item => {
      let alpha = item.ProductBrandOffering.filter(y => (y.Price.TotalPrice >= startPrice && y.Price.TotalPrice <= endPrice));
      let beta = JSON.stringify(item);
      beta = JSON.parse(beta);
      beta.ProductBrandOffering = alpha;
      if (alpha.length != 0) {
        filteredArr.push(beta);
      }
    })
    setFinalArray(filteredArr);
  }



  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ color: "black" }}>
        {
          finalarray.map((item) => {
            return (
              <div style={{ display: "flex", gap: "5px", flexDirection: "column-reverse", border: "2px black solid", margin: '5px', padding: '5px' }}>
                <div>
                  <p>{item.DepartureTime}</p>
                  {
                    item.ProductBrandOffering.map(x => {
                      return (
                        <div style={{ display: 'flex', gap: '5px' }}>

                          <div>
                            <p>
                              {
                                alldata.ReferenceList[3].Brand.map(y => {
                                  if (y.id == x?.Brand?.BrandRef) {
                                    return y.name
                                  }
                                })
                              }
                            </p>
                            <p>{x.Price.Base}</p>
                            <p>{x.Price.TotalPrice}</p>
                            <p>{x.Price.TotalTaxes}</p>
                          </div>
                          <div>
                            <p>
                              {
                                x.Product.map(aa => {
                                  return (
                                    alldata.ReferenceList[1].Product.map(y => {
                                      if (y.id == aa?.productRef) {
                                        return y.totalDuration
                                      }
                                    })
                                  )
                                }
                                )
                              }
                            </p>
                          </div>
                          <div>
                            <p>
                              {
                                alldata.ReferenceList[2].TermsAndConditions.map(y => {
                                  if (y.id == x.TermsAndConditions?.termsAndConditionsRef) {
                                    return y.PaymentTimeLimit
                                  }
                                })
                              }
                            </p>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div style={{ display: "flex", gap: "5px" }}>
                  {item.flightRefs.map(alp => {
                    return (
                      <div>
                        <p>{alp}</p>
                        {
                          alldata.ReferenceList[0].Flight.map(y => {
                            if (y.id == alp) {
                              return (
                                <>
                                  <p>{y.Departure.location}</p>
                                  <p>{y.Arrival.location}</p>
                                </>
                              )
                            }
                          })
                        }
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })
        }
      </div>
      <div>
        <button onClick={() => {
          sortPriceAsc();
        }}>
          sortByPrice
        </button>
        <button onClick={() => {
          sortTimeAsc();
        }}>
          sortByTime
        </button>
        <button onClick={() => {
          clearfn();
        }}>Clear</button>
      </div>
      <div style={{ display: "flex", flexDirection: 'column', gap: '5px' }}>
        {
          allBrands.map((item, key) => {
            return (
              <div key={key}>
                {
                  brand.includes(item.id) == true ?
                    <input
                      type="checkbox"
                      id={item.name + "dept"}
                      name={item.name + "dept"}
                      value={item.id}
                      checked={true}
                      onChange={() => {
                        let x = document.getElementById(item.name + "dept");
                        if (x.checked) {
                          setBrand(prev => {
                            return [...prev, x.value]
                          })
                        } else {
                          let b = brand.filter((alpha) => alpha !== x.value);
                          setBrand(b);
                        }
                      }} />
                    :
                    <input
                      type="checkbox"
                      id={item.name + "dept"}
                      name={item.name + "dept"}
                      value={item.id}
                      onChange={() => {
                        let x = document.getElementById(item.name + "dept");
                        if (x.checked) {
                          setBrand(prev => {
                            return [...prev, x.value]
                          })
                        } else {
                          let b = brand.filter((alpha) => alpha !== x.value);
                          setBrand(b);
                        }
                      }} />
                }
                <label for={item.name + "dept"}>{item.name}</label>
              </div>
            )
          })
        }
      </div>
      <div>
        <input type="number" id="startPrice" />
        <p>to</p>
        <input type="number" id="endPrice" />
        <button onClick={() => {
          let x = document.getElementById("startPrice").value;
          let y = document.getElementById("endPrice").value;
          sortByPrice(x, y);
        }}>find</button>
      </div>
    </div>
  )
}

export default Flight