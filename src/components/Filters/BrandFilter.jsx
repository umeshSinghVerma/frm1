import React from 'react'

const BrandFilter = ({allBrands, brand, setBrand}) => {
  return (
    <div className="flex flex-col gap-3 flex-1  min-w-[150px]">
        <h3 className="text-xl">Brand Name :</h3>
        <div className="flex flex-col gap-2">
            {allBrands.map((item, key) => {
            return (
                <div key={key} className="flex gap-3">
                    {brand.includes(item.id) === true ? (
                        <input type="checkbox" value={item.id} checked={true}
                            onChange={(e) => {
                                if (e.target.checked) {
                                setBrand((prev) => {
                                    return [...prev, e.target.value];
                                });
                                } else {
                                let b = brand.filter(
                                    (alpha) => alpha !== e.target.value
                                );
                                setBrand(b);
                                }
                            }}
                        />
                    ) : (
                        <input type="checkbox" value={item.id}
                            onChange={(e) => {
                                if (e.target.checked) {
                                setBrand((prev) => {
                                    return [...prev, e.target.value];
                                });
                                } else {
                                let b = brand.filter(
                                    (alpha) => alpha !== e.target.value
                                );
                                setBrand(b);
                                }
                            }}
                        />
                    )}
                    <label htmlFor={item.name + "dept"}>{item.name}</label>
                </div>
            );
            })}
        </div>
    </div>
  )
}

export default BrandFilter
