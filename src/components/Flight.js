import React, { useEffect, useState } from 'react'
import { useLocation } from "react-router-dom"
const Flight = () => {
  const location = useLocation()
  console.log(location);
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
  const [displayArray,setDisplayArray]=useState([]);

  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From.includes(item.Departure) && arrival.includes(item.Arrival)) {
        setMid(prev =>
          [...prev, item]
        )
      }
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
  console.log("w", finalarray)

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a.ProductBrandOffering[0].Price.TotalPrice > b.ProductBrandOffering[0].Price.TotalPrice) {
        return 1;
      } else if (a.ProductBrandOffering[0].Price.TotalPrice < b.ProductBrandOffering[0].Price.TotalPrice) {
        return -1;
      }
      return 0;
    }
  }
  window.displayArray = displayArray;
  function sortPriceAsc() {
    setTemp(finalarray.sort(GetSortOrder('price')))
  }
  function clearfn() {
    setFinalArray(displayArray);
  }





  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div style={{ color: "black" }}>
        {
          finalarray.map((item) => {
            return (
              <div style={{ display: "flex", gap: "5px", flexDirection: "column-reverse", border: "2px black solid", margin: '5px', padding: '5px' }}>
                <div>
                  {
                    item.ProductBrandOffering.map(x => {
                      return (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <div>
                            <p>
                              {
                                alldata.ReferenceList[3].Brand.map(y => {
                                  if (y.id == x.Brand.BrandRef) {
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
                                      if (y.id == aa.productRef) {
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
                                  if (y.id == x.TermsAndConditions.termsAndConditionsRef) {
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
          clearfn();
        }}>Clear</button>
      </div>
    </div>
  )
}

export default Flight