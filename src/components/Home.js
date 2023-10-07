import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [data,setData]=useState([])
    const [departureArray,setdepartureArray]=useState([])
    const [arrivalArray,setarrivalArray]=useState([])
    const [From,setFrom]=useState([]);
    const [arrival,setArrival]=useState([]);
    const [startDate,setStartDate]=useState(null);
    const [endDate,setEndDate]=useState(null);
    window.From = From;
    window.arrival=arrival;
  
    function send(){
      // to be implemented
    }
  
    useEffect(()=>{
      axios
        .get("http://localhost:4000/CatalogProductOfferingsResponse")
        .then((res) => {
          // console.log("this is res ",res);
          setData(res.data.ReferenceList[0].Flight);
        })
        .catch((er) => {
          console.log("error", er);
        });
        let a=[];
        let b=[];
      data.forEach((i) => {
            if (!a.includes(i.Departure.location)) {
              a.push(i.Departure.location);
            }
            if (!b.includes(i.Arrival.location)) {
              b.push(i.Arrival.location);
            }
          });
          setarrivalArray(b)
          setdepartureArray(a)
    },[])
    console.log("from ",From);
    console.log("to ",arrival);
    console.log("Startdate ",startDate);
    console.log("endDate  ",endDate);
    return (
      <div className="App" style={{display:"flex",gap:"10px",margin:"20px"}}>
  
        <div style={{display:"flex",flexDirection:'column',gap:'5px'}}>
          {
              departureArray.map((item,key)=>{
                return(
                <div key={key}>
                  <input type="checkbox" id={item+"dept"} name={item+"dept"} value={item} onChange={()=>{
                    let x = document.getElementById(item+"dept");
                    if(x.checked){
                      setFrom(prev=>{
                        return [...prev,x.value]
                      })
                    }else{
                      let b = From.filter((alpha)=>alpha!==x.value);
                      setFrom(b);
                    }
                  }}/>
                  <label for={item+"dept"}>{item}</label>
                </div>
                )
              })
          }
        </div>
  
        <div style={{display:"flex",flexDirection:'column',gap:'5px'}}>
          {
              arrivalArray.map((item,key)=>{
                // console.log("this is item",item);
                return(
                <div key={key}>
                  <input type="checkbox" id={item+"arrival"} name={item+"arrival"} value={item} onChange={()=>{
                    let x = document.getElementById(item+"arrival");
                    if(x.checked){
                      setArrival(prev=>{
                        return [...prev,x.value]
                      })
                    }else{
                      let b = arrival.filter((alpha)=>alpha!==x.value);
                      setArrival(b);
                    }
                  }}/>
                  <label for={item+"arrival"}>{item}</label>
                </div>
                )
              })
          }
        </div>
  
        
        <input type="date" id='StartDate' onChange={()=>{
          let x = document.getElementById('StartDate').value;
          setStartDate(x);
        }} />
        <input type="date" id='EndDate' onChange={()=>{
          let x = document.getElementById('EndDate').value;
          setEndDate(x);
        }} />
        <button onClick={()=>{
          send();
        }}></button>
      </div>
    );
}

export default Home