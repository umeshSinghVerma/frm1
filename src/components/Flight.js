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
  const [filterdData, setFilteredData] = useState([]);
  const [mid, setMid] = useState([]);
  useEffect(() => {
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item) => {
      if (From.includes(item.Departure) && arrival.includes(item.Arrival)) {
        setMid(prev =>
          [...prev, item]
        )
      }
    })
  }, [])
  window.mid = mid;
  let finalarray = [];
  // console.log("check ",alldata.ReferenceList[0].Flight);
  let alpha = mid.map(item => {
    let ffr;
    let lfr;
    item.ProductBrandOptions.map((f, k) => {
      ffr = alldata.ReferenceList[0].Flight.filter(it => {
        return it.id === f.flightRefs[0];
        // return f.flightRefs.includes(it.id);
      })
      lfr = alldata.ReferenceList[0].Flight.filter(it => {
        return it.id === f.flightRefs[f.flightRefs.length - 1];
        // return f.flightRefs.includes(it.id);
      })
      // console.log(k,ffr,lfr);

      // console.log("ffr ",ffr[0].Departure.date,startDate)
      // console.log("ffr ",ffr[0].Departure.date>=startDate)
      // console.log("lfr ",lfr[0].Arrival.date,endDate)
      // console.log("lfr ",lfr[0].Arrival.date<=endDate)

      if (ffr[0].Departure.date >= startDate && lfr[0].Arrival.date <= endDate) {
        finalarray.push(f);
      }
    })
    // console.log("first a ",arr);
  })
  console.log("w", finalarray)







  return (
    <div style={{ color: "black" }}>
      {
        finalarray.map((item) => {
          return (
            <div style={{ display: "flex", gap: "5px" ,flexDirection:"column-reverse" ,border:"2px black solid",margin:'5px',padding:'5px' }}>
              <div>
                {
                  item.ProductBrandOffering.map(x => {
                    return (
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
                      
                    )
                  })
                }
              </div>
              <div style={{display:"flex",gap:"5px"}}>
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
  )
}

export default Flight