import React, { useEffect, useState } from "react";
import X from "../data.json";

const Multi = () => {
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
        Departure: "", Arrival: "", startDate: "", endDate: ""
    }

    setFormFields([...formFields, object]);
  };

  const removeFields = (index) => {
    console.log(index)
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
  };

  return (
    <div className="App">
      <form onSubmit={submit}>
        {formFields.map((form, index) => {
          return (
            <div key={index}>
              <select name="Departure"
onChange={(event) => handleFormChange(event, index)}
value={form.Departure}>
                {departureArray.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <select name="Arrival" 
onChange={(event) => handleFormChange(event, index)}
value={form.Arrival}>
                {arrivalArray.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
              <input
                type="number"
                name="startDate"
                placeholder="startDate"
                onChange={(event) => handleFormChange(event, index)}
                value={form.startDate}
              />
              <input
                type="number"
                name="endDate"
                placeholder="endDate"
                onChange={(event) => handleFormChange(event, index)}
                value={form.endDate}
              />
              <button onClick={() => removeFields(index)}>Remove</button>
            </div>
          );
        })}
      </form>
      <button onClick={addFields}>Add More..</button>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
};

export default Multi;
