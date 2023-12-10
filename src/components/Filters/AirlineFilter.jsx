import React from 'react'

const AirlineFilter = ({allFlights, flight, setFlight}) => {
  return (
    <div className="flex flex-col gap-3 flex-1">
        <h3 className="text-xl">Flights Name :</h3>
        <div className="flex flex-col gap-2">
            {allFlights.map((item, key) => {
            return (
                <div key={key} className="flex gap-3">
                    {flight.includes(item) === true ? (
                        <input type="checkbox" value={item} id={item + "flight"} checked={true}
                        onChange={(e) => {
                            if (e.target.checked) {
                            setFlight((prev) => {
                                return [...prev, e.target.value];
                            });
                            } else {
                            let b = flight.filter(
                                (alpha) => alpha !== e.target.value
                            );
                            setFlight(b);
                            }
                        }}
                        />
                    ) : (
                        <input type="checkbox" value={item} id={item + "flight"}
                        onChange={(e) => {
                            if (e.target.checked) {
                            setFlight((prev) => {
                                return [...prev, e.target.value];
                            });
                            } else {
                            let b = flight.filter(
                                (alpha) => alpha !== e.target.value
                            );
                            setFlight(b);
                            }
                        }}
                        />
                    )}
                    <label htmlFor={item + "flight"}>{item}</label>
                </div>
            );
            })}
        </div>
    </div>
  )
}

export default AirlineFilter
