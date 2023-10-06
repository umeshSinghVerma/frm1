import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data,setData]=useState([])
  const [departureArray,setdepartureArray]=useState([])
  const [arrivalArray,setarrivalArray]=useState([])

  useEffect(()=>{
    axios
      .get("http://localhost:4000/CatalogProductOfferingsResponse")
      .then((res) => {
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
  return (
    <div className="App" style={{display:"flex",gap:"10px",margin:"20px"}}>
      <select name="From" id="From">
        {
          departureArray.map((item,key)=>{
            return <option value={item} key={key}>{item}</option>
          })
        }
      </select>
      <select name="To" id="From">
        {
          arrivalArray.map((item,key)=>{
            return <option value={item} key={key}>{item}</option>
          })
        }
      </select>
      <input type="date" />
    </div>
  );
}

export default App;
