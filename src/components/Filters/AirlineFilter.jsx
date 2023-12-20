import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addflight, removeflight } from '../../redux/flight';

const AirlineFilter = () => {
    const dispatch = useDispatch();
    const allFlights = useSelector((state) => state.allFlightsArray.allFlightsArray)
    const flight = useSelector((state) => state.flight.flightArray)
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
                                            dispatch(addflight(e.target.value));
                                        } else {
                                            dispatch(removeflight(e.target.value));
                                        }
                                    }}
                                />
                            ) : (
                                <input type="checkbox" value={item} id={item + "flight"}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch(addflight(e.target.value));
                                        } else {
                                            dispatch(removeflight(e.target.value));
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
