import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { updateMaxPrice } from '../../redux/priceFilter';

const PriceFilter = ({min, max, priceRange, setPriceRange, constMax}) => {
  const dispatch = useDispatch();
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
    dispatch(updateMaxPrice(+event.target.value));
  };

  return (
    <div className="flex flex-col gap-3 flex-1 ">
        <h3 className="text-xl">Price :</h3>
        <p className='text-center'>{priceRange}</p>
        <input
          id="prices"
          type="range"
          min={Math.ceil(min)}
          max={Math.ceil(constMax) - (Math.ceil(constMax)%100)+200}
          step="20"
          value={priceRange || Math.ceil(constMax) - (Math.ceil(constMax)%100)+200}
          onChange={handlePriceRangeChange}
        />
        <div className='flex justify-between'>
          <p>{Math.floor(min) - (Math.floor(min)%100)}</p>
          <p>{Math.ceil(constMax) - (Math.ceil(constMax)%100)+200}</p>
        </div>
    </div> 
  )
}

export default PriceFilter
