import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addflightNo, removeflightNo } from "../../redux/flightNo";

const StopsFilter = () => {
  const dispatch = useDispatch();
  const flightNo = useSelector((state) => state.flightNo.flightNoArray)
  const stops = [1, 2, 3];
  return (
    <div className="flex flex-col gap-3 flex-1  min-w-[120px]">
      <h3 className="text-xl">No. of Stops :</h3>
      <div className="flex flex-col gap-1">
        {stops.map((item, key) => {
          return (
            <div key={key} className="flex gap-3">
              {flightNo.includes(item) === true ? (
                <input type="checkbox" id={item + "stop"} value={item} checked={true}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(addflightNo(+e.target.value));
                    } else {
                      dispatch(removeflightNo(+e.target.value));
                    }
                  }}
                />
              ) : (
                <input type="checkbox" value={item} id={item + "stop"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      dispatch(addflightNo(+e.target.value));
                    } else {
                      dispatch(removeflightNo(+e.target.value));
                    }
                  }}
                />
              )}
              {item >= 3 ? (
                <label htmlFor={item + "stop"}>2+</label>
              ) : (
                <label htmlFor={item + "stop"}>{item}</label>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StopsFilter;
