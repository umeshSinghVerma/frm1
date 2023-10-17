import React from 'react'

const PriceFilter = ({myRef, myRef2, sortByPrice}) => {
  return (
    <div className="flex flex-col gap-3">
        <h3 className="text-xl">Price :</h3>
        <div className="flex flex-col gap-3">
            <input className="border border-[#e55e0d]" type="number" id="startPrice" ref={myRef} />
            <p>to</p>
            <input className="border border-[#e55e0d]" type="number" id="endPrice" ref={myRef2} />
            <button
                className="block text-white py-1 px-5 text-xl rounded active:scale-95 transition-all hover:opacity-95"
                style={{background: "linear-gradient(135deg,#e55e0d 0%,#cf3218 100%)"}}
                onClick={() => {
                    let x = +myRef.current.value;
                    let y = +myRef2.current.value;
                    sortByPrice(x, y);
                }}
                >
                Find
            </button>
        </div>
    </div>
  )
}

export default PriceFilter
