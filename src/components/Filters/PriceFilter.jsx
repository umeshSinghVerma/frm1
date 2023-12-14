import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateMaxPrice } from '../../redux/priceFilter';

const PriceFilter = () => {
  const dispatch = useDispatch();
  const {minPrice,maxPrice,absoluteMaxPrice}=useSelector((state)=>state.priceFilter.priceFilter);
  const handlePriceRangeChange = (event) => {
    dispatch(updateMaxPrice(+event.target.value));
  };

  return (
    <div className="flex flex-col gap-3 flex-1 ">
        <h3 className="text-xl">Price :</h3>
        <p className='text-center'>{maxPrice}</p>
        <input
          id="prices"
          type="range"
          min={Math.ceil(minPrice)}
          max={Math.ceil(absoluteMaxPrice) - (Math.ceil(absoluteMaxPrice)%100)+200}
          step="20"
          value={maxPrice || Math.ceil(absoluteMaxPrice) - (Math.ceil(absoluteMaxPrice)%100)+200}
          onChange={handlePriceRangeChange}
        />
        <div className='flex justify-between'>
          <p>{Math.floor(minPrice) - (Math.floor(minPrice)%100)}</p>
          <p>{Math.ceil(absoluteMaxPrice) - (Math.ceil(absoluteMaxPrice)%100)+200}</p>
        </div>
    </div> 
  )
}

export default PriceFilter
