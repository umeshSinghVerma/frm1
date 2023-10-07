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
  const [filterdData,setFilteredData]=useState([]);
  const [mid,setMid]=useState([]);
  useEffect(()=>{
    alldata.CatalogProductOfferings.CatalogProductOffering.forEach((item)=>{
      if(From.includes(item.Departure) && arrival.includes(item.Arrival)){
        setMid(prev=>
          [...prev,item]
        )
      }
    })
  },[])
  window.mid=mid;
  let finalarray=[];
  // console.log("check ",alldata.ReferenceList[0].Flight);
  let alpha = mid.map(item=>{
    let ffr;
    let lfr;
    item.ProductBrandOptions.map((f,k)=>{
      ffr = alldata.ReferenceList[0].Flight.filter(it=>{
        return it.id===f.flightRefs[0];
        // return f.flightRefs.includes(it.id);
      })
      lfr=alldata.ReferenceList[0].Flight.filter(it=>{
        return it.id===f.flightRefs[f.flightRefs.length-1];
        // return f.flightRefs.includes(it.id);
      })
      // console.log(k,ffr,lfr);

      // console.log("ffr ",ffr[0].Departure.date,startDate)
      // console.log("ffr ",ffr[0].Departure.date>=startDate)
      // console.log("lfr ",lfr[0].Arrival.date,endDate)
      // console.log("lfr ",lfr[0].Arrival.date<=endDate)

      if(ffr[0].Departure.date>=startDate && lfr[0].Arrival.date<=endDate){
        finalarray.push(f);
      }
    })
    // console.log("first a ",arr);
  })
  console.log("w",finalarray)

  



  

  return (
    <div>
      jel
    </div>
  )
}

export default Flight