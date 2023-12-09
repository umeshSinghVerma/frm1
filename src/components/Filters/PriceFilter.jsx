import React, { useEffect, useState } from 'react'

const PriceFilter = ({min, max, priceRange, setPriceRange, sortByPrice, constMax}) => {
  useEffect(() => {
    if(priceRange!=null){
      sortByPrice(min, Number(priceRange)); 
    }
  }, [priceRange]);
  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };
  console.log(Math.ceil(constMax) - (Math.ceil(constMax)%100)+200)

  return (
    <div className="flex flex-col gap-3">
        <h3 className="text-xl">Price :</h3>
        <p className='text-center'>{priceRange}</p>
        <input
          id="prices"
          type="range"
          min={Math.ceil(min)}
          max={Math.ceil(constMax) - (Math.ceil(constMax)%100)+200}
          step="20"
          value={priceRange}
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
