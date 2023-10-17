import React, { useEffect, useState } from "react";
import X from "../data.json";
import FormField from "./FormField";

function Multi() {
  const [formFields, setFormFields] = useState([
    { Departure: "", Arrival: "", startDate: "", endDate: "" },
  ]);

  const [arrivalArray, setArrivalArray] = useState([]);
  const [departureArray, setDepartureArray] = useState([]);

  const fetchData = () => {
    const flightData = X.CatalogProductOfferingsResponse;
    const uniqueDepartures = [];
    const uniqueArrivals = [];

    flightData.ReferenceList[0].Flight.forEach((flight) => {
      const { Departure, Arrival } = flight;
      if (!uniqueDepartures.includes(Departure.location)) {
        uniqueDepartures.push(Departure.location);
      }
      if (!uniqueArrivals.includes(Arrival.location)) {
        uniqueArrivals.push(Arrival.location);
      }
    });

    setArrivalArray(uniqueArrivals);
    setDepartureArray(uniqueDepartures);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFormChange = (event, index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index][event.target.name] = event.target.value;
    setFormFields(updatedFormFields);
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(formFields);
  };

  const addFields = () => {
    if (formFields.length >= 5) {
      return;
    }

    const newFormField = {
      Departure: "",
      Arrival: "",
      startDate: "",
      endDate: "",
    };

    setFormFields([...formFields, newFormField]);
  };

  const removeFields = (index) => {
    if (formFields.length > 2) {
      const updatedFormFields = [...formFields];
      updatedFormFields.splice(index, 1);
      setFormFields(updatedFormFields);
    }

  };

  return (
    <div className="App rounded-2xl absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] bg-white w-fit mx-auto p-20 flex flex-col gap-2">
      <p className="text-3xl self-start mb-4">Multi City Search :-</p>
      <form onSubmit={submit} className="flex flex-col gap-2">
        {formFields.map((form, index) => (
          <FormField
            key={index}
            form={form}
            index={index}
            departureArray={departureArray}
            arrivalArray={arrivalArray}
            handleFormChange={handleFormChange}
            removeFields={removeFields}
          />
        ))}
      </form>
      
      <button className="border border-green-500 rounded-md px-5 hover:text-white hover-bg-green-500 w-fit transition-all" onClick={addFields} disabled={formFields.length >= 5}>
        Add More..
      </button>
      <button className="text-white mt-3 py-2 px-5 text-xl rounded active:scale-95 transition-all" style={{ background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)" }} onClick={submit}>
        Submit
      </button>
    </div>
  );
}

export default Multi;






