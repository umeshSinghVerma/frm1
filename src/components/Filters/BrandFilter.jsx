import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBrand } from '../../redux/brand';
import { removeBrand } from '../../redux/brand';

const BrandFilter = () => {
    const dispatch = useDispatch();
    const allBrands = useSelector((state) => state.allBrandsArray.allBrandsArray)
    const brand = useSelector((state) => state.brand.brandArray)

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
                                            dispatch(addBrand(e.target.value));
                                        } else {
                                            dispatch(removeBrand(e.target.value));
                                        }
                                    }}
                                />
                            ) : (
                                <input type="checkbox" value={item.id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            dispatch(addBrand(e.target.value));
                                        } else {
                                            dispatch(removeBrand(e.target.value));
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
