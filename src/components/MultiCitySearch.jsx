import React, { useEffect, useState } from "react";
import X from "../data1.json";

const MultiCitySearch = () => {
  const [formFields, setFormFields] = useState([
    { Departure: "", Arrival: "", startDate: "", endDate: "" },
  ]);

  const [arrivalArray, setarrivalArray] = useState([]);
  const [departureArray, setdepartureArray] = useState([]);

  function fetchData() {
    const normaldata = X.CatalogProductOfferingsResponse;
    let a = [];
    let b = [];
    normaldata.ReferenceList[0].Flight.forEach((i) => {
      if (!a.includes(i.Departure.location)) {
        a.push(i.Departure.location);
      }
      if (!b.includes(i.Arrival.location)) {
        b.push(i.Arrival.location);
      }
    });
    console.log(a);
    setarrivalArray(b);
    setdepartureArray(a);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.name] = event.target.value;
    setFormFields(data);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const addFields = () => {
    let object = {
      Departure: "",
      Arrival: "",
      startDate: "",
      endDate: "",
    };
    if(formFields.length>5){
      return;
    }

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    console.log(index);
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <div className="rounded-2xl md:absolute xl:top-[50%] xl:translate-y-[-50%] xl:left-[50%] xl:translate-x-[-50%] bg-white w-full xl:mx-auto p-10 lg:p-20 flex flex-col gap-2 ">
      <p className="text-3xl self-start mb-4">Multi City Search :-</p>
      <form onSubmit={submit} className="flex flex-col gap-y-10 2xl:gap-y-5">
        {formFields.map((form, index) => {
          return (
            // flex flex-wrap lg:flex-nowrap gap-x-10 gap-y-4 lg:gap-10 lg:justify-center
            <div key={index} className="grid grid-cols-2 md:grid-cols-5 gap-2">
              <select name="Departure" onChange={(event) => handleFormChange(event, index)} value={form.Departure} className="px-2 flex-1 py-1 rounded-md bg-slate-200 min-w-[130px]">
                {departureArray.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <select name="Arrival" onChange={(event) => handleFormChange(event, index)} value={form.Arrival} className="px-2 flex-1 py-1 rounded-md bg-slate-200 min-w-[130px]">
                {arrivalArray.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <input type="date" name="startDate" placeholder="startDate" onChange={(event) => handleFormChange(event, index)} value={form.startDate} className=" min-w-[130px] bg-slate-200 rounded-md px-2"/>
              <input type="date" name="endDate" placeholder="endDate" onChange={(event) => handleFormChange(event, index)} value={form.endDate} className="bg-slate-200 rounded-md px-2 min-w-[130px]"/>
              <button className="border border-red-500 rounded-md px-5 hover:text-white hover:bg-red-500 transition-all min-w-[130px]" onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <button  className="border border-green-500 rounded-md px-5 hover:text-white hover:bg-green-500 w-fit transition-all" onClick={addFields}>Add More..</button>
      <button className=" text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95" style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}} onClick={submit}>Submit</button>
    </div>
  );
};

export default MultiCitySearch;
